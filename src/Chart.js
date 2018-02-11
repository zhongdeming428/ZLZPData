import React from 'react';
import echarts from 'echarts';
import LC from 'leancloud-storage';

class Chart extends React.Component {
    constructor(){
        super();
        this.processData = processData.bind(this);
        this.fetchData = fetchData.bind(this);
    }
    render(){
        return <div id={this.props.token} className="Chart">

        </div>
    }
    componentDidMount(){
        let myChart = echarts.init(document.getElementById(this.props.token));
        this.processData().then((options)=>{
            myChart.setOption(options);
        },(e)=>{
            console.error(e);
        });
        myChart.setOption({
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            backgroundColor:'#c99',
            title: {
                text: 'Loading......',
                textStyle:{
                    color:'white',
                    fontSize:10
                }
            },
            tooltip: {},
            textStyle:{color:'white',fontSize:8},
            legend: {
                data:['起薪','顶薪'],
                textStyle:{
                    color:'white'
                }
            },
            xAxis: {
                data: ["Android","Web","C","DB","IOS","PHP","Java"]
            },
            yAxis: {},
            series: [{
                name: '起薪',
                type: 'bar',
                data: [0, 0, 0, 0, 0, 0, 0]
            },{
                name:'顶薪',
                type:'bar',
                data:[0,0,0,0,0,0,0]
            }]
        });
    }
}

export default Chart;


function fetchData(){
    return new Promise((resolve, reject)=>{
        let str = this.props.name;
        if(/[a-zA-Z]/g.test(str)){
            let query = new LC.Query('Data');
            query.equalTo('name', str);
            query.find().then((res)=>{
                resolve(res);
            },(e)=>{
                reject(e);
            });
        }
        else{
            let query = new LC.Query('Data');
            query.equalTo('city', str);
            query.find().then(
                (res)=>{
                    resolve(res);
                },
                (e)=>{
                    reject(e);
                }
            );
        }
    });
}
function processData(){
    return new Promise((resolve, reject)=>{
        let options = {
            color: ['#003366', '#006699', '#4cabce', '#e5323e'],
            backgroundColor:'#c99',
            title: {
                text: 'ECharts 入门示例',
                textStyle:{
                    color:'white',
                    fontSize:10
                }
            },
            tooltip: {
            },
            toolbox:{
                show:true,
                feature:{
                    saveAsImage:{
                        show: true
                    }
                }
            },
            dataZoom:[
                {
                    type:'inside'
                }
            ],
            textStyle:{color:'white',fontSize:8},
            legend: {
                data:['起薪','顶薪'],
                textStyle:{
                    color:'white'
                }
            },
            xAxis: {
                type:'category',
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"],
                axisTick: {
                    alignWithLabel: true
                }
            },
            yAxis: {},
            series: [{
                name: '起薪',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            },{
                name:'顶薪',
                type:'bar',
                data:[15,25,40,15,20,26]
            }]
        };
        var str = this.props.name;
        this.fetchData().then((res)=>{
            let xAxis = [];
            let lowerSalary = [];
            let higherSalary = [];
            let flag = /[a-zA-Z]/g.test(str);
            res.forEach(r => {
                if(flag){
                    xAxis.push(r.attributes.city);
                }
                else {
                    xAxis.push(r.attributes.name);
                }
                lowerSalary.push(r.attributes.lowerSalary);
                higherSalary.push(r.attributes.higherSalary);
            });
            options.xAxis.data = xAxis;
            options.series = [{
                name: '起薪',
                type: 'bar',
                data: lowerSalary
            },{
                name:'顶薪',
                type:'bar',
                data:higherSalary
            }];
            //判断是工作岗位还是工作城市
            if(flag){
                options.title.text = `${str}岗各主要城市招聘数据`;
                options.xAxis.axisLabel = {  
                    interval:0 ,  
                    formatter:function(val){  
                      return val.split("").join("\n");  
                    }  
                };
                resolve(options);
            }
            else {
                options.title.text = `${str}各软件岗招聘数据`;
                resolve(options);
            }
        },(e)=>{
            console.error(e);
            reject(e);
        });
    });
}