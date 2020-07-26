import React from 'react';
import '../style/style.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';
import {compose} from 'redux'

import {HeaderContext} from './mainComponents/Header/HeaderContext'; //main and common components
import SearchContext from './mainComponents/Search/SearchContext'
import ResetContext from './common/reset/ResetContext'

import Profile from './mainComponents/Profile/Profile'; //post compontents block
import NewPostContext from './mainComponents/NewPost/NewPostContext'

import UserContext from './mainComponents/Users/UserContext' //user component

import CategoryContext from './mainComponents/Categories/CategoryContext'; //category components block
import GetInfuencer from './mainComponents/Categories/SeparateCategory/GetInfuencerContext'

import LogPageContext from './mainComponents/LogPages/LogPageContext' //login components block
import RegPageContext from './mainComponents/LogPages/RegPageContext'
import LoginWithDiscord from './mainComponents/LogPages/withAPI/LoginWithDiscord'

import CommentsContext from './mainComponents/Post/Comments/CommentsContext' //comments components block
import AddCommentContext from './mainComponents/Post/Comments/AddCommentContext';
import ChatWithUsers from './mainComponents/Post/Comments/Comment/ChatWithUsers';

import {isAuth} from '../redux/user-reducer'; //HOC

const mapStateToProps = state => {
	return {
		isAuthValue: state.userdata.isAuth
	}
}

class MainAppComponent extends React.Component {

	componentDidMount() {
		this.props.isAuth()
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.isAuthValue !== prevProps.isAuthValue) {
			this.props.isAuth()
		}
	}

	render() {
		return (
			<div>
				<div className='app-wrapper'>
					<HeaderContext />
					<Route exact path='/' render={() => <CategoryContext />} />

					<Route path='/category/:categoryId' render={() => <Profile />} />
					<Route path='/Influencers' render={() => <GetInfuencer />} />

					<Route path='/post/:postId' render={() => <CommentsContext />} />
					<Route path='/post/discussion' render={() => <AddCommentContext />} />
					<Route path='/post/new' render={() => <NewPostContext />} />

					<Route path='/login' render={() => <LogPageContext />} />
					<Route path='/register' render={() => <RegPageContext />} />
					<Route path='/use/discord' render={() => <LoginWithDiscord />} />
					<Route path='/password/reset' render={() => <ResetContext />} />
					<Route path='/password/change/:code' render={() => <ResetContext />} />

					<Route path="/user/:userId" render={() => <UserContext />} />

					<Route path='/search' render={() => <SearchContext />} />
				</div>
			</div>
		);
	}
}

export default compose(
		connect(mapStateToProps, {isAuth}),
	)(MainAppComponent)