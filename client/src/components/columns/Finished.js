import React, { Component } from 'react';
import Cards from '../cards/Cards';

export default class Finished extends Component {
  render() {
    const {finished} = this.props;
    return (
      <div>
          <h5>Finished ({finished.length})</h5>
          <hr/>
          <br/>
          {finished && finished.map(task => (
            <Cards openDetail={this.props.openDetail} task={task} key={task._id}/>
          ))}
      </div>
    )
  }
}
