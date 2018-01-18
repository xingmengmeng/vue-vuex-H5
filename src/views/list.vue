<template>
    <section>
        列表页面刷新测试ss
    </section>
</template>
<script>
export default {
    mounted () {
        this.$http.get('/api/siteType/gjj/site').then((res)=>{
            console.log(res.data);
        })
    }
}
</script>

