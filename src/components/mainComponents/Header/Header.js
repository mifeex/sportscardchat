import React from 'react';
import s from './Header.module.css';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
		<div id="wrap-head">
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

			<div id="site-nav" role="navigation">
				<div className={s.chunkNav}>
					<div className="site-nav">
						<div id="site-search" role="search">
							<form method="get">
								<fieldset>
									<input type="search" title="Search for keywords" value="" placeholder="Search" />
									<button type="submit" title="Search">
										<i className="fa fa-search"></i>
									</button>
									<input type="hidden" name="style" />
								</fieldset>
							</form>
						</div>
						
						<ul role="menubar">
							<li className="font-icon rightside" data-skip-responsive="true">
								<Link to="" title="Login" accessKey="x" role="menuitem">
									<i className="fa fa-power-off"></i>
									<span className="nav-rh-2">Login</span>
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
    )
}

export default Header;