import React from 'react'
import s from './style.module.css'
import { Field, reduxForm } from 'redux-form'
import {required} from '../../../utils/validation/validation'
import {Link} from 'react-router-dom';

const LogIn = props => {
	return (
		<form onSubmit={props.handleSubmit}>
			<fieldset className={`fields1 ${s.loginForm}`}>
				{ props.errorByUser === '' ? <></> 
					:	<div className={`error ${s.error}`}> 
							{props.errorByUser}. Please check your entered values and try again 
						</div>
				}
				<dl className={s.centerPosition}>
					<dt>
						<label htmlFor="username">Email:</label>
					</dt>
					<dd className={s.center}>
						<Field validate={[required]}
								name="email"
								type="text"
								id="username email"
								component="input"
								className="inputbox autowidth"
								placeholder={"Email"}
						/>
					</dd>
				</dl>
				{props.regUser ?
					<dl className={s.centerPosition}>
						<dt>
							<label htmlFor="username">Username:</label>
						</dt>
						<dd className={s.center}>
							<Field validate={[required]}
									name="name"
									type="text"
									id="username"
									component="input"
									className="inputbox autowidth"
									placeholder={"Username"}
							/>
						</dd>
					</dl> : <></>
				}
				<dl className={s.centerPosition}>
					<dt>
						<label htmlFor="password">Password:</label>
					</dt>
					<dd className={s.center}>
						<Field validate={[required]}
								name="password"
								type="password"
								component="input"
								id="password"
								className="inputbox autowidth"
								placeholder={"Password"}
						/>
					</dd>
				</dl>
				<dl className={`${s.centerPosition} ${s.centerPositionForCheckbox}`}>
					<dd className={s.center}>
						<label htmlFor="autologin">
							<Field name="isStay" 
									component="input"
									type="checkbox"
									id="autologin"
							/> Remember me
						</label>
					</dd>					
				</dl>
				<dl className={s.centerPosition}>
					<dt>&nbsp;</dt>
					<dd className={s.center}>
						<button className="button1">{props.regUser ? 'Register' : 'Login' }</button>
					</dd>
					<dt>&nbsp;</dt>
					{!!props.errorByUser &&
						<dd className={s.center}>
							<Link to="/password/reset">Fogot your password?</Link>
						</dd>
					}
				</dl>
			</fieldset>
		</form>
	)
}

const LoginRedux = reduxForm({form: 'login'})(LogIn)

const LogPage = props => {

	const checkUser = e => {
		props.checkUser(e)
	}

	const regUser = e => {
		console.log(e)
		props.registerUser(e)
	}

	return (
		<>
			<div id="subhead-title">
				<h2 className={`login-title ${s.login}`}>{props.regUser ? 'Register' : 'Logged into'}</h2>
			</div>

			<div className="chunk">
				<div className="panel">
					<div className="inner">
						<div className="content">
							{ 
								props.useLink !== '' ? <div className={s.apiForm}>
									<h2 className={s.headElem}> Or use: </h2>
									<div>
										<button className={s.discordButton}>
											<a href={props.useLink}>Discord </a>
										</button>
									</div>
								</div> : <></>
							}
							<LoginRedux onSubmit={props.regUser ? regUser : checkUser} {...props} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default LogPage