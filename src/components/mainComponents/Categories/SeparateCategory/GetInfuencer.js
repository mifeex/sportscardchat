import React from 'react';
import {Link} from 'react-router-dom';
import SidebarContext from '../../Profile/posts/sidebar/SidebarContext';
import Influencer from './Element/Influencer'

const GetInfuencer = props => {
	let elements = []
	let count = 0

	if (props.influencers.length >= 1) {
		elements = props.influencers[0].influencer
		count = props.influencers[0].count.count
	}

	return (
		<div>
			<SidebarContext />
			<div id="forumlist">
				<div id="forumlist-inner">
					<div className="forabg">
						<div className="inner">
							<ul className="topiclist">
								<li className="header">
									<dl className="icon">
										<dt>
											<div className="list-inner">
												<Link to="/">Content Creators</Link>
											</div>
										</dt>
										<dd className="lastpost">Content Creator </dd>
										<dd className="posts">Joined </dd>
									</dl>
								</li>
							</ul>
							<ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
							{props.influencers !== undefined && props.totalCount !== undefined ?
								elements.map(e => {
									return <Influencer key={e.id}
														count={count}
														user={e.username}
														date={e.date}
														userId={e.id}
														count={e.count}
											/>
								}) : <></>
							}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}///

export default GetInfuencer;