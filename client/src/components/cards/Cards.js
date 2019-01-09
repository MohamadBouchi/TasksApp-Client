import React, { Component } from 'react';
import './cards.css';

class Cards extends Component {
    onDragStart = (e) => {
        console.log('test')
    }
    render() {
        let Enabledraggable =true;
        
        return (
            <div className='card z-depth-0 task-summary' draggable={Enabledraggable} onDragStart={(e) => {this.onDragStart(e)}}>
                <div className='card-content grey-text text-darken-3'>
                    <span className='card-title'>
                    <div className="left">test</div>
                        <img className="btn btn-floating right" alt='MO' src={require('../../me.png')}/>
                    </span>
                    <br></br>
                    <hr></hr>
                    <br></br>
                    <p className='left-align'>test</p>
                    <br></br>
                    <div className="card-action">
                    <p className='grey-text'>3rd septemper</p>
                    {/* <Modal
                        header='Details'
                        trigger={<p ><a className='details'>Details</a></p>}>
                        <TaskDetailsModal/>
                    </Modal> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards;