import React from 'react'
import s from './style.module.css'
import { Field, reduxForm } from 'redux-form'
import {required} from '../../../utils/validation/validation'

let ResetForm = props => {
	return (
		<form id="reset_password" onSubmit={props.handleSubmit}>
			<fieldset className={`fields1 ${s.loginForm}`}>
				<dl className={s.centerPosition}>
					<dt>
						<label htmlFor="email">Email address</label><br />
					</dt>
					<dd className={s.center}>
						<Field validate={[required]} component="input" className="inputbox autowidth" type="email" name="email" id="email"/>
					</dd>
				</dl>
			<dl className={s.centerPosition}>
				<dt>&nbsp;</dt>
				<dd className={s.center}>
					<button type="submit" name="submit" id="submit" className="button1">Reset </button>
				</dd>
			</dl>
			</fieldset>
		</form>
	)
}

ResetForm = reduxForm({form: 'reset'})(ResetForm)

const ResetPage = props => {
	const resetting = e => {
		props.resetPassword(e.email)
	}

	return (
		<div id="wrap-body">
		<h2 className={`login-title ${s.login}`}>Reset password</h2>
			<div className="chunk">
				<div className="panel">
					<div className="inner">
						<div className="content">
							<ResetForm {...props} onSubmit={resetting} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPage


							// <dl>
							// 	<dt><label for="new_password">New password</label></dt>
							// 	<dd>
							// 		<input type="password" name="newPassword" id="new_password" autocomplete="off" />
							// 	</dd>
							// </dl>
							// <dl>
							// 	<dt>
							// 		<label for="new_password_confirm">Confirm password</label>
							// 	</dt>
							// 	<dd>
							// 		<input type="password" name="newPasswordConfirm" id="new_password_confirm" autocomplete="off" />
							// 	</dd>
							// </dl>