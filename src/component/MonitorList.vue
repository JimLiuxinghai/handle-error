<style lang="less" scoped>
	.layout-assistant{
	    overflow-x: auto;
	    margin: 0 auto;
	    height: inherit;
	}
</style>
<template>
    <div>
        <Menu mode="horizontal" active-name="1" @on-select="cutover" >
            <div class="layout-assistant">
                <Menu-item v-for="(item, index) in lookList" :name="index + 1">{{item.title}}</Menu-item>
            </div>
        </Menu>
        <Single :current="currentItem" v-on:delete-monitor="deleteMonitor"></Single>
    </div>
</template>
<script>
    import Single from './Single.vue';
    export default {
        beforeMount () {
            this.getData();
        },
        data () {
            return {
                lookList: [],
                currentItem: ''
            }
        },
        methods: {
            getData () {
                this.$http.get('/api/list').then(function (res) {
                    this.lookList = res.data.data;
                    this.currentItem = res.data.data[0];
                }, function (err) {
                    console.log(err);
                });
            },
            cutover (current) {
                this.currentItem = this.lookList[current - 1];
                console.log(this.currentItem)
            },
            deleteMonitor (id) {
                this.$http.post('/api/del', id).then(function (res) {
                    this.getData();
                }, function (err) {
                    console.log(err);
                });                
            }
        },
        components: {
            Single: Single
        }
    }
</script>
