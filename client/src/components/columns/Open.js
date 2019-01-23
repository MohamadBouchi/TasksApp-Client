import React, { Component } from 'react'
import Cards from '../cards/Cards';

export default class Open extends Component {
  render() {
    const {open} = this.props;
    return (
      <div>
          <h5>Open ({open.length})</h5>
          <hr/>
          <br/>
          {open && open.map(task => (
            <Cards openDetail={this.props.openDetail} task={task} key={task._id}/>
          ))}
        </div>
    )
  }
}
