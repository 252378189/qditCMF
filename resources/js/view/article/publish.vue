<template>
    <div>
        <div style="width: 65%" class="left">
            <el-form ref="articleForm" :model="articleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="articleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="文章内容" prop="content">
                    <vue-ueditor-wrap :config="Ueconfig" v-model="articleForm.content"></vue-ueditor-wrap>
                </el-form-item>
                <el-form-item label="文章描述" prop="desc">
                    <el-input v-model="articleForm.desc" placeholder="文章描述"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <el-card class="box-card">
                <div slot="header" class="clearfix">
                    <span>其他选项</span>
                </div>
                <p>
                    <span style="font-size: 12px;color: #606266;">文章分类</span>&nbsp;&nbsp;
                    <el-cascader size="small"
                                 expand-trigger="click"
                                 :options="options"
                                 placeholder="发表文章需要选择一个分类"
                                 v-model="articleForm.c_id">
                    </el-cascader>
                </p>
                <div style="margin-top: 10px;font-size: 12px;color: #606266;">
                    <div style="float: left;margin-right: 15px">文章封面</div>
                    <div style="float: left">
                        <upload :img="articleForm.cover" v-on:img-success="success"></upload>
                    </div>
                </div>
                <div style="clear: both"></div>
                <div style="margin-top: 15px">
                    <div style="font-size: 12px;color: #606266;float: left;margin-right: 15px">
                        关键字
                    </div>
                    <div style="float: left;width: 85%">
                        <el-input size="small" v-model="articleForm.keyword" placeholder="关键字已逗号隔开"></el-input>
                    </div>
                </div>
                <div style="clear: both"></div>
                <el-tabs v-model="activeName">
                    <el-tab-pane label="选项配置" name="first">
                        <p>
                            <el-checkbox v-model="articleForm.top" true-label="1" false-label="0">文章置顶</el-checkbox>
                            <el-checkbox v-model="articleForm.recommend" true-label="1" false-label="0"> 文章推荐
                            </el-checkbox>
                        </p>
                    </el-tab-pane>
                    <el-tab-pane label="选择模板" name="second">
                        <el-select v-model="articleForm.template_id" placeholder="请选择">
                            <el-option
                                    v-for="item in templateOption"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-tab-pane>
                </el-tabs>
                <p style="margin-top: 10px">
                    <el-button type="primary" @click="onSubmit('articleForm')">立即发表</el-button>
                </p>
            </el-card>
        </div>
    </div>
</template>

<script>
    import form_page from '@/mixins/form_page';
    import upload from '@/components/public/upload';
    import {article_add, category_List, template_getList} from '@/api/article';
    import loading from '@/mixins/loading'
    import VueUeditorWrap from 'vue-ueditor-wrap';
    import ueConfig from '@/config'

    export default {
        mixins: [form_page, loading],
        name: "publish",
        data() {
            return {
                activeName: 'first',
                articleForm: {
                    cover: '', //文章封面
                    title: '',    //文章标题
                    desc: '', //文章描述
                    content: '',    //文章内容
                    keyword: '', //文章关键字
                    recommend: "0",
                    top: "0",
                    template_id: 1,//模板Id
                    c_id: [],//文章分类
                },
                rules: {
                    title: [{required: true, message: '文章标题为必填项目', trigger: 'blur'},],
                    content: [{required: true, message: '文章内容为必填项目', trigger: 'blur'}],
                },
                options: [],
                Ueconfig: ueConfig.Ueconfig,
                templateOption: []
            }
        },
        created() {
            //获得分类列表
            category_List().then(response => {
                this.options = response.data.data;
            });
            template_getList().then(response => {
                this.templateOption = response.data.data;
            })
        },
        methods: {
            onSubmit(articleForm) {
                if (this.articleForm.c_id.length == 0) {
                    this.$message.error('请选择一个文章分类');
                    return false;
                }
                if (this.handleValid(articleForm)) {
                    article_add(this.articleForm)
                        .then(response => {
                            this.$message.success('文章发布成功');
                            this.$router.push('/article_list');
                        })
                }
            },
            success(value) {
                this.articleForm.cover = value;
            },
        },
        components: {
            upload, VueUeditorWrap
        }

    }
</script>

<style>
    .left {
        float: left;
        width: 65%;
    }

    .right {
        width: 30%;
        float: right;
    }

    .edui-editor {
        width: 100% !important;
    }

    .edui-editor-iframeholder {
        width: 100% !important;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>