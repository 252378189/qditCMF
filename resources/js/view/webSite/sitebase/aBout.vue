<template>
    <div>
        <div style="width: 45%">
            <span>介绍内容:</span>
            <vue-ueditor-wrap :config="Ueconfig" v-model="configPost.value.content"></vue-ueditor-wrap>
        </div>
        <div style="margin-top: 45px">
            <el-button type="success" @click="submit">保存信息</el-button>
        </div>
    </div>
</template>

<script>
    import VueUeditorWrap from 'vue-ueditor-wrap';
    import ueConfig from '@/config'
    import {configUpdateOrCreate, config_get} from '@/api/system';

    export default {
        name: "aBout",
        components: {
            VueUeditorWrap
        },
        data() {
            return {
                Ueconfig: ueConfig.Ueconfig,
                configPost: {
                    pid: 0,
                    type: 'json',
                    keyword: 'about',
                    desc: '关于我们',
                    value: {
                        content: "",
                    }
                }
            }
        },
        created() {
            config_get('about').then((response) => {
                this.configPost.value.content = response.data.data.content;
            })
        },
        methods: {
            submit() {
                configUpdateOrCreate(this.configPost).then((response) => {
                    this.$message.success(response.data.msg)
                })
            }
        }
    }
</script>

<style scoped>

</style>