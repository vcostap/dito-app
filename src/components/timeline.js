import React, {Component} from 'react';
import TimelineBox from './timelineBox';
import axios from 'axios';
import './timeline.css';

export default class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			finalPurchases: [],
			productsPurchases: []
		}
	}

	componentDidMount() {
		axios.get('https://storage.googleapis.com/dito-questions/events.json')
		.then(response => {
			let finalPurchasesArray = response.data.events.filter( purchase => purchase.event === 'comprou');
			let productsPurchasesArray = response.data.events.filter( product => product.event === 'comprou-produto');
			this.setState({
				finalPurchases: finalPurchasesArray,
				productsPurchases: productsPurchasesArray,
				isLoading: false
			});
		})
		.catch(console.log);
	}

	separatePurchases() {
	}

	render() {
		if(!this.state.isLoading){
			return (
				<div class="purchase-timeline">
					<TimelineBox finalPurchases={this.state.finalPurchases} productsPurchases={this.state.productsPurchases} />
				</div>
			);
		}
		else {
			return (
				<div>Carregando...</div>
			)
		}
	}
}