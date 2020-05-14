import React from 'react'
import {Link} from 'react-router-dom'
import { faPowerOff, faUser, faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MenuBar = props => {
	return (
		<ul role="menubar">
			{
				props.isAuth ?
					<li className="font-icon rightside" data-skip-responsive="true">
						<Link to={`/user/${props.userId}`}>
							<FontAwesomeIcon icon={faUser} />
							<span className="nav-rh-2">
								&#160;{props.userName}
							</span>
						</Link>
						<button onClick={props.loggedOut} role="menuitem">
							<FontAwesomeIcon icon={faPowerOff} />
							<span className="nav-rh-2"> Logout</span>
						</button>
					</li> : 
					<>
						<li className="font-icon rightside" data-skip-responsive="true">
							<Link to="/login" role="menuitem">
								<FontAwesomeIcon icon={faUserCheck} />
								<span className="nav-rh-2"> Login</span>
							</Link>
						</li>

						<li className="font-icon rightside" data-skip-responsive="true">
							<Link to="/register" role="menuitem">
								<FontAwesomeIcon icon={faUserPlus} />
								<span className="nav-rh-2"> Register</span>
							</Link>
						</li>
					</>
			}
		</ul>
	)
}

export default MenuBar