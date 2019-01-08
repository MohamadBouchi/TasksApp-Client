import React from 'react';
import SideBar from './SideBar';
import Content from './Content';
import Footer from './Footer';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import './layout.css';

export default function Dashboard() {
  return (
    <main id='main'>
      <Grid container spacing={0}>
        <Hidden mdDown>
          <Grid item lg={2} className='sideBar-container'><SideBar/></Grid>
        </Hidden>
        <Grid item lg={10} sm={12} xs={12} className='container'><Content/></Grid>
      </Grid>
      <Footer />
    </main>
  )
}
