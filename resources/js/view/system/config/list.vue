<template>
    <el-tabs v-model="activeName">
        <el-tab-pane :lazy="true" label="微信配置" name="first">

        </el-tab-pane>
        <el-tab-pane :lazy="true"  label="防刷配置" name="second">

        </el-tab-pane>
        <el-tab-pane :lazy="true"  label="通知配置" name="third">

        </el-tab-pane>
    </el-tabs>
</template>
<script>

    export default {
        components: {},
        data() {
            return {
                activeName: 'first'
            };
        },
        methods: {

        }
    };
</script>