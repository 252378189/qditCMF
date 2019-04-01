<template>
    <div style="margin-top: 15px;">
        <div style="height: 120px">
            <el-row>
                <el-col :span="6">
                    <el-row style="height: 120px">
                        <el-col :span="6" class="left_base pv">
                            <i class="al-font font-control">&#xe634;</i>
                        </el-col>
                        <el-col :span="12" class="right_base">
                            <p class="num">{{ pv }}</p>
                            <p class="desc">今日访问</p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row style="height: 120px">
                        <el-col :span="6" class="left_base article">
                            <i class="al-font font-control">&#xe662;</i>
                        </el-col>
                        <el-col :span="12" class="right_base">
                            <p class="num">{{article_total}}</p>
                            <p class="desc">新增文章</p>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6">
                    <el-row style="height: 120px">
                        <el-col :span="6" class="left_base submit">
                            <i class="al-font font-control">&#xe644;</i>
                        </el-col>
                        <el-col :span="12" class="right_base ">
                            <p class="num">{{submit}}</p>
                            <p class="desc">今日提交</p>
                        </el-col>
                    </el-row>
                </el-col>

            </el-row>
        </div>
        <div style="margin-top:30px;">
            <el-row>
                <el-col :span="14">
                    <div style="width: 100%;height: 300px;" id="echartss"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import axios from '@/libs/axios';

    export default {
        data() {
            return {
                pv: 0,
                article_total: 0,
                submit: 0,
                echarts1_option: {
                    title: {
                        text: '一周访问趋势统计',
                        left: 'center'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },
                    yAxis: {},
                    series: [{
                        name: '访问统计',
                        type: 'bar',
                        data: [0, 0,0, 0, 0, 0, 0]
                    }]
                },
            }
        },
        created: function () {
            axios.get('/config?keyword=admin_base',).then((response) => {
                this.pv = response.data.data.pv;
                this.article_total = response.data.data.article_total;

                this.submit = response.data.data.submit;
                // 基于准备好的dom，初始化echarts实例   
                let myChart = echarts.init(document.getElementById('echartss'));
                // 绘制图表，this.echarts1_option是数据     
                myChart.setOption(this.echarts1_option);

                // // 基于准备好的dom，初始化echarts实例   
                // let source = echarts.init(document.getElementById('source'));
                // // 绘制图表，this.echarts1_option是数据     
                // source.setOption(this.option);
            });
        }
    }
</script>

<style>
    .left_base {
        height: 100%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        text-align: center;
    }

    .pv {
        background: rgb(45, 140, 240);
    }

    .article {
        background: rgb(25, 190, 107);
    }

    .share {
        background: rgb(237, 63, 20);
    }

    .submit {
        background: rgb(154, 102, 228);
    }

    .right_base {
        height: 100%;
        width: 70%;
        background: #fff;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .icon_base {
        font-size: 36px;
        margin-top: 40px
    }

    .num {
        margin-top: 20px;
        text-align: center;
        font-size: 36px;
    }

    .desc {
        text-align: center;
        font-size: 18px;
    }

    .font-control {
        font-size: 36px;
        display: inline-block;
        color: rgb(255, 255, 255);
        margin-top: 40px;
    }

</style>