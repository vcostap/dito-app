import React, {Component} from 'react';
import TimelineBox from './timelineBox';
import axios from 'axios';

export default class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			compraFinal: [],
			produtosComprados: []
		}
	}

	componentDidMount() {
		axios.get('https://storage.googleapis.com/dito-questions/events.json')
		.then(response => {
			let compraFinal_Array = response.data.events.filter( purchase => purchase.event === 'comprou');
			let produtosComprados_Array = response.data.events.filter( product => product.event === 'comprou-produto');
			this.setState({
				compraFinal: compraFinal_Array,
				produtosComprados: produtosComprados_Array
			});
		})
		.catch(console.log);
	}

	render() {
		return (
			<TimelineBox finalPurchases={this.state.compraFinal} productsPurchases={this.state.produtosComprados} />
		);
	}
}