import React from 'react';
import {connect} from 'react-redux';
import Categories from './Categories'
import {getCategories} from '../../../redux/categories-reducer';
import {compose} from 'redux'

class CategoriesConnect extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getCategories()
	}

	// componentDidUpdate(prevProps, prevState) {
	// 	if (prevProps.categories !== this.props.categories) {
	// 		this.props.getCategories()
	// 	}
	// }

	render() {
		return ( 
			<Categories categories={this.props.categories} />
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories.categories
	}
}

export default compose(
		connect(mapStateToProps, {getCategories}),
	)(CategoriesConnect)