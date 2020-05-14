import React from 'react';
import {Link} from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import {required} from '../../../../../../utils/validation/validation';
//тупая компанента.
const loginSidebar = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field validate={[required]}
					component="input"
					name="email"
					id="username"
					className="inputbox"
					placeholder={"Email"}
			/>
			<Field validate={[required]} 
					component="input"
					name="password"
					type="password"
					id="password"
					className="inputbox"
					placeholder="Password"
			/>
				<br />
			<label htmlFor="autologin" id="remember-me">
				<Field component="input" name="isStay" type="checkbox" id="autologin" />
				Remember me
			</label>
			<br />
			<button className="button1">Submit</button>
		</form>
	)
}

const LoginReduxSidebar = reduxForm({form: 'login-sidebar'})(loginSidebar)

const Sidebar = (props) => {
	const checkUser = (e) => {
		props.checkUser(e)
	}

    return (
		<div className="side-block side-login">
			<h4 className="side-block-head">
				<Link to="/login">Login</Link>
			</h4>
			<div className="side-block-body">
				<fieldset>
					<LoginReduxSidebar onSubmit={checkUser} />
				</fieldset>
			</div>
		</div>
  )
}

export default Sidebar;