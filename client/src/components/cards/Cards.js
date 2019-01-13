import React, { Component } from 'react';
import './cards.css';


class Cards extends Component {
    onDragStart = (e) => {
        let data = {id: this.props.task._id, status: this.props.task.status};
        let stringData = JSON.stringify(data)
        e.dataTransfer.setData('text',stringData);
    }
    render() {
        const {title} = this.props.task.taskId;
        const {description} = this.props.task.taskId;
        const {deadline} = this.props.task.taskId;
        return (
            <div className='card z-depth-0 task-summary' draggable onDragStart={(e) => {this.onDragStart(e)}}>
                <div className='card-content grey-text text-darken-3'>
                    <span className='card-title'>
                    <div className="left">{title}</div>
                        <img className="btn btn-floating right" alt='MO' src={require('../../me.png')}/>
                    </span>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p className='left-align'>{description}</p>
                    <br></br>
                    <div className="card-action">
                    <p className='grey-text'>{deadline}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;