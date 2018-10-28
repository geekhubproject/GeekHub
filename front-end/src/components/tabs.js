import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { github , stackOverflow , medium } from 'react-icons-kit/fa/';
import Icon from 'react-icons-kit';

//Icon Label Tabs Component
class IconLabelTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <Paper square className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="secondary"
          textColor="secondary"
        >
          <Tab icon={<Icon icon={github}/>} label="GitHub" />
          <Tab icon={<Icon icon={stackOverflow}/>} label="Stack Overflow" />
          <Tab icon={<Icon icon={medium}/>} label="Medium" />
        </Tabs>
      </Paper>
    );
  }
}

const styles = {
  root: {
    flexGrow: 1,
  },
};

IconLabelTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconLabelTabs);
