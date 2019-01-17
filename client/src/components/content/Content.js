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
import { createTask, updateUserTask, getTasks, createUserTask, setNotification } from '../../store/actions/TaskActions';
import io from 'socket.io-client';

const socket = io.connect("http://10.10.11.70:3000");
class Content extends Component {
  onDragOver = (e) => {
    e.preventDefault();
  }
  onDrop = (e, newStatus) => {
    e.preventDefault();
    const stringData = JSON.parse(e.dataTransfer.getData("text"));
    if(stringData.status === 'newTask'){
      const taskId = stringData.taskId;
      this.props.createUserTask(taskId, this.props.userId, newStatus, new Date().toISOString());
    }
    else {
      this.props.updateUserTask(stringData.id, newStatus, new Date().toISOString(), this.props.userId);
    }
    socket.emit('updated', null);
    socket.on('updated', (data) => {
      this.props.getTasks();
    });
    this.props.setNotification();
  }
  render(){
      const {tasks}  = this.props;
      const {open}  = this.props;
      const {inProcess}  = this.props;
      const {waiting}  = this.props;
      const {finished}  = this.props;
      return (
        <section id='section'>
          <div className="row">
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
    finished: state.tasks.finished,
    loading: state.tasks.loading,
    userId: state.auth.userId,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createTask: () => dispatch(createTask()),
    getTasks: () => dispatch(getTasks()),
    createUserTask: (taskId, userId, status, date) => dispatch(createUserTask(taskId, userId, status, date)),
    updateUserTask: (id, status, date, userId) => dispatch(updateUserTask(id, status, date, userId)),
    setNotification: () => dispatch(setNotification())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);