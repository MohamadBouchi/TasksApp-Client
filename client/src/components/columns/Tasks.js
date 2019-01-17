import React, { Component } from 'react';

export default class Tasks extends Component {

  onDragStart = (e, id) => {
    let data = {taskId: id, status: 'newTask'};
    let stringData = JSON.stringify(data)
    e.dataTransfer.setData('text',stringData);
  }
  
  render() {
    const { tasks } = this.props;
    return (
        <div className="col s12 m2 center-align" style={{background:'lightgray'}}>
          <h5>Tasks ({this.props.tasks.length})</h5>
          <hr/>
          <br/>
          { tasks && tasks.map(task =>{
            return (
              <div className='card z-depth-0 task-summary' key={task._id} draggable onDragStart={(e) => {this.onDragStart(e, task._id)}}>
                <div className='card-content grey-text text-darken-3'>
                    <span className='card-title'>
                    <div className="left">{task.title}</div>
                        <img className="btn btn-floating right" alt='MO' src={require('../../unknown.png')}/>
                    </span>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p className='left-align'>{task.description}</p>
                    <br></br>
                    <div className="card-action">
                    <p className='grey-text'>{task.deadline}</p>
                    </div>
                </div>
            </div>
            )
          })}
        </div>
    )
  }
}
