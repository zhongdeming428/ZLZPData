import React from 'react';
import './Jobs.css';
import Chart from '../Chart';

const jobs = ['Web', 'Java', 'PHP', 'C', 'IOS', 'DB', 'Android'];

class Jobs extends React.Component {
    render(){
        return <div className="Jobs">
            {
                jobs.map((job, index) => {
                    return <Chart name={job} token={`Jobs_${index}`} key={index}/>
                })
            }
        </div>
    }
}

export default Jobs;