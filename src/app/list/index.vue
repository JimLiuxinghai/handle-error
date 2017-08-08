<style lang="less" scoped>
	@import 'index.less';
</style>
<template>
    <div>
        <div class="movie-list" v-if="loading">
            <h2>{{movie.title}}</h2>
            <!--使用props 向子组件传递数据-->
            <List :data="movie.subjects"></List>
        </div>
        <Loading v-if="!loading"></Loading>
    </div>
</template>
<script>
    import List from './components/list.vue';
    import Loading from '../common/loading.vue';
    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                movie: {},
                loading: false
            }
        },
        methods: {
            getData () {
                this.$http.get('/api/first/getList').then(function (res) {
                    this.loading = true;
                    this.movie = res.body;
                }, function (err) {
                    console.log(err);
                });
            }
        },
        components: {
            List: List,
            Loading: Loading
        }
    }
</script>
