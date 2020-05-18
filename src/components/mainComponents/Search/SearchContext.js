import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withRouter} from 'react-router-dom'
import PostBody from '../../common/AllPost/PostBody';

const mapStateToProps = state => {
	return {
		search: state.search.value,
	}
}

class SearchContext extends React.Component{

	render() {
		return (
			<PostBody elements={this.props.search} hasPost={false} />
		)
	}
}

export default compose(
		connect(mapStateToProps, {}),
		withRouter,
	)(SearchContext)