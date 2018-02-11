import React from 'react';
import './Head.css';
import { NavLink } from 'react-router-dom';

class Head extends React.Component {
    render(){
        return <div className='Head'>
            <h1>软件行业招聘数据展示</h1>
            <div className="LinkBar">
                <NavLink to="/" activeStyle={{'color':'#636'}} exact>城市对比</NavLink>
                <NavLink to="/city" activeStyle={{'color':'#636'}} exact>岗位对比</NavLink>
                <NavLink to="/other" activeStyle={{'color':'#636'}} exact>其它</NavLink>
            </div>
        </div>
    }
}

export default Head;