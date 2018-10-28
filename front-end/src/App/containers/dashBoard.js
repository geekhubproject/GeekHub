import React, { Component } from 'react';
import Tabs from '../components/tabs.js';
import Grid from '@material-ui/core/Grid';
import Card from '../components/card.js';
import InfiniteScroller from '../components/Infinite-scroller'
import axios from 'axios';
import Loader from 'react-loading';
import { star } from 'react-icons-kit/oct/star';
import { repoForked } from 'react-icons-kit/oct/repoForked';
import { ic_check_circle } from 'react-icons-kit/md/ic_check_circle'
import { ic_schedule } from 'react-icons-kit/md/ic_schedule'
import Icon from 'react-icons-kit';


const gitHubStats = (props) => {
	return(
		<div>
			<span style={{marginRight:"24px"}}><Icon icon={star}/>{props.stars}</span>
			<span><Icon icon={repoForked}/>{props.forks}</span>
		</div>
	)
};


const mediumStats = (props) => {
	return(
		<div>
			<span style={{marginRight:"24px"}}><Icon icon={ic_check_circle}/>{props.claps}</span>
			<span><Icon icon={ic_schedule}/>{props.time}</span>
		</div>
	)
};

class DashBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded:false,
			active: "GitHub",
			items: []
		};
	}
	handleTabClick(active){
		debugger;
		if(active !== this.state.active){
			debugger;
			this.setState({
				active: 'MEDIUM',
				items: this.state.mediumItems
			});
		}
		console.log(this.state)
	};
	componentDidMount(){
		const urls = ['http://localhost:3000/github/top-stories/500',
			'http://localhost:3000/medium/top-stories/500'];
		const requests = urls.map(url => axios.get(url));
		Promise.all(requests)
			.then(responses => {
				let [gitItems, mediumItems] = responses;
				 gitItems = gitItems.data.docs.map(item =>
					<Grid item xs={12} style={{paddingBottom:10,width:"100%"}}>
						<Card
							title = {item.title}
							description = {item.description}
							link = {`https://github.com/${item.tags_url.split('/').slice(4, -1).join('/')}`}
							stats = <gitHubStats stars={item.stars} forks={item.forks}/>
						/>
					</Grid>
				 );
				mediumItems = mediumItems.data.docs.map(item =>
					<Grid item xs={12} style={{paddingBottom:10,width:"100%"}}>
						<Card
							title = {item.title}
							description = {item.subtitle}
							stats = <mediumStats claps={item.totalClapCount.toLocaleString()}
										time={Math.round(item.readingTime)}/>
						/>
					</Grid>
				);
				this.setState({
					gitItems,
					mediumItems,
					items:gitItems,
					loaded:true
				})
			})
			.catch(error => console.log(error));
	}
	render() {
    return (
      <div className="DashBoard">
        <Grid container style={{
          margin: 0,
          width: '100%',
          padding:20
        }}>
          <Grid item xs={12} style={{paddingBottom:10}}>
            <Tabs clickHandler = {this.handleTabClick.bind(this)}/>
          </Grid>
			{
				this.state.loaded?
					<InfiniteScroller
						data = {this.state.items}
						items_to_render = {5}
					/>
					:
					<Loader type="bubbles" color="blue"/>
			}
        </Grid>
      </div>
    );
  }
}



export default DashBoard;
