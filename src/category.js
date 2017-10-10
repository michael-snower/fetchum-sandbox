import React, { Component } from 'react';
import './category.css'

class Category extends Component {
	render() {
		let categoryInfo = this.props.info;
		let categoryColor = 'category-grey';
		if (this.props.categoryKey % 2 !== 0) {
			categoryColor = 'category-white';
		}
		return (
				<div 
					className={categoryColor}
					onClick={() => this.props.handleCategoryClick(categoryInfo)}>
					<div className='category-title'>
						{categoryInfo.category.category_name}
					</div>
					<div className='show-category'>
						Show {categoryInfo.category.category_name}
					</div>
				</div>
			)
	}
}

export default Category;