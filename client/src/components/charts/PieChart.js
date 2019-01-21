import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import React, { Component } from 'react';
import './pieCharts.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS01 = ['#F44336', '#00bcd4', '#ff9800', '#4CAF50'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
class PieCharts extends Component {
  render () { 
    const wWidth = window.innerWidth;
    const data01 = [
      { name: 'Inprocess', value: this.props.tasksData.inProcess },
      { name: 'Open', value: this.props.tasksData.open },
      { name: 'waiting', value: this.props.tasksData.waiting },
      { name: 'finished', value: this.props.tasksData.finished }
    ];
    const data = [
      { name: 'Timo', value: this.props.usersData.timo.length },
      { name: 'Arndt', value: this.props.usersData.arndt.length },
      { name: 'Mohamed', value: this.props.usersData.mohamed.length }
    ];
    if(this.props.tasksData.tasks !== 0)
    return (
      <ResponsiveContainer width='99%' aspect={4.0/3.0} height='280px'>
        <PieChart>
          <Pie dataKey="value" 
            data={data01}
            cx={wWidth <= 1370 ? 110 : 150 }
            cy={wWidth <= 1370 ? 50 : 100 }
            outerRadius={60}
            fill="#8884d8"
            labelLine={true}
            label={renderCustomizedLabel} >
            {
              data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS01[index]} />
              ))
            }
          </Pie>
          <Pie dataKey="value"
            data={data}
            cx={wWidth <= 1370 ? 110 : 150 }
            cy={wWidth <= 1370 ? 50 : 100 }
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            label
            labelLine={true}
          >
            {
              data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)
            }

          </Pie>
          <Tooltip />
          <Legend
            align='center'
            layout='horizontal' />
        </PieChart>
      </ResponsiveContainer>
    );
    else return (<h6>loading</h6>);
  }
};

export default PieCharts;
