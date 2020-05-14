import React from 'react'
import {Link} from 'react-router-dom'

const MainHeader = props => {
	return (
		<div id="site-header">
			<div className="chunk">
				<div id="site-logo">
					<Link className="site-logo" to="" title="Board index">Here should be site logo</Link>
					<p className="skiplink"><Link to="">Skip to content</Link></p>
				</div>

				<ul id="site-menu">
					<li data-skip-responsive="true" className="site-menu"><Link to="" rel="help" title="Frequently Asked Questions">FAQ</Link></li>
					<li className="site-menu">
						<Link to="" >Drop Down</Link>
						<ul>
							<li><Link to="">Lorem ipsum</Link></li>
							<li><Link to="">Welcome to phpBB3</Link></li>
							<li><Link to="">Frequently Asked Questions</Link></li>
							<li><Link to="">BBCode example</Link></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MainHeader