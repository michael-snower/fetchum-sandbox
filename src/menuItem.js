import React, { Component } from 'react';
import './menuItem.css';
import * as MenuAPI from './menuAPI.js';

class MenuItem extends Component {
	state = {
		popup: false,
		popupContent: '',
		quantity: false,
	}
	handleButtonClick = () => {
		if (this.props.editMenu){
			this.setState({
				popup: true,
				popupContent: 'Would you like to make this item unavailable? You can make it available again at any time you wish.',
				quantity: false,
			})
		}
		else {
			this.setState({
				popup: true,
				popupContent: 'How many of this menu item would you like to add to the order?',
				quantity: true,
			})
		}
	}
	handlePopUpCancelClick = () => {
		this.setState({
			popup: false,
		})
	}
	handlePopUpConfirmClick = (itemInfo) => {
		if (this.props.editMenu) {
			this.setState({
				popup: false,
			})
			// Fetch with vendor_id, menu_id, available: yes/no
			// use menu object to set state 
			console.log(itemInfo.menuitem_id);
			let aPIInfo = {
					'vendor_id': this.props.vendor_id,
					'menuitem_id': itemInfo.menuitem_id,
					'is_available': itemInfo.is_available,
				}
			MenuAPI.itemAvailability(aPIInfo).then( (response) =>
				console.log(response));
		}
		else {
		}
	}
	render() {
		let info = this.props.info;
		let name = this.props.info.item_name;
		let price = this.props.info.item_price;
		let availability = this.props.info.is_available;
		let buttonTitle = '';
		let buttonClass = '';
		if (this.props.editMenu) {
			if (availability === 'Yes') {
				buttonTitle = 'Make Unavailable';
				buttonClass = 'unavailable-button';
			}
			else {
				buttonTitle = 'Make Available';
				buttonClass = 'available-button';
			}
		}
		else {
			buttonTitle = 'Add to Order';
		}
		// Changes item visibility if item is not available
		let itemVisibility = 'visible';
		if (availability === 'No') {
			itemVisibility = 'fade'
		}
		let itemBackgroundColor = 'item-grey';
		if (this.props.itemKey %2 !== 0) {
			itemBackgroundColor = 'item-white';
		}
		return (
				<div className={itemBackgroundColor}>
					<span className={itemVisibility}>{name}</span>
					<span className={itemVisibility} style={{marginLeft: '10px', color: 'grey'}}>${price}</span>
					<span 
						className={buttonClass} 
						onClick={() => this.handleButtonClick()}
						>
						{buttonTitle}
					</span>
					{this.state.popup && 
						<div className='popup'>
							<div className='popup-content'>{this.state.popupContent}</div>
							{this.state.quantity && 
								<input
									value='1'
									style={{width: '5px'}}
									>
								</input>
							}
							<div className='cancel-button' onClick={() => this.handlePopUpCancelClick()}>Cancel</div>
							<div className='confirm-button' onClick={() => this.handlePopUpConfirmClick(info)}>Confirm</div>
						</div>
					}
				</div>
			);
	}
}

export default MenuItem;