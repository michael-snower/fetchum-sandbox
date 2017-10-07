import React, { Component } from 'react';

class MenuItem extends Component {
	render() {
		let name = this.props.info.item_name;
		let button = '';
		if (this.props.editMenu) {
			button = 'Delete Item';
		}
		else {
			button = 'Add to Order';
		}
		return (
				<div className='item' style={{marginBottom: '10px'}}>
					<span className='item-name'>{name}</span>
					<span className='item-button' style={{marginLeft: '10px'}}>{button}</span>
				</div>
			);
	}
}

export default MenuItem;