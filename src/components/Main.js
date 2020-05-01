import React from 'react';
import '../style/style.css';
import {Route} from 'react-router-dom';

import Header from './mainComponents/Header/Header';
import CategoryContext from './mainComponents/Categories/CategoryContext';
import Profile from './mainComponents/Profile/Profile';
import CommentsContext from './mainComponents/Post/PostItemContext'
import AddCommentContext from './mainComponents/Post/Comments/AddCommentContext';
// умная компонента. Руководит всем процессом. Но права у нее ограничены и она только передает указания. Компонента-гонец
const Main = (props) => {
  return (
	    <div>
		    <div className='app-wrapper'>
				<Header />
				<Route exact path='/' render={() => <CategoryContext />} />
				<Route path='/post/:postId' render={() => <CommentsContext />} />
				<Route path='/category/:categoryId' render={() => <Profile />} />
				<Route path='/post/discussion' render={() => <AddCommentContext />} />
		    </div>
		   </div>

    );
}

export default Main