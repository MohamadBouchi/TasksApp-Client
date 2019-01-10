import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts';
import React, { Component } from 'react';

const data = [{name: 'Timo', value: 20}, {name: 'Arndt', value: 20},
                  {name: 'Ralf', value: 30}, {name: 'Mohamed', value: 10}];
const data01 = [{name: 'Inprocess', value: 1},{name: 'Open', value: 5},{name: 'waiting', value: 7},{name: 'finished', value: 10}]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS01 = ['#8dd1e1', '#83a6ed', '#82ca9d', '#d0ed57'];

const RADIAN = Math.PI / 180;    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
 const x  = cx + radius * Math.cos(-midAngle * RADIAN);
 const y = cy  + radius * Math.sin(-midAngle * RADIAN);

 return (
   <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
     {`${(percent * 100).toFixed(0)}%`}
   </text>
 );
};


export default class PieCharts extends Component {
render () {
    return (
      <ResponsiveContainer width='100%' aspect={4.0/3.0} height='210px'>
      <PieChart>
    <Pie dataKey="value" data={data01} cx={80} cy={100} outerRadius={60} fill="#8884d8" label={renderCustomizedLabel} >
    {
      data01.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS01[index]}/>
      ))
    }
  </Pie>
      <Pie dataKey="value"
        data={data} 
        cx={80} 
        cy={100} 
        innerRadius={60}
        outerRadius={80} 
        fill="#8884d8"
        paddingAngle={2} 
        label
        labelLine={true}
      >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
        }
        
      </Pie>
     <Tooltip />
     <Legend align='left' layout='vertical'/>
    </PieChart>
    </ResponsiveContainer>
  );
}
};