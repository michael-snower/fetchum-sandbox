import React, { Component } from 'react';

class Category extends Component {
	render() {
		let categoryInfo = this.props.info;
		return (
				<div className='category-title' onClick={() => this.props.handleCategoryClick(categoryInfo)}>
					{categoryInfo.category.category_name}
				</div>
			)
	}
}

export default Category;