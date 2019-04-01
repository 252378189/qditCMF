<template>
    <div>
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>
    </div>
</template>

<script>
    import {CopyRightDelete} from "../../api/system";
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    export default {
        name: "copyright",
        components:{Table},
        mixins: [list_page],
        data(){
            return{
                columns:[
                    {
                        label: '版权类型',
                        prop: 'type',
                    },
                    {
                        label: '版权名称',
                        prop: 'name',
                    },
                    {
                        label: '电话',
                        prop: 'phone',
                    },
                    {
                        label: '查询日期',
                        prop: 'created_at',
                    },
                    {
                        label: '操作',
                        width: '200',
                        tools: this.handleGetBtn()
                    }
                ],
                url:"CopyRight"
            }
        },
        methods:{
            handleTools(type, index, row){
                if (type == 'delete') {
                    CopyRightDelete(row.id).then((response) => {
                        this.handleDeleteRow(index);
                        //提示信息
                        this.$message.success(response.data.msg);
                    })
                }
            },
            handleGetBtn()
            {
                let conf = {
                    delete: {
                        type: 'danger',
                        icon: 'el-icon-delete',
                    }
                };
                let result = {};
                this.$store.state.user.auth.copy_right.forEach(item => {
                    if (item in conf) {
                        result[item] = conf[item];
                    }
                });
                return result;
            }
        }
    }
</script>

<style scoped>

</style>