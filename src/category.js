import React, { Component } from 'react';
import './category.css'

class Category extends Component {
	render() {
		let categoryInfo = this.props.info;
		return (
				<div 
					className='category-box'
					onClick={() => this.props.handleCategoryClick(categoryInfo)}>
						<div className='category-title'>
							Show {categoryInfo.category.category_name}
						</div>
				</div>
			)
	}
}

export default Category;