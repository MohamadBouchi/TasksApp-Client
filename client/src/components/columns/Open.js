import React, { Component } from 'react'
import Cards from '../cards/Cards';

export default class Open extends Component {
  render() {
    return (
      <div>
        <div className="col s12 m2 cyan lighten-4 center-align">
          <h5>Open</h5>
          <hr/>
          <br/>
            <Cards></Cards>
        </div>        
      </div>
    )
  }
}
