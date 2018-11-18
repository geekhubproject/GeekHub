import React, { Component } from 'react';
import { connect } from "react-redux";
import Tabs from '../containers/Tabs.js';
import Grid from '@material-ui/core/Grid';
import Card from '../containers/Card.js';
import InfiniteScroller from '../containers/InfiniteScroller'
import Loader from 'react-loading';
import { star } from 'react-icons-kit/oct/star';
import { repoForked } from 'react-icons-kit/oct/repoForked';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'
import { ic_schedule } from 'react-icons-kit/md/ic_schedule'
import Icon from 'react-icons-kit';
import types from '../actions/types'
import { Button } from '../common';
import LoginForm from './LoginForm';

const GitHubStats = (props) => (
		<div>
			<span style={{marginRight:"24px"}}><Icon icon={star}/>{props.stars}</span>
			<span><Icon icon={repoForked}/>{props.forks}</span>
		</div>
);


const MediumStats = (props) => {
	return(
		<div>
			<span style={{marginRight:"24px"}}><Icon icon={ic_check_circle}/>{props.claps}</span>
			<span><Icon icon={ic_schedule}/>{props.time}</span>
		</div>
	)
};

const gitHubItems =  gitItems => gitItems.map(item =>
	<Grid item xs={12} style={{paddingBottom:10,width:"100%"}}>
		<Card
			title = {item.title}
			description = {item.description}
			link = {`https://github.com/${item.tags_url.split('/').slice(4, -1).join('/')}`}
			stats = <GitHubStats stars={item.stars} forks={item.forks}/>
		/>
	</Grid>
);

const mediumItems = mediumItems => mediumItems.map(item =>{
	console.log(item);
	return <Grid item xs={12} style={{paddingBottom:10,width:"100%"}}>
		<Card
			title = {item.title}
			description = {item.subtitle}
			stats = <MediumStats claps={item.totalClapCount.toLocaleString()}
			time={Math.round(item.readingTime)}/>
		/>
	</Grid>
});

class DashBoard extends Component {
	componentDidMount(){
    this.props.fetchGitData();
		this.props.fetchMediumData();
	}
	render() {
		console.log(this.props)
		let renderData;
		if(this.props.active === 'MEDIUM' && this.props.mediumData){
			renderData = this.props.mediumLoaded?mediumItems(this.props.mediumData):null;
		}
		else if(this.props.active === 'GITHUB' && this.props.gitData) {
			renderData = this.props.gitLoaded ? gitHubItems(this.props.gitData) : null;
		}
		return (
			<div className="DashBoard">
				<Grid container alignItems="flex-end" direction="row-reverse"
					style={{
						margin: 0,
						width: '100%',
						padding:20
				}}>
					<Button text="Login" />
					<Button text="Sign Up" />
				</Grid>
				<LoginForm />
				<Grid container style={{
					margin: 0,
					width: '100%',
					padding:20
				}}>
					<Grid item xs={12} style={{paddingBottom:10}}>
						<Tabs/>
					</Grid>
					{
							renderData?
							<div style={{width:"100%"}}>
								<InfiniteScroller
									data = {renderData}
									items_to_render = {40}
								/>
							</div>
							:
							<Loader type="bubbles" color="blue"/>
					}
				</Grid>
			</div>
		);
	}
}


const mapStateToProps = state => ({
		fetching: state.gitReducer.fetching,
		gitData: state.gitReducer.gitData,
		gitError: state.gitReducer.gitError,
		mediumData: state.mediumReducer.mediumData,
		mediumError: state.mediumReducer.mediumError,
		gitLoaded: state.gitReducer.gitLoaded,
		mediumLoaded: state.mediumReducer.mediumLoaded,
		active: state.utilReducer.active,
		gitRecord: state.gitReducer.gitRecord,
		mediumRecord: state.mediumReducer.mediumRecord,
});

const mapDispatchToProps = dispatch => ({
		fetchGitData: () => dispatch({type: types.GIT_REQUEST}),
		fetchMediumData: () => dispatch({type: types.MEDIUM_REQUEST}),
});

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
