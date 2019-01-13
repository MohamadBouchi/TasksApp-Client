import React, {Component} from 'react';
import Content from '../../components/content/Content';
import Grid from '@material-ui/core/Grid';
import './dashboard.css';
export default class Dashboard extends Component {

  render() {
    return (
      <main id='main'>
        <Grid container spacing={0}>
          <Grid item lg={12} sm={12} xs={12} className='container'>
              <Content/>
          </Grid>
        </Grid>
      </main>
    )
  }
}