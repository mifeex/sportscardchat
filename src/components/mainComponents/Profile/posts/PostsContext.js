import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

import Posts from './posts'
import {params} from '../../../../api/getAPI';
import {getCategoryPost, getPage, setPopularPost} from '../../../../redux/profile-reducer';
import {setFetching} from '../../../../redux/categories-reducer';


import {withSuccessSearching} from '../../../HOC/withSuccessSearching'
import {withFetching} from '../../../HOC/withFetching'

class PostsConnect extends React.PureComponent{
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

	componentDidUpdate(prevProps) {
	// Популярный пример (не забудьте сравнить пропсы):
		if ((this.props.match.params.categoryId !== prevProps.match.params.categoryId) || (this.props.totalPostCount !== prevProps.totalPostCount)) {
			params.extraPath = this.props.match.params.categoryId

			this.props.setFetching(true);
			this.props.setPopularPost();
			this.props.getCategoryPost(params);
		}
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
		connect(mapStateToProps, {getCategoryPost, getPage, setPopularPost, setFetching}),
		withRouter,
		withSuccessSearching,
		withFetching
	)(PostsConnect)