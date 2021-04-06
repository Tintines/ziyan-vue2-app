<template>
    <section class="ratings" ref="ratings">
        <div class="overview">
            <div class="overview-left">
                <h2 class="score">4.5</h2>
                <div class="title">综合评分</div>
                <div class="rank">高于周边商家99%</div>
            </div>
            <div class="overview-right"></div>
        </div>
    </section>
</template>

<script type="text/ecmascript-6">
    import {mapState} from 'vuex'
    export default {
        computed: {
            ...mapState(['info'])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">


</style>
