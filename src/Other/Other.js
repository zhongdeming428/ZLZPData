import React from 'react';
import './Other.css';
import LC from 'leancloud-storage';
import echarts from 'echarts';

const jobs = ['Web', 'Java', 'PHP', 'C', 'IOS', 'DB', 'Android'];
const cities = ['深圳','武汉','上海','广州','北京','杭州','西安','长沙','成都','南京','天津',
                '大连','长春','沈阳','济南','青岛','苏州','无锡','重庆','宁波','厦门',
                '福州','哈尔滨','石家庄','合肥','惠州','郑州'];
let options = {
    title : {
        text: '招聘需求统计',
        x:'center'
    },
    toolbox:{
        show:true,
        feature:{
            saveAsImage:true
        }
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        right: 10,
        top: 20,
        bottom: 20,
        data: [],

        selected: []
    },
    series : [
        {
            name: '招聘需求',
            type: 'pie',
            radius : '55%',
            center: ['40%', '50%'],
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};

class Other extends React.Component {
    constructor(){
        super();
        this.fetchData = fetchData.bind(this);
    }
    render(){
        return <div className="Other">
            <h1>各城市各岗位招聘需求占比分析</h1>
            <div id="pie2" style={{width:'80%',height:'20rem',margin:'5% 10%'}}></div>
            <div id="pie1" style={{width:'80%',height:'20rem',margin:'5% 10%'}}></div>
            <p>所有数据均来自智联招聘网站，通过Node爬虫共收集到27000余条数据，数据有效期截止到2月8号，有效性请自行判断，作者不承担任何责任。</p>
        </div>
    }
    componentDidMount(){
        alert('初次加载耗时较长，请耐心等待...');
        this.fetchData().then(data=>{
            processData(data.results);
        }).catch(e=>{
            console.error(e);
        });
    }
}

export default Other;

//Fetch data from LeanCloud
function fetchData(){
    let cql = 'select * from Data limit 200';
    return LC.Query.doCloudQuery(cql);
    //return a Promise object
}

//Process data from fetchData(){}
function processData(data){
    let option = options;
    let data1 = [];
    let data2 = [];
    let legendData1 = [];
    let legendData2 = [];
    let myPie1 = echarts.init(document.getElementById('pie1'));
    let myPie2 = echarts.init(document.getElementById('pie2'));
    jobs.forEach((job, index) => {
        data1.push(processArray(job, data));
        legendData1.push(job);
    });
    cities.forEach(city => {
        data2.push(processArray(city, data));
        legendData2.push(city);
    });
    option.series[0].data = data1.sort((a, b)=>{return a-b;});
    option.title.text = '各软件岗招聘需求';
    option.legend.data = legendData1;
    myPie1.setOption(option);
    option.series[0].data = data2.sort((a, b)=>{return a-b;});
    option.title.text = '各城市招聘需求';
    option.legend.data = legendData2;
    myPie2.setOption(option);
}

//process data from given array
function processArray(keyword, array){
    let flag = /[a-zA-Z]/g.test(keyword);
    let count = 0;
    if(flag){
        array.forEach(r => {
            if(r.attributes.name === keyword){
                count += r.attributes.count;
            }
        });
    }
    else {
        array.forEach(r => {
            if(r.attributes.city === keyword){
                count += r.attributes.count;
            }    
        });
    }
    return {
        name: keyword,
        value: count
    };
}