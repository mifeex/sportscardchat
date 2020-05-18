import React from 'react';
import {connect} from 'react-redux';
import Comments from './Comments';
import {compose} from 'redux'
import {getComments} from '../../../../redux/comment-reducer';
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom';
import {withSuccessSearching} from '../../../HOC/withSuccessSearching'

const mapStateToProps = state => {
	return {
		comments: state.comments.commentsData,
		post: state.comments.postData,
	}
}

class CommentsContent extends React.Component{

	componentDidMount() {
		this.props.getComments(this.props.match.params.postId)
	}

	render() {
		return (
			<div>
				<Link to="/">&#8592; back to main page</Link>
				<div>{this.props.post.map((e, key) => <Comments element={e} key={key}/>)}</div>
				<div>{this.props.comments.map((e, key) => <Comments element={e}
						inReply={true}
				 		key={key}
				 		imageInPostId={this.props.match.params.postId} 
				 		/>
				 	)}</div>
			</div>
		)
	}///
}

export default compose(
		connect(mapStateToProps, {getComments}),
		withRouter,
		withSuccessSearching,
	)(CommentsContent)