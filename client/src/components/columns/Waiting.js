import React, { Component } from 'react';
import Cards from '../cards/Cards';

export default class Waiting extends Component {
  render() {
    const {waiting} = this.props;
    return (
      <div>
          <h5>Waiting ({waiting.length})</h5>
          <hr/>
          <br/>
          {waiting && waiting.map(task => (
            <Cards openDetail={this.props.openDetail} task={task} key={task._id}/>
          ))}
      </div>
    )
  }
}
