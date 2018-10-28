import React from 'react'
import InfiniteScroll from 'react-infinite-scroller';
import Loader from 'react-loading';

export default class Infinite_Scroller extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			items : [],
			hasMoreItems : true,
			items_rendered : 0,
		}
	}
	loadItems(){
		let {items, items_rendered} = this.state;
		if(items_rendered < this.props.data.length){
			items = items.concat(this.props.data.slice(items_rendered,items_rendered+this.props.items_to_render));
			items_rendered +=  this.props.items_to_render;
			this.setState({
				items : items,
				items_rendered : items_rendered
			})
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