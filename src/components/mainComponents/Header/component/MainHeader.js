import React from 'react'
import {Link} from 'react-router-dom'

const MainHeader = props => {
	return (
		<div id="site-header">
			<div className="chunk">
				<div id="site-logo">
					<Link className="site-logo" to="">
						<img alt="logo" style={{width: '100px', height: '150px'}} src={`https://sportscardchat.com:4000/images/logo.jpg`}/>
					</Link>
					<p className="skiplink"><Link to="">Skip to content</Link></p>
				</div>

				<ul id="site-menu">
					<li data-skip-responsive="true" className="site-menu">
						<Link to="/Influencers">Content Creators</Link>
					</li>
					<li className="site-menu">
						<Link to="/">Categories</Link>
						<ul>
							<li><Link to="/category/Breaks">Breaks</Link></li>
							<li><Link to="/category/Sports cards">Sports cards</Link></li>
							<li><Link to="/category/General chat">General chat</Link></li>
							<li><Link to="/category/Discover">Discover</Link></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}

export default MainHeader