import React from 'react';
import {Link} from 'react-router-dom';
//тупая компанента.
const Sidebar = (props) => {

	const userName = (e) => {
		props.userName(e.target.value)
	}

	const userPass = (e) => {
		props.userPass(e.target.value)		
	}

	const userStay = (e) => {
		props.userStay(e.target.checked)
	}

	const checkUser = () => {
		props.checkUser()
	}

    return (
		<div className="side-block side-login">
			<h4 className="side-block-head">
				<Link to="">Login</Link>
			</h4>
			<div className="side-block-body">
				<fieldset>
					<input onChange={userName} value={props.user.email} type="text" id="username" className="inputbox" placeholder="Username" />
					<input onChange={userPass} value={props.user.pass} type="password" id="password" className="inputbox" placeholder="Password" />
						<br />
					<label htmlFor="autologin" id="remember-me">
						<input onChange={userStay} checked={props.user.isStay} type="checkbox" id="autologin" />
						Remember me
					</label>
					<br />
					<input onClick={checkUser} type="submit" className="button1" />
				</fieldset>
			</div>
		</div>
  )
}

export default Sidebar;