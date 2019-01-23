import React, { Component } from 'react';
import Cards from '../cards/Cards';
export default class InProcess extends Component {
  
  render() {
    const {inProcess} = this.props;
    return (
      <div>
        <h5>In Process ({inProcess.length})</h5>
        <hr/>
        <br/>
        {inProcess && inProcess.map(task => (
            <Cards openDetail={this.props.openDetail} task={task} key={task._id}/>
          ))}
      </div>
    )
  }
}
