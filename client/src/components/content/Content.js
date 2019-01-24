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
import { createTask, updateUserTask, getTasks, createUserTask, setNotification, filterTasks } from '../../store/actions/TaskActions';
import { createActivity } from '../../store/actions/ActivityActions';
import io from 'socket.io-client';
import TaskDetail from '../taskDetail/TaskDetail';

const socket = io.connect("http://10.10.11.70:3000");
const activtyDate = new Date().getFullYear() + ("0" + new Date().getMonth()+1).slice(-2);
class Content extends Component {

  constructor(props){
    super(props)
    this.userNameElRef = React.createRef();
    this.taskDetailRef = React.createRef();
  }
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
    this.props.createActivity(activtyDate, newStatus, new Date().toISOString(), this.props.auth.userName, stringData.taskTitle);
    this.props.setNotification();
    if(!this.props.loading)
    setTimeout(()=>{
      socket.emit('updated', {ok: "OK"}); 
    },500)
    }
    componentDidMount(){
      setInterval(()=>{
        this.props.getTasks();
      },200000);
    socket.on('updated', (data) => {
      if(data.ok === 'OK')
        this.props.getTasks();
    });
  }
 
  handleFilter = () => {
    this.props.filterTasks(this.userNameElRef.current.value);
  }
 
  openDetail = (e) => {
    this.taskDetailRef.current.handleClickOpen(e);
  }
  render(){
    if(!this.props.loading){
      const {tasks} = this.props;
      const {open} = this.props;
      const {inProcess} = this.props;
      const {waiting} = this.props;
      const {finished} = this.props;
      const tasksData = {
        'tasks': tasks.length,
        'open': open.length,
        'inProcess': inProcess.length,
        'waiting': waiting.length,
        'finished': finished.length};
      const mohamed = this.props.userTasks.filter(myTask => {
        if (myTask.userId.userName === 'mbouchi')        
          return myTask;
        else return null;
      });
      const arndt = this.props.userTasks.filter(myTask => {
        if (myTask.userId.userName === 'aschneider')        
          return myTask;
        else return null;
      });
      const timo = this.props.userTasks.filter(myTask => {
        if (myTask.userId.userName === 'therwix')        
          return myTask;
        else return null;
      });
      const lukas = this.props.userTasks.filter(myTask => {
        if (myTask.userId.userName === 'ljansen')        
          return myTask;
        else return null;
      });
      return (
        <section id='section'>
          <TaskDetail ref={this.taskDetailRef}></TaskDetail>
          <div className="row">
            <div className="col s10 m10">
              <input type="text" onChange={this.handleFilter} placeholder='filter by user name or by task title' ref={this.userNameElRef}/>
            </div>
          </div>
          <div className="row dashboard__row">
            <Tasks tasks={tasks}></Tasks>
            <div className="col s12 m2 cyan lighten-4 center-align" 
                  onDragOver={(e) =>this.onDragOver(e)}
                  onDrop={(e) =>this.onDrop(e, 'open')}>
                <Open openDetail={this.openDetail} open={open}></Open>
            </div>
            <div className="col s12 m2 red lighten-4 center-align" 
                  onDragOver={(e) =>this.onDragOver(e)}
                  onDrop={(e) =>this.onDrop(e, 'inProcess')}>
                <InProcess openDetail={this.openDetail} inProcess={inProcess}></InProcess>
            </div>
            <div className="col s12 m2 orange lighten-4 center-align" 
                  onDragOver={(e) =>this.onDragOver(e)}
                  onDrop={(e) =>this.onDrop(e, 'waiting')}>
                <Waiting openDetail={this.openDetail} waiting={waiting}></Waiting>
            </div>
            <div className="col s12 m2 green accent-1 center-align" 
                  onDragOver={(e) =>this.onDragOver(e)}
                  onDrop={(e) =>this.onDrop(e, 'finished')}>
                <Finished openDetail={this.openDetail} finished={finished}></Finished>
            </div>
            <div className="col s12 m2 calendar-chart-col">
              <Calendar showNavigation={true} minDetail="year" view='year' maxDetail='year' minDate={new Date()} value={new Date()} maxDate={new Date()}/>
              <PieCharts tasksData={tasksData}
                         usersData={{'mohamed': mohamed, 'arndt': arndt, 'timo': timo, 'lukas': lukas}} 
              ></PieCharts>
            </div>
          </div>
        </section>
      );
    } else {
      return (
      <h6>loading</h6>
      );
    }
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
    userTasks: state.tasks.userTasks,
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterTasks: (filter) => dispatch(filterTasks(filter)), 
    createTask: () => dispatch(createTask()),
    setNotification: () => dispatch(setNotification()),
    getTasks: () => dispatch(getTasks()),
    createUserTask: (taskId, userId, status, date) => dispatch(createUserTask(taskId, userId, status, date)),
    updateUserTask: (id, status, date, userId) => dispatch(updateUserTask(id, status, date, userId)),
    createActivity: (date, status, changeDate, userName, taskTitle) => dispatch(createActivity(date, status, changeDate, userName, taskTitle))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Content);