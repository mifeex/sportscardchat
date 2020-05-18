import React from 'react';
import {connect} from 'react-redux';
import {getInfluencers} from '../../../../redux/categories-reducer';
import {compose} from 'redux';
import GetInfuencer from './GetInfuencer'

class CategoriesConnect extends React.Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getInfluencers()
	}

	render() {

		return (
			<GetInfuencer influencers={this.props.influencers} totalCount={this.props.totalCount} />
		)
	}
}

const mapStateToProps = state => {
	return {
		influencers: state.categories.influencers.result,
		totalCount: state.categories.influencers.totalCount,
	}
}

export default compose(
		connect(mapStateToProps, {getInfluencers}),
	)(CategoriesConnect)