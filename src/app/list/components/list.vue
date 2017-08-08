<style lang="less" scoped>
	
</style>
<template>
    <ul class="list">
        <li v-for="(item, index) in data">
            <span @click = goto(item.id)>{{item.title}}</span>
        </li>
    </ul>
</template>
<script>
    export default {
        props: ['data'],
        methods: {
            goto(id) {
                console.log(aaaa)
                let url = '/detail/' + id;
                console.log(url)
                this.$router.push(url);
                console.log(this.$router)
            }
        }
    }
</script>
