import React from 'react';
import '../style/style.css';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

import {HeaderContext} from './mainComponents/Header/HeaderContext';
import CategoryContext from './mainComponents/Categories/CategoryContext';
import Profile from './mainComponents/Profile/Profile';
import CommentsContext from './mainComponents/Post/Comments/CommentsContext'
import AddCommentContext from './mainComponents/Post/Comments/AddCommentContext';
import NewPostContext from './mainComponents/NewPost/NewPostContext'
import LogPageContext from './mainComponents/LogPages/LogPageContext'
import RegPageContext from './mainComponents/LogPages/RegPageContext'
import LoginWithDiscord from './mainComponents/LogPages/withAPI/LoginWithDiscord'
import UserContext from './mainComponents/Users/UserContext'

import {isAuth} from '../redux/user-reducer';

const mapStateToProps = state => {
	return {
		isAuthValue: state.userdata.isAuth
	}
}

// умная компонента. Руководит всем процессом. Но права у нее ограничены и она только передает указания. Компонента-гонец
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
					<Route path='/post/:postId' render={() => <CommentsContext />} />
					<Route path='/category/:categoryId' render={() => <Profile />} />
					<Route path='/post/discussion' render={() => <AddCommentContext />} />
					<Route path='/post/new' render={() => <NewPostContext />} />
					<Route path='/login' render={() => <LogPageContext />} />
					<Route path='/register' render={() => <RegPageContext />} />
					<Route path='/use/discord' render={() => <LoginWithDiscord />} />
					<Route path="/user/:userId" render={() => <UserContext />} />
				</div>
			</div>
		);
	}
}

const Main = connect(mapStateToProps, {isAuth})(MainAppComponent)

export default Main