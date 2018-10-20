import React, { Component } from 'react';
import Tabs from '../components/tabs.js';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card.js';

class DashBoard extends Component {
  render() {
    return (
      <div className="DashBoard">
        <Grid container style={{
          margin: 0,
          width: '100%',
          padding:20
        }}>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Tabs />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Card />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Card />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Card />
          </Grid>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Card />
          </Grid>
        </Grid>
      </div>
    );
  }
}



export default DashBoard;
