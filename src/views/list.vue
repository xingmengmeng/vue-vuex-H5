<template>
    <section>
        列表页面刷新测试
        <ul>
            <li v-for="(item,index) in getEventList" :key="index">
                <span v-for="(cur,curIndex) in item" :key="curIndex">{{cur.name}}</span>
            </li>
        </ul>
    </section>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    computed: {
        getEventList(){
            return this.$store.getters.getEventList;
        },
    },
    mounted () {
        this.$http.get('/api/siteType/gjj/site').then((res)=>{
            //this.$store.dispatch('addEvent',res.data);  等同于下列方法
            this.addEvent(res.data);
        })
    },
    methods: {
        ...mapActions(['addEvent']),
    }
}
</script>

