import React, { Component } from 'react';
import { TimelineItem }  from 'vertical-timeline-component-for-react';
import './timeline.css';

const bodyContainerStyle = {
            background: 'bisque',
            margin: '0 10px 0 15px',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}

export default class TimeLineItem extends Component {
  render() {
    return (
      <div>
        <TimelineItem
          key="001"
          dateText="01.01.19 12:30"
          style={{ color: '#61b8ff' }}
          dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Mohamed</h5>
          <h6 style={{ color: '#61b8ff' }}>Task5</h6>
          <p>
            Change Status to <i style={{color: 'green'}}>finished</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="002"
          dateText="01.01.19 12:30"
          style={{ color: '#76bb7f' }}
          dateInnerStyle={{ background: '#76bb7f' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Mohamed</h5>
          <h6 style={{ color: '#61b8ff' }}>Task1</h6>
          <p>
            Change Status to <i style={{color: 'green'}}>finished</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="003"
          dateText="01.01.19 12:00"
          style={{ color: '#e86971' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Kasper</h5>
          <h6 style={{ color: '#61b8ff' }}>Task2</h6>
          <p>
            Change Status to <i style={{color: 'orange'}}>witting</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="004"
          dateText="01.01.19 11:30"
          style={{ color: '#61b8ff' }}
          dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Ralf</h5>
          <h6 style={{ color: '#61b8ff' }}>Task3</h6>
          <p>
            Change Status to <i style={{color: 'green'}}>finished</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="005"
          dateText="01.01.19 11:00"
          style={{ color: '#76bb7f' }}
          dateInnerStyle={{ background: '#76bb7f' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Arndt</h5>
          <h6 style={{ color: '#61b8ff' }}>Task8</h6>
          <p>
            Change Status to <i style={{color: 'red'}}>in process</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="006"
          dateText="01.01.19 10:30"
          style={{ color: '#e86971' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Timo</h5>
          <h6 style={{ color: '#61b8ff' }}>Task4</h6>
          <p>
            Change Status to <i style={{color: 'blue'}}>open</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="007"
          dateText="01.01.19 11:30"
          style={{ color: '#61b8ff' }}
          dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Ralf</h5>
          <h6 style={{ color: '#61b8ff' }}>Task3</h6>
          <p>
            Change Status to <i style={{color: 'green'}}>finished</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="008"
          dateText="01.01.19 11:00"
          style={{ color: '#76bb7f' }}
          dateInnerStyle={{ background: '#76bb7f' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Arndt</h5>
          <h6 style={{ color: '#61b8ff' }}>Task8</h6>
          <p>
            Change Status to <i style={{color: 'red'}}>in process</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="009"
          dateText="01.01.19 10:30"
          style={{ color: '#e86971' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Timo</h5>
          <h6 style={{ color: '#61b8ff' }}>Task4</h6>
          <p>
            Change Status to <i style={{color: 'blue'}}>open</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="010"
          dateText="01.01.19 11:00"
          style={{ color: '#76bb7f' }}
          dateInnerStyle={{ background: '#76bb7f' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Arndt</h5>
          <h6 style={{ color: '#61b8ff' }}>Task8</h6>
          <p>
            Change Status to <i style={{color: 'red'}}>in process</i>
          </p>
        </TimelineItem>
        <TimelineItem
          key="011"
          dateText="01.01.19 10:30"
          style={{ color: '#e86971' }}
          bodyContainerStyle={bodyContainerStyle}>
          <h5>Timo</h5>
          <h6 style={{ color: '#61b8ff' }}>Task4</h6>
          <p>
            Change Status to <i style={{color: 'blue'}}>open</i>
          </p>
        </TimelineItem>
        
      </div>
    )
  }
}
