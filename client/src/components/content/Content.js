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
import { connect } from 'react-redux';
import { createTask, updateUserTask, getTasks } from '../../store/actions/TaskActions';
import Button from '@material-ui/core/Button';
import io from 'socket.io-client';

const socket = io.connect("http://192.168.0.234:3000");
class Content extends Component {
  onDragOver = (e) => {
    e.preventDefault();
  }
  onDrop = (e, newStatus) => {
    e.preventDefault();
    const stringData = JSON.parse(e.dataTransfer.getData("text"));
    this.props.updateUserTask(stringData.id, newStatus, new Date().toISOString());
    socket.emit('updated', null);
  }
  render(){
    socket.on('updated', (data) => {this.props.getTasks()});
    // if(!this.props.tasks.loading){
    //   console.log('tset')
    // }
    const {tasks}  = this.props;
    const {open}  = this.props;
    const {inProcess}  = this.props;
    const {waiting}  = this.props;
    const {finished}  = this.props;
    return (
      <section id='section'>
        <div className="row">
          {/* <Button onClick={this.props.createTask} >test</Button> */}
          <Tasks tasks={tasks}></Tasks>
          <div className="col s12 m2 cyan lighten-4 center-align" 
                onDragOver={(e) =>this.onDragOver(e)}
                onDrop={(e) =>this.onDrop(e, 'open')}>
              <Open open={open}></Open>
          </div>
          <div className="col s12 m2 red lighten-4 center-align" 
                onDragOver={(e) =>this.onDragOver(e)}
                onDrop={(e) =>this.onDrop(e, 'inProcess')}>
              <InProcess inProcess={inProcess}></InProcess>
          </div>
          <div className="col s12 m2 orange lighten-4 center-align" 
                onDragOver={(e) =>this.onDragOver(e)}
                onDrop={(e) =>this.onDrop(e, 'waiting')}>
              <Waiting waiting={waiting}></Waiting>
          </div>
          <div className="col s12 m2 green accent-1 center-align" 
                onDragOver={(e) =>this.onDragOver(e)}
                onDrop={(e) =>this.onDrop(e, 'finished')}>
              <Finished finished={finished}></Finished>
          </div>
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

const mapStateToProps = (state) =>{
  return {
    tasks: state.tasks.tasks,
    open: state.tasks.open,
    inProcess: state.tasks.inProcess,
    waiting: state.tasks.waiting,
    finished: state.tasks.finished
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createTask: () => dispatch(createTask()),
    getTasks: () => dispatch(getTasks()),
    updateUserTask: (id, status, date) => dispatch(updateUserTask(id, status, date))
  }
}
// export default connect(mapStateToProps)(Content);
export default connect(mapStateToProps, mapDispatchToProps)(Content);