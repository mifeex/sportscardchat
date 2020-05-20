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
						<label htmlFor="new_password">New password</label>
					</dt>
					<dd className={s.center}>
						<Field validate={[required]} component="input"
								type="password"
								className="inputbox autowidth"
								name="newPassword"
								id="new_password"
						/>
					</dd>
				</dl>
				<dl className={s.centerPosition}>
					<dt>
						<label htmlFor="new_password_confirm">Confirm password</label>
					</dt>
					<dd className={s.center}>
						<Field validate={[required]} component="input"
								type="password"
								className="inputbox autowidth"
								name="newPasswordConfirm"
								id="new_password_confirm"
						/>
					</dd>
				</dl>
				<dl className={s.centerPosition}>
					<dt>&nbsp;</dt>
					<dd className={s.center}>
						<button type="submit" name="submit" id="submit" className="button1">Change your password </button>
					</dd>
				</dl>
			</fieldset>
		</form>
	)
}

ResetForm = reduxForm({form: 'resetPassword'})(ResetForm)

const ResetPassword = props => {
	const callPassResetting = e => {
		if (e.newPassword === e.newPasswordConfirm) {
			props.callPassReset({password: e.newPassword, code: props.match.params.code})
		}
		else {
			props.saveError("Password aren't identical")
		}
	}

	return (
		<div id="wrap-body">
		<h2 className={`login-title ${s.login}`}>Reset password</h2>
			<div className="chunk">
				<div className="panel">
					<div className="inner">

						<div className="content">
							{ props.errorByUser === '' ? <></> 
								:	<div className={`error ${s.error}`}> 
										{props.errorByUser}. Please check your entered values and try again 
									</div>
							}
							<ResetForm {...props} onSubmit={callPassResetting} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ResetPassword