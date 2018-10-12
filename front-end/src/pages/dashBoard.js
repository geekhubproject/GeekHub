import React, { Component } from 'react';
import Tabs from '../common/components/tabs.js';
import AppBar from '../common/components/appBar.js';
import Grid from '@material-ui/core/Grid';
import Card from '../common/components/card.js';

class DashBoard extends Component {
  render() {
    return (
      <div className="DashBoard">
        <AppBar />
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
