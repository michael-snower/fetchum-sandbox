import React, { Component } from 'react';
import MenuItem from './menuItem';
import './menu.css';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Menu extends Component {
    state = {
        clickedCategory: '',
        query: '',
    }
    handleCategoryClick = (category) => {
        this.setState({
            clickedCategory: category.category.category_name,
        })
    }
    handleBackClick = () => {
        this.setState({
            clickedCategory: '',
            query: '',
        })
    }
    updateQuery = (query) => {
        this.setState({ 
            query: query.trim(),
            clickedCategory: '',
        })
    }
	render() {
        let menu = this.props.menu;
        let selectedCategories = [];
        let headerTitle = 'Menu Categories';
        let selectedItems = [];
        let backButton = '';
        // When category is clicked, updates page title and item list
        if (this.state.clickedCategory) {
            headerTitle = this.state.clickedCategory;
            backButton = 'Show Categories';
            let selectedCategory = [];
            let match = new RegExp(escapeRegExp(this.state.clickedCategory), 'i');
            selectedCategory = menu.filter(category => match.test(category.category.category_name));
            for (let item of selectedCategory[0]['items']) {
                selectedItems.push(item);
            }
        }
        if (this.state.query) {
            headerTitle = 'Matching Menu Items';
            backButton = 'Show Categories';
            let filteredArray = [];
            let filteredArrays = [];
            let match = new RegExp(escapeRegExp(this.state.query), 'i');
            for (let category of menu) {
                let items = category['items'];
                filteredArray = items.filter((item) => match.test(item.item_name));
                filteredArrays.push(filteredArray);
            }
            // Push items into one array
            for (let array of filteredArrays) {
                for (let item of array) {
                    selectedItems.push(item);
                }
            }
        }
        // Alphabetically sort items
        selectedItems.sort(sortBy('item_name'));
        // Displays category list if no category has been selected
        if (!this.state.clickedCategory && !this.state.query) {
            selectedCategories = menu;
        }
		return (
				<div className='menu'>
					<div className='navbar'>
						<span 
                            className='back-button' 
                            onClick={() => this.handleBackClick()} 
                            style={{marginRight: '20px'}}>{backButton}
                        </span>
						<span className='logo' style={{marginRight: '20px', fontSize: '30px'}}>{headerTitle}</span>
						<span className='done-editing'>Return to Feed</span>
					</div>
					<div className='search-box'>
						<input
                            type='text' 
                            placeholder='Search for a menu item' 
                            value = {this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            className='search-input'
                            style={{marginTop: '20px', height: '20px'}}>
                        </input>
					</div>
                    <ul className='categories' style={{marginBottom: '10px', fontSize: '20px'}}>
                        {selectedCategories.map( (category, index) => (
                                <li 
                                    key={index} 
                                    className='category-name' 
                                    onClick={() => this.handleCategoryClick(category)}
                                    >
                                    {category.category.category_name}
                                </li>
                            )
                        )}
                    </ul>
                    <ul className='selected-items'>
                            {selectedItems.map( (item, index) => (
                                <MenuItem 
                                    key={index}
                                    info={item}
                                    editMenu={true}
                                />
                            )
                        )}
                    </ul>
				</div>
			)
	}
}

export default Menu;