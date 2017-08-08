<template>
    <div class="single">
        <div class="title">
            <span class="name">{{current.title}}</span>
            <span class="des">{{current.des}}</span>
            <a :href="current.url" class="url" target="_blank">{{current.url}}</a>
            <span class="type">{{type}}</span>
            <span class="delete" @click="delMonitor(current.id)">
                <Icon type="trash-a"></Icon>
                <span>删除</span>
            </span>
        </div>
        <Table border :columns="columns" :data="detail"></Table>
    </div>
</template>

<script>
export default {
    name: 'single',
    props: ['current'],
    data () {
        return {
           columns: [
                {
                    title: 'url',
                    key: 'url'
                },
                {
                    title: '状态',
                    key: 'status'
                },
                {
                    title: '类型',
                    key: 'type'
                },
                {
                    title: '时间',
                    key: 'time'
                }
            ],
            detail: []
        }
    },
    watch: {
       current: {
            handler: function () {
                this.getErr();
            },
       }
    },
    methods: {
        delMonitor (id) {
            let data = JSON.stringify({id: id});
            this.$emit('delete-monitor', data)
            this.getErr();
        },
        getErr () {
            let data = JSON.stringify({id: this.current.id});
            this.$http.post('/api/getData', data).then(function (res) {
                this.detail = res.data.data;
            }, function (err) {
                console.log(err);
            });
        }
    },
    computed: {
        type () {
            switch (this.current.status) {
                case '1':
                    return '400系';
                    break;
                case '2':
                    return '500系';
                    break;
                case '3':
                    return '400和500系';
                    break;
                default: 
                    return '400系';
                    break;
            }
        }
    }
}
</script>

<style lang="less" scoped>
    .single {
        box-sizing: border-box;
        padding: 20px;
        .title {
            text-align: center;
            position: relative;
            margin-bottom: 30px;
            .name {
                font-size: 16px;
                font-weight: bolder;
            }
            .des {
                font-size: 12px;
                margin-left: 20px;
            }
            .url {
                color: #3399ff;
                margin-left: 20px;
            }
            .type {
                color: #00cc66;
                margin-left: 20px;
            }
            .delete {
                font-size: 16px;
                position: absolute;
                right: 50px;
                margin-right: 50px;
                color: #ff3300;
                cursor: pointer;
                transition: all .2s;
                &:hover {
                    font-size: 18px;
                }
            }
        }
    }
</style>
