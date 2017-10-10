import React, { Component } from 'react';
import Category from './category'
import MenuItem from './menuItem';
import './menu.css';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

class Menu extends Component {
    state = {
        clickedCategory: '',
        query: '',
        additionalUnavailableItems: [],
        viewUnavailableItems: false,
    }
    handleEditMenuClick = () => {
        this.setState({
            clickedCategory: '',
            query: '',
            viewUnavailableItems: false,
        });
    }
    handleViewUnavailableClick = () => {
        this.setState({
            clickedCategory: '',
            query: '',
            viewUnavailableItems: true,
        });
    }
    // Displays items in clicked category
    handleCategoryClick = (category) => {
        this.setState({
            clickedCategory: category.category.category_name,
            query: '',
        });
    }
    // Returns to list of all categories from search results/category items
    handleBackClick = () => {
        this.setState({
            clickedCategory: '',
            query: '',
        });
    }
    // Updates state.query based on user input
    updateQuery = (query) => {
        this.setState({ 
            query: query.trim(),
            clickedCategory: '',
        });
    }
    handleAvailableClick = (item) => {
        for (let category of this.props.menu) {
            for (let category_item of category.items) {
                if (item.menuitem_id === category_item.menuitem_id) {
                    let additionalUnavailableItems = this.state.additionalUnavailableItems;
                    if (category_item.is_available === 'Yes') {
                        additionalUnavailableItems.push(item);
                    }
                    if (category_item.is_available === 'No') {
                    }
                }
            }
        }
        console.log(this.state.additionalUnavailableItems);
    }
	render() {
        // Styles tabs based on which one is clicked
        let menuTabVisibility = 'highlight-tab';
        let unavailableTabVisibility = 'fade-tab';
        if (this.state.viewUnavailableItems) {
            menuTabVisibility = 'fade-tab';
            unavailableTabVisibility = 'highlight-tab';
        }
        let menu = this.props.menu;
        let selectedCategories = [];
        let headerTitle = 'Menu Categories';
        let selectedItems = [];
        let backButtonText = '';
        let backButtonVisibility = 'hide';
        // When category is clicked, updates page title and item list
        if (this.state.clickedCategory) {
            headerTitle = this.state.clickedCategory;
            backButtonText = 'Show All Categories';
            backButtonVisibility = 'back-button';
            let selectedCategory = [];
            let match = new RegExp(escapeRegExp(this.state.clickedCategory), 'i');
            selectedCategory = menu.filter(category => match.test(category.category.category_name));
            for (let item of selectedCategory[0]['items']) {
                selectedItems.push(item);
            }
        }
        // When search query is updated, displays matching items
        if (this.state.query) {
            headerTitle = 'Menu items matching your search';
            backButtonText = 'Clear Search';
            backButtonVisibility = 'back-button';
            let filteredArray = [];
            let filteredArrays = [];
            let match = new RegExp(escapeRegExp(this.state.query), 'i');
            for (let category of menu) {
                let items = category['items'];
                filteredArray = items.filter((item) => match.test(item.item_name));
                for (let matchingItem of filteredArray) {
                    selectedItems.push(matchingItem);
                }
            }
        }
        // Creates array with all items marked unavailable on the menu from the AJAX request
        let unavailableItems = [];
        for (let category of menu) {
            if (category.category.category_name === 'Soups') {
            }
            for (let item of category['items']) {
                if (item.is_available === 'No') {
                    unavailableItems.push(item);
                }
            } 
        }
        // Update unavailable item list with items that have been made unavailable after the
        // last page refresh; also updates their available flags on the menu
        for (let a_item of this.state.additionalUnavailableItems) {
        }  
        // Alphabetically sort items
        selectedItems.sort(sortBy('item_name'));
        // Displays category list if no category has been selected
        if (!this.state.clickedCategory && !this.state.query) {
            selectedCategories = menu;
        }
		return (
				<div className='menu'>
                    {this.props.editMenu && 
                        <div className='tab-bar'>
                            <div 
                                className={menuTabVisibility}
                                onClick={() => this.handleEditMenuClick()}>
                                Edit Menu
                            </div>
                            <div 
                                className={unavailableTabVisibility}
                                onClick={() => this.handleViewUnavailableClick()}>
                                View Unavailable Items
                            </div>
                        </div>
                    }
                    {!this.state.viewUnavailableItems && 
                        <div className='menu-interface'>
                            <div className='search-box'>
                                <input
                                    type='text' 
                                    placeholder='Start typing to search for a menu item...' 
                                    value = {this.state.query}
                                    onChange={(event) => this.updateQuery(event.target.value)}
                                    className='search-input'>
                                </input>
                            </div>
                            <div className='menu-navbar'>
                                <div className='menu-header'>{headerTitle}</div>
                                <div 
                                    className={backButtonVisibility} 
                                    onClick={() => this.handleBackClick()} 
                                    >{backButtonText}
                                </div>
                            </div>
                                <ul className='selected-items'>
                                    {selectedItems.map( (item, index) => (
                                        <MenuItem 
                                            key={index}
                                            itemKey={index}
                                            info={item}
                                            editMenu={this.props.editMenu}
                                            handleAvailableClick={() => this.handleAvailableClick(item)}
                                            vendor_id={'rg7SuZjxSSSrv6erWCLgxOSWSKw2'}
                                        />
                                    )
                                )}
                            </ul>
                            <ul className='categories'>
                                {selectedCategories.map( (category, index) => (
                                        <Category
                                            key={index}
                                            categoryKey={index} 
                                            className='category'
                                            handleCategoryClick={() => this.handleCategoryClick(category)}
                                            info={category}
                                        />
                                    )
                                )}
                            </ul>
                        </div>
                    }
                    {this.props.editMenu && this.state.viewUnavailableItems && 
                        <ul className='unavailable-items'>
                            {unavailableItems.map( (item, index) => (
                                <MenuItem 
                                    key={index}
                                    itemKey={index}
                                    info={item}
                                    editMenu={this.props.editMenu}
                                    handleAvailableClick={() => this.handleAvailableClick(item)}
                                    vendor_id={'rg7SuZjxSSSrv6erWCLgxOSWSKw2'}
                                />
                            )
                        )}
                        </ul>
                    }
				</div>
			)
	}
}

export default Menu;