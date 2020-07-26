import React from 'react';
import {connect} from 'react-redux';
import {getInfluencers, setFetching} from '../../../../redux/categories-reducer';
import {setPopularPost} from '../../../../redux/profile-reducer';
import {compose} from 'redux';
import GetInfuencer from './GetInfuencer'
import {withFetching} from '../../../HOC/withFetching'

class CategoriesConnect extends React.PureComponent {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.getInfluencers()
		this.props.setPopularPost()
	}

	render() {

		return (
			<GetInfuencer influencers={this.props.influencers} totalCount={this.props.totalCount} />
		)
	}
}

const mapStateToProps = state => {
	return {
		influencers: state.categories.influencers,
		totalCount: state.categories.influencers,
	}
}

export default compose(
		connect(mapStateToProps, {getInfluencers, setFetching, setPopularPost}),
		withFetching,
	)(CategoriesConnect)