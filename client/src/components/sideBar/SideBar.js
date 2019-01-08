import React from 'react';
import { Timeline }  from 'vertical-timeline-component-for-react';
import TimeLineItem from '../timeline/TimeLineItem';
import './sideBar.css';

export default function SideBar() {
  return (
    <aside id='sideBar'>
      <Timeline lineColor={'#ddd'}>
        <TimeLineItem></TimeLineItem>
      </Timeline>
    </aside>
  )
}
