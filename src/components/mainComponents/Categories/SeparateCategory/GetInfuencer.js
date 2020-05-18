import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {faTrophy} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SidebarContext from '../../Profile/posts/sidebar/SidebarContext';
import Influencer from './Element/Influencer'

const GetInfuencer = props => {

	let user = ''
	let date = ''
	let userId = ''
	let count = 0

	if (props.influencers !== undefined) {
		user = props.influencers[0].username
		date = props.influencers[0].date
		userId = props.influencers[0].id
		count = props.totalCount[0].count
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
												<Link to="/">Influencers</Link>
											</div>
										</dt>
										<dd className="lastpost">Influencer </dd>
									</dl>
								</li>
							</ul>
							<ul className="topiclist forums" style={{backgroundColor: '#FAFAFA'}}>
							{props.influencers !== undefined && props.totalCount !== undefined ?
								props.influencers.map(e => {
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