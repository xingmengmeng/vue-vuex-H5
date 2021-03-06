var path = require('path');
var glob = require('glob');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');/*生成html*/
var CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var config = {
    // 这是一个主文件包括其他模块
    entry: { //配置入口文件，有几个写几个
        index: './src/main.js',
    },
    // 编译的文件路径
    output: {
        path: path.join(__dirname, 'dist'), //打包后生成的目录
        publicPath: '',	//模板、样式、脚本、图片等资源对应的server上的路径
        filename: '/js/[name].[chunkhash].js',	//根据对应入口名称，生成对应js名称
        chunkFilename: '/js/[id].[chunkhash].js'   //chunk生成的配置
    },
    resolve: {
        extensions: ['', '.js', '.vue'],
        alias: {
            'vue$':'vue/dist/vue.js'
        }
    },
    module: {
        // 一些特定的编译规则
        loaders: [
            {
                // 让webpack去验证文件是否是.js结尾将其转换
                test: /\.js$/,
                // 通过babel转换
                loader: 'babel',
                // 不用转换的node_modules文件夹
                exclude: /node_modules/
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            },
            {test: /\.css/, loader: 'style-loader!css-loader'},
            {test: /\.less$/, loader: 'style-loader!css-loader!less-loader'},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url'
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),// 清空dist文件夹
        new webpack.optimize.UglifyJsPlugin({
            comments: false,        //去掉注释
            compress: {
                warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production"),
            },
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'static'),
            to: path.join(__dirname, 'dist/js'),
        }]),
    ],
}
module.exports = config;

var pages = getEntry('./src/*.html');
var confTitle = [
    {name: 'index', title: '这是首页标题'},
]
//生成HTML模板
for(var item in pages){
    var conf = {
        filename: item + '.html', //生成的html存放路径，相对于path
        //favicon: 'favicon.ico',
        template: pages[item], //html模板路径
        inject: true, //允许插件修改哪些内容，包括head与body
        hash: false, //是否添加hash值
        minify: { //压缩HTML文件
            removeComments: true,//移除HTML中的注释
            collapseWhitespace: false //删除空白符与换行符
        }
    };
    conf.chunks = ['common', item]
    for (var i in confTitle) {
        if (confTitle[i].name === item) {
            conf.title = confTitle[i].title
        }
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
}


//按文件名来获取入口文件（即需要生成的模板文件数量）
function getEntry(globPath) {
    var files = glob.sync(globPath);
    var entries = {},
        entry, dirname, basename, pathname, extname;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        extname = path.extname(entry);
        basename = path.basename(entry, extname);
        pathname = path.join(dirname, basename).slice(4);
        entries[pathname] = entry;
    }
    return entries;
}