import * as types from './mutation-types.js';
const mutations = {
    [types.ADDEVENT](state,obj){
        console.log(1);
        state.resData=obj.items;
    },
}
export default mutations;