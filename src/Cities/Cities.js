import React from 'react';
import './Cities.css';
import Chart from '../Chart';

const cities = ['深圳','武汉','上海','广州','北京','杭州','西安','长沙','成都','南京','天津',
                '大连','长春','沈阳','济南','青岛','苏州','无锡','重庆','宁波','厦门',
                '福州','哈尔滨','石家庄','合肥','惠州','郑州'];

class Cities extends React.Component {
    render(){
        return <div className="Jobs">
            {
                cities.map((city, index)=>{
                    return <Chart name={city} token={`Cities_${index}`} key={index}/>
                })
            }
        </div>
    }
}

export default Cities;