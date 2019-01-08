import React, { Component } from 'react'
import Cards from '../cards/Cards';

export default class InProcess extends Component {
  render() {
    return (
      <div>
        <div className="col s12 m2 red lighten-4 center-align">
          <h5>In Process</h5>
          <hr/>
          <br/>
          <Cards></Cards>
        </div>        
      </div>
    )
  }
}
