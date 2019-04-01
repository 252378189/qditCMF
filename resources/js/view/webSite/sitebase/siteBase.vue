<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="网站信息" name="first" :lazy="true">
            <siteInfo></siteInfo>
        </el-tab-pane>
        <el-tab-pane label="关于我们" name="second"  :lazy="true">
            <aBout></aBout>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import siteInfo from './siteInfo';
    import aBout from './aBout';

    export default {
        name: "siteBase",
        components:{siteInfo, aBout},
        data(){
            return {
                activeName:'first',
            }
        }
    }
</script>

<style scoped>

</style>