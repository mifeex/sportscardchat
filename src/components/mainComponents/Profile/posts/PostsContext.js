import React from 'react';
import {connect} from 'react-redux';
import Posts from './posts'
import {params} from '../../../../api/getAPI';
import {withRouter} from 'react-router-dom'
import {getCategoryPost, getPage, setPopularPost} from '../../../../redux/profile-reducer';
import {compose} from 'redux';
import {withSuccessSearching} from '../../../HOC/withSuccessSearching'

class PostsConnect extends React.Component{
	constructor(props) {
		super(props)

		params.extraPath = this.props.match.params.categoryId
		params.limit = this.props.limit
	}

	pageChange = (el) => {
		this.props.getPage(el)

		params.page = el

		this.props.getCategoryPost(params)
	}

	componentDidMount() {
		params.page = this.props.page;

		this.props.setPopularPost();
		this.props.getCategoryPost(params);
	}

	render() {
		return(
			<Posts
				limit={this.props.limit} 
				totalPostCount={this.props.totalPostCount}
				page={this.props.page}
				post={this.props.post}
				pageChange={this.pageChange}
				file={this.props.file}
				category={this.props.match.params.categoryId}
			/>
		)
	}
}

const mapStateToProps = state => {
	return {
		post: state.posts.post,
		page: state.posts.page,
		limit: state.posts.limit,
		totalPostCount: state.posts.totalPostCount,
		file: state.posts.file,
	}
}

export default compose(
		connect(mapStateToProps, {getCategoryPost, getPage, setPopularPost}),
		withRouter,
		withSuccessSearching,
	)(PostsConnect)