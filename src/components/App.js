import React from 'react';
import Main from './Main';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux'
// ТАБУ менять элемент по ссылке. Менять props. Заменять props в componentWillReceiveProps можно, т.к. это возможноти Реакта

class App extends React.Component {

	render() {
		return (
			<Router>
	  			<Provider store={this.props.store}>
					<div className="container">
						<Main store={this.props.store}/>
					</div>
	    </Provider>
    </ Router>
		)

	}

}

export default App