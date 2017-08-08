<style lang="less" scoped>
	.main {
        max-width: 750px;
        margin: 0 auto;
    }
</style>
<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data () {
        	let height = window.innerHeight;
            return {
                height: height
            }
        },
        methods: {
            switchMenu (index) {
            	this.itemActive = index;
            }
        }
    }
</script>
