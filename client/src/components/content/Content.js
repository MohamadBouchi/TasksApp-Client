import React, { Component } from 'react'
import Open from '../columns/Open';
import InProcess from '../columns/InProcess';
import Tasks from '../columns/Tasks';
import Waiting from '../columns/Waiting';
import Finished from '../columns/Finished';
import '../columns/columns.css';
import Calendar from 'react-calendar';
import PieCharts from '../charts/PieChart';
import './content.css';

export default class Content extends Component {
  render(){
    return (
      <section id='section'>
        <div className="row">
          <Tasks></Tasks>
          <Open></Open>
          <InProcess></InProcess>
          <Waiting></Waiting>
          <Finished></Finished>
          <div>
          <div className="col s12 m2">
            <Calendar minDetail="year" view='year' maxDetail='year' minDate={new Date()} value={new Date()} maxDate={new Date()}/>
            <PieCharts></PieCharts>
            <PieCharts></PieCharts>
          </div>
          </div>
        </div>
      </section>
    )
  }
}
