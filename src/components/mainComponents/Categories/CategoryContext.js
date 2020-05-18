import React from 'react';
import {connect} from 'react-redux';
import Categories from './Categories'
import {getCategories, getInfluencers} from '../../../redux/categories-reducer';
import {setPopularPost} from '../../../redux/profile-reducer';
import {compose} from 'redux'
import {withSuccessSearching} from '../../HOC/withSuccessSearching'

class CategoriesConnect extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getCategories()
		this.props.setPopularPost()
		this.props.getInfluencers()
	}

	render() {
		return (
			<Categories categories={this.props.categories} influencers={this.props.influencers} totalCount={this.props.totalCount} />
		)
	}
}

const mapStateToProps = state => {
	return {
		categories: state.categories.categories,
		influencers: state.categories.influencers.result,
		totalCount: state.categories.influencers.totalCount,
	}
}

export default compose(
		connect(mapStateToProps, {getCategories, setPopularPost, getInfluencers}),
		withSuccessSearching,
	)(CategoriesConnect)