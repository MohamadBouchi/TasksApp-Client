import { PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';
import React, { Component } from 'react';

const data = [{name: 'Timo', value: 20}, {name: 'Arndt', value: 20},
                  {name: 'Ralf', value: 30}, {name: 'Mohamed', value: 10}];
const data01 = [{name: 'Inprocess', value: 1},{name: 'Open', value: 5},{name: 'waiting', value: 7},{name: 'finished', value: 10}]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const COLORS01 = ['#8dd1e1', '#83a6ed', '#82ca9d', '#d0ed57'];


export default class PieCharts extends Component {
render () {
    return (
      <PieChart width={500} height={210} >
    <Pie dataKey="value" data={data01} cx={110} cy={110} outerRadius={60} fill="#8884d8">
    {
      data01.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS01[index]}/>
      ))
    }
  </Pie>
      <Pie dataKey="value"
        data={data} 
        cx={110} 
        cy={110} 
        innerRadius={60}
        outerRadius={80} 
        fill="#8884d8"
        paddingAngle={5} 
        label
      >
          {
            data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)
        }
        
      </Pie>
     <Tooltip />
     <Legend align='left' layout='vertical'/>
    </PieChart>
  );
}
};