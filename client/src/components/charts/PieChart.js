import { PieChart, Pie, Cell, Tooltip} from 'recharts';
import React, { Component } from 'react';

const data = [{name: 'Timo', value: 20}, {name: 'Arndt', value: 20},
                  {name: 'Ralf', value: 30}, {name: 'Mohamed', value: 10}];
const data01 = [{name: 'Inprocess', value: 1},{name: 'Open', value: 5},{name: 'waiting', value: 7},{name: 'finished', value: 10}]
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


export default class PieCharts extends Component {
render () {
    return (
      <PieChart width={500} height={210} >
    <Pie dataKey="value" data={data01} cx={120} cy={90} outerRadius={60} fill="#8884d8"/>
      <Pie dataKey="value"
        data={data} 
        cx={120} 
        cy={90} 
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
    </PieChart>
  );
}
};