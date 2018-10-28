import React, { Component } from 'react';
import Tabs from '../components/tabs.js';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card.js';

import { connect } from 'react-redux';

class DashBoard extends Component {
  componentDidMount(){
    this.props.onRequestData();
  }
  render() {
    debugger;
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

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    data: state.data,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestData: () => dispatch({ type: 'API_CALL_REQUEST' })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
