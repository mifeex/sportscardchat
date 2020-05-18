import React from 'react';
import { Field } from 'redux-form';
import s from '../../mainComponents/NewPost/style.module.css';
import { required, maxLengthCreator, isQute } from '../../../utils/validation/validation';
import { faBold, faItalic, faListUl, faQuoteRight, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Textarea, FieldFileInput } from '../FormControls/FormControls';


let mousePos = null;
const maxLength = maxLengthCreator(2000);

const AddValueBlock = props => {

	const addSubStr = (pos, elem, str) => {
		let beforeSubStr = str.substring(0, pos);
		let afterSubStr = str.substring(pos, str.length);
		let bigString = beforeSubStr+elem+afterSubStr

		return props.change('message', bigString)
	}

	const setBeautify = (element) => {
		let messageBody = '';

		if (props.message !== undefined) {
			messageBody = props.message;
			addSubStr(mousePos, element, messageBody)
		}

		if (props.message === undefined) {
			messageBody = '';
			addSubStr(mousePos, element, messageBody)
		}
		
	}

	const addBold = e => {
		setBeautify('<strong></strong>')
	}

	const addItalic = e => {
		setBeautify('<i></i>')
	}
	const addLists = e => {
		setBeautify('<ul>\n <li></li> \n</ul>')
	}
	const addQuote = e => {
		setBeautify('<q></q>')
	}
	const addLink = () => {
		setBeautify(`<a href=""></a>`)
	}

	return (
		<>
			<div id="tabs" className="sub-panels" data-show-panel="" role="tablist">
				<ul style={{height: "33px"}}>
					<li onClick={addBold} id="options-panel-tab" className={`tab ${s.tab}`}>
						<button type="button" data-subpanel="options-panel" role="tab" title="Bold" aria-controls="options-panel">
							<FontAwesomeIcon icon={faBold} />
						</button>
					</li>
					<li onClick={addItalic} id="options-panel-tab" className={`tab ${s.tab}`}>
						<button type="button" data-subpanel="options-panel" role="tab" title="Italic" aria-controls="options-panel">
							<FontAwesomeIcon icon={faItalic} />
						</button>
					</li>
					<li onClick={addLists} id="options-panel-tab" className={`tab ${s.tab}`}>
						<button type="button" data-subpanel="options-panel" role="tab" title="Lists" aria-controls="options-panel">
							<FontAwesomeIcon icon={faListUl} />
						</button>
					</li>
					<li onClick={addQuote} id="options-panel-tab" className={`tab ${s.tab}`}>
						<button type="button" data-subpanel="options-panel" role="tab" title="Quote" aria-controls="options-panel">
							<FontAwesomeIcon icon={faQuoteRight} />
						</button>
					</li>
					<li onClick={addLink} id="options-panel-tab" className={`tab ${s.tab}`}>
						<button type="button" data-subpanel="options-panel" role="tab" title="Insert into 'href' value your link" aria-controls="options-panel">
							<FontAwesomeIcon icon={faLink} />
						</button>
					</li>
					<li style={{height: "33px"}} id="options-panel-tab" className={`tab ${s.tab} ${s.addPostHeader}`}>
						<Field
							name="addedpic"
							component={FieldFileInput}
							type="file"
							id="addFile"
							className={s.addPostHeader}
						/>
					</li>
				</ul>
			</div>

			<div id="message-box">
				<Field validate={[required, maxLength, isQute]}
						component={Textarea}
						id={"signature"}
						style={{height: '9em'}}
						name={"message"}
						id="message"
						className={`inputbox ${s.rightColor}`}
						onKeyDown={e => mousePos = e.target.selectionStart}
				/>
			</div>
		</>
	)
}///

export default AddValueBlock