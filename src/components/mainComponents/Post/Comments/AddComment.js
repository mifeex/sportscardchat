import React from 'react';
// тупая компонента.
const AddComment = (props) => {
	let newPostEl = React.createRef();

	let addPost = () => {
		props.addPost();
	}
	
	let changeArea = () => {
		let text = newPostEl.current.value;
		props.changeArea(text)
	}
	
    return (
    	<div>
	      	<textarea onChange={changeArea} ref={newPostEl} value={props.comments.newCommentText}></textarea>
	      	<button onClick={addPost}>Add Comment</button>
    	</div>
    )
}

export default AddComment;