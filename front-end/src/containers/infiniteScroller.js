import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loading';
import types from '../actions/types';
import connect from 'react-redux/es/connect/connect';

class Infinite_Scroller extends React.Component{
	constructor(props){
		super(props);
		this.totalItems = this.props.data.length;
		this.state = {
			items : [],
			hasMoreItems : true,
			items_rendered : 0,
		}
	}
	shouldComponentUpdate(nextProps, nextState, nextContext){
		if(this.totalItems < nextProps.data.length){
			this.totalItems = nextProps.data.length;
			return false;
		}
		else{
			return true;
		}
	}
	loadItems(){
		let {items, items_rendered} = this.state;
		debugger;
		if(items_rendered < this.props.data.length){
			items = items.concat(this.props.data.slice(items_rendered,items_rendered+this.props.items_to_render));
			items_rendered +=  this.props.items_to_render;
			this.setState({
				items : items,
				items_rendered : items_rendered
			});
			if((this.state.items.length - items_rendered) <= 0){
				this.upgrade = true;
				this.props.active === 'GITHUB'?
					this.props.nextGitData()
					:
					this.props.nextMediumData();
			}
		}
		else {
			this.setState({
				hasMoreItems : false
			})
		}
	}
	render(){
		return(
			<InfiniteScroll
				pageStart={0}
				loadMore={this.loadItems.bind(this)}
				hasMore={this.state.hasMoreItems}
				loader={<Loader type="bubbles" color="blue"/>}>
				{this.state.items}
			</InfiniteScroll>
		)
	}
}

const mapStateToProps = state => ({
	active: state.active,
	// data: (state.active === 'GITHUB')?state.gitData:state.mediumData,
});

const mapDispatchToProps = dispatch => ({
	nextGitData: () => dispatch({type: types.NEXT_GIT_DATA}),
	nextMediumData: () => dispatch({type: types.NEXT_MEDIUM_DATA}),
});

export default connect(mapStateToProps, mapDispatchToProps)(Infinite_Scroller);