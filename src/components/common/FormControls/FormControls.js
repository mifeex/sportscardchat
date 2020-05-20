import React from 'react';
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Textarea = ({input, meta, ...props}) => {	
	return (
		<div className={meta.error && (!meta.pristine || meta.touched) ? "errorValue" : ""}>
			<textarea {...input} {...props} />
		</div>
	)
}///

export const Input = ({input, meta, ...props}) => {
	const show = e => {
		console.log(e.key)
	}
	
	return (
		<div className={meta.error && (!meta.pristine || meta.touched) ? "errorValue" : ""}>
			<input onKeyPress={show} {...input} {...props} />
		</div>
	)
}///

export class FieldFileInput  extends React.Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	onChange(e) {
		const { input: { onChange } } = this.props
		onChange(e.target.files[0])
	}

	render() {
		const { input: { value } } = this.props
		const {input, label,} = this.props  //whatever props you send to the component from redux-form Field
		
		return (
			<>
				<label id="labelForImg" htmlFor={"addImage"} data-subpanel="options-panel" role="tab" title="Attach image" aria-controls="options-panel">
					<FontAwesomeIcon icon={faPaperclip} />
					{label}
				</label>
				<>
					<input
						type='file'
						accept='.jpg, .png, .jpeg'
						onChange={this.onChange}
						id="addImage"
					/>
				</>
			</>
		)
	}
}