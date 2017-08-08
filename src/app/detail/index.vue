<style lang="less" scoped>
	
</style>
<template>
    <div>
       <div v-if="loading">
            <h2>s打啊打</h2>
           <h2>{{detail.title}}</h2>
           <div>
               <span>国家：{{detail.countries}}</span>
           </div>
           <div>
               {{detail.summary}}
           </div>
       </div> 
       <Loading v-if="!loading"></Loading>
    </div>
    
</template>
<script>
    import Loading from '../common/loading.vue';
    export default {
        beforeMount () {
            let path = this.$route.path.split('/');
            this.id = path[path.length - 1];
            this.getData();
        },
        data () {
            return {
                id: '',
                detail: {},
                loading: false
            }
        },
        methods: {
            getData () {
                let url = '/api/first/detail/' + this.id;
                this.$http.get(url).then(function (res) {
                    this.loading = true;
                    this.detail = res.body;
                    console.log(this.detail)
                }, function (err) {
                    console.log(err);
                });
            }
        },
        components: {
            Loading: Loading
        }
    }
</script>
