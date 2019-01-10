import React, {Component} from 'react';
import Content from '../../components/content/Content';
import Grid from '@material-ui/core/Grid';
import './dashboard.css';
export default class Dashboard extends Component {

  render() {
    const request = {
      query: `
        query{
          login(email:"user4@test.com",password:"123") {token}
          }
      `
    };
    fetch('http://localhost:3000/graphql', {
      method: 'POST',
      body: JSON.stringify(request),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(data => {
      return data.json();
    }).then(res => {
      console.log(res);
    });
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