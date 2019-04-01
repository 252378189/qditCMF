<template>
    <div>
        <Table ref="table" :url="url" :columns="columns" :checkbox="false" v-on:tools="handleTools"></Table>
    </div>
</template>

<script>
    import {patentDelete} from "../../api/system";
    import Table from "@/components/public/table";
    import list_page from "@/mixins/list_page";
    export default {
        name: "patent",
        components:{Table},
        mixins: [list_page],
        data() {
            return {
                columns: [
                    {
                        label: '专利类型',
                        prop: 'type',
                    },
                    {
                        label: '减缴类型',
                        prop: 'sub_pay',
                    },
                    {
                        label: '专利申请日期',
                        prop: 'fil_time',
                    },
                    {
                        label: '专利授权日期',
                        prop: 'auth_time',
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
                url: "patent",
            }
        },
        methods: {
            handleTools(type, index, row) {
                if (type == 'delete') {
                    patentDelete(row.id).then((response) => {
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
                this.$store.state.user.auth.patent.forEach(item => {
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