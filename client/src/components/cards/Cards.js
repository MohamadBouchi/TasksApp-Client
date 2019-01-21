import React, { Component } from 'react';
import './cards.css';

class Cards extends Component {
    onDragStart = (e) => {
        let data = {id: this.props.task._id,
                    userName: this.props.task.userId.userName,
                    taskTitle: this.props.task.taskId.title,
                    status: this.props.task.status};
        let stringData = JSON.stringify(data)
        e.dataTransfer.setData('text',stringData);
    }
    render() {
        const {title} = this.props.task.taskId;
        const {description} = this.props.task.taskId;
        const  deadline = new Date(Number(this.props.task.taskId.deadline));
        return (
            <div className='card z-depth-0 task-summary' draggable onDragStart={(e) => {this.onDragStart(e)}}>
                <div className='card-content grey-text text-darken-3'>
                    <span className='card-title'>
                    <div className="left"><h6 className='truncate'>{title}</h6></div>
                        <img className="btn btn-floating right" alt='MO' src={require('../../'+ this.props.task.userId.userName +'.png')}/>
                    </span>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p className='left-align'>{description}</p>
                    <br></br>
                    <div className="card-action">
                    <p className='grey-text'>{deadline.getFullYear()+'-'+deadline.getMonth()+1+'-'+deadline.getDate()}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;