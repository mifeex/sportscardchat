import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux'
import {withAuthParams} from '../../HOC/withAuthParams';
import User from './User'
import {getAll} from '../../../redux/user-reducer';
import {Redirect} from 'react-router-dom';
import {withRouter} from 'react-router-dom'

const mapStateToProps = state => {
	return {
		userData: state.userdata.userData,
		userPost: state.userdata.userPost
	}
}

class UserContext extends React.Component {

	componentDidMount() {
		this.props.getAll(this.props.match.params.userId);
	}

	render() {
		return (
			<div id="wrap-head">
				<User userPost={this.props.userPost} userData={this.props.userData}/>
			</div>
		)
	}
}///

export default compose(
		connect(mapStateToProps, {getAll}),
		// withAuthParams,
		withRouter
	)(UserContext)