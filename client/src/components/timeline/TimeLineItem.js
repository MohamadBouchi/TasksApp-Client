import React, { Component } from 'react';
import { TimelineItem }  from 'vertical-timeline-component-for-react';
import './timeline.css';
import { connect } from 'react-redux';
import { getActivity } from '../../store/actions/ActivityActions';

const bodyContainerStyle = {
            background: 'bisque',
            margin: '0 10px 0 15px',
            padding: '5px',
            borderRadius: '8px',
            boxShadow: '0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)'}

const activtyDate = new Date().getFullYear() + ("0" + new Date().getMonth()+1).slice(-2);
class TimeLineItem extends Component {
  
  componentDidMount(){
    this.props.getActivity(activtyDate)
  }
  render() {
    if(this.props.activities.activities.length !== 0)
    return (
      <div>
        {
          this.props.activities.activities.reverse().map( activity => {
            const  changeDate = new Date(activity.changeDate);
            if(activity.status === 'open')
              {  
                return(
                  <TimelineItem
                  key={activity._id}
                  dateText={changeDate.getFullYear().toString().substr(-2)+'.'+changeDate.getMonth()+1+'.'+changeDate.getDate()+'-'+changeDate.getHours()+':'+changeDate.getMinutes()}
                  style={{ color: '#61b8ff' }}
                  dateInnerStyle={{ background: '#61b8ff', color: '#000' }}
                  bodyContainerStyle={bodyContainerStyle}>
                  <h5>{activity.userName}</h5>
                  <h6 style={{ color: '#61b8ff' }}>{activity.taskTitle}</h6>
                  <p>
                    Change Status to <i style={{color: 'blue'}}>{activity.status}</i>
                  </p>
                </TimelineItem>
                );
              } else if(activity.status === 'inProcess') {
                return(
                  <TimelineItem
                  key={activity._id}
                  dateText={changeDate.getFullYear().toString().substr(-2)+'.'+changeDate.getMonth()+1+'.'+changeDate.getDate()+'-'+changeDate.getHours()+':'+changeDate.getMinutes()}
                  style={{ color: '#e86971' }}
                  dateInnerStyle={{ background: '#e86971', color: '#000' }}
                  bodyContainerStyle={bodyContainerStyle}>
                  <h5>{activity.userName}</h5>
                  <h6 style={{ color: '#61b8ff' }}>{activity.taskTitle}</h6>
                  <p>
                    Change Status to <i style={{color: 'red'}}>{activity.status}</i>
                  </p>
                </TimelineItem>
                );
              }
              else if(activity.status === 'finished') {
                return(
                  <TimelineItem
                  key={activity._id}
                  dateText={changeDate.getFullYear().toString().substr(-2)+'.'+changeDate.getMonth()+1+'.'+changeDate.getDate()+'-'+changeDate.getHours()+':'+changeDate.getMinutes()}
                  style={{ color: '#76bb7f' }}
                  dateInnerStyle={{ background: '#76bb7f', color: '#000' }}
                  bodyContainerStyle={bodyContainerStyle}>
                  <h5>{activity.userName}</h5>
                  <h6 style={{ color: '#61b8ff' }}>{activity.taskTitle}</h6>
                  <p>
                    Change Status to <i style={{color: 'green'}}>{activity.status}</i>
                  </p>
                </TimelineItem>
                );
              }
              else {
                return(
                  <TimelineItem
                  key={activity._id}
                  dateText={changeDate.getFullYear().toString().substr(-2)+'.'+changeDate.getMonth()+1+'.'+changeDate.getDate()+'-'+changeDate.getHours()+':'+changeDate.getMinutes()}
                  style={{ color: '#ffe0b2' }}
                  dateInnerStyle={{ background: '#ffe0b2', color: '#000' }}
                  bodyContainerStyle={bodyContainerStyle}>
                  <h5>{activity.userName}</h5>
                  <h6 style={{ color: '#61b8ff' }}>{activity.taskTitle}</h6>
                  <p>
                    Change Status to <i style={{color: 'orange'}}>{activity.status}</i>
                  </p>
                </TimelineItem>
                );
              }
          })
        }
      </div>
    ); else return (<h6>No activities</h6>)
  }
}

const mapStateToProps = (state) =>{
  return {
    activities: state.activities
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    getActivity: (date) => dispatch(getActivity(date))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TimeLineItem);