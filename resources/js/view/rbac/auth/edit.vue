<template>
    <el-form ref="form" :rules="rules" :model="form" label-width="80px" v-loading="loading">
        <el-form-item label="所属菜单">
            <el-cascader :options="menu_list" v-model="form.menu_id"  placeholder="请选择..."></el-cascader>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="description">
            <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="权限标识" prop="keyword">
            <el-input v-model="form.keyword"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
            <el-input v-model.number="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="权限扩展" prop="extented">
            <code-mirror ref="codemirror" v-on:change="change"></code-mirror>
        </el-form-item>
        <el-form-item label="类型" prop="state">
            <el-select v-model="form.type" placeholder="请选择">
                <el-option
                    v-for="item in types"
                    :key="item.value"
                    :label="item.text"
                    :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('form')">立即修改</el-button>
            <el-button @click="close">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {editAuthCreate,editAuth} from "../../../api/user"
    import {getSystemMenu} from "@/api/app";
    import {getParent} from "@/api/app";
    import CodeMirror from '../../../components/public/codemirror'
    import {getConfigArray} from '../../../config/sys_config'
    import form_page from '@/mixins/form_page'
    export default {
        name: "edit",
        mixins: [form_page],
        data() {
            return {
                types:getConfigArray('auth_type'),
                loading:false,
                menu_list:[],
                form: {
                    menu_id:null,
                    name: '',
                    description: '',
                    keyword: '',
                    sort: 1000,
                    type: 1,
                    extented: "",
                },
                rules: {
                    name: [
                        { required: true, message: '请输入权限名称', trigger: 'blur' },
                    ],
                    menu_id:[{
                        required: true, message: '所属菜单项必须选择', trigger: 'blur'
                    }],
                    keyword:[{
                        required: true, message: '关键字必须填写', trigger: 'blur'
                    }],
                },
                menu_ids:[],
            }
        },
        components:{
            CodeMirror,
        },
        props:['id'],
        created(){
            this.handleGetData(getSystemMenu()).then((response)=>{
                this.menu_list =  this.makeTree(response.data);
            });
            editAuthCreate(this.id).then((response)=>{
                //得到显示路径 与数据
                this.ShowPath(response.data.data);
            })

        },
        methods: {
            onSubmit(form) {
                if (this.form.type === null) {
                    this.$message.error('请求类型必须选择');
                    return false;
                }
                let data = JSON.parse(JSON.stringify(this.form));
                data['menu_id'] = this.form.menu_id[this.form.menu_id.length - 1];
                console.log(data);
                if(this.handleValid()){
                    this.handleSubmit(editAuth(data,this.id));
                }

            },
            close(){
                this.$emit('close');
            },
            change(value){
                this.form.extented = value;
            },
            makeTree(data){
                //构建树形结构
                let tree = [];
                //第一级
                data.forEach(child=>{
                    let child_1 = {value:child.id,label:child.name,children:[]};
                    //第一级压入树
                    tree.push(child_1);
                    if (child.sub_menu.length >0){
                        //生成二级树
                        child.sub_menu.forEach(item=>{
                            let child_2 = null;
                            if (item.sub_menu.length >0){
                                child_2 = {value:item.id,label:item.name,children:[]};
                            }else{
                                child_2 = {value:item.id,label:item.name};
                            }
                            //吧二级树压入第一级
                            child_1.children.push(child_2);
                            if (item.sub_menu.length >0){
                                //生成三级树
                                item.sub_menu.forEach(son=>{
                                    let child_3 = {value:son.id,label:item.name};
                                    //吧三级树压入二级
                                    child_2.children.push(child_3);
                                })
                            }
                        })
                    }
                });
                return tree;
            },
            ShowPath(data){
                getParent(data.menu_id).then((response)=>{
                    data.menu_id =  response.data.data;
                    this.form = data;
                    if (data.extented){
                        this.$refs.codemirror.code = data.extented;
                    } else {
                        this.$refs.codemirror.code = '';
                    }

                });
            },
        }

    }
</script>

<style scoped>

</style>