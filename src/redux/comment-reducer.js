const initialState = {
	commentsData: [
		{
			id: 1,
			tag: "Hello world!",
			text: "Hi man! I was glad to see you too!",
			date: "Mon Feb 25, 2019 8:00 pm",
			inReply: true,
			connectionWithPostID: 2
		},
		{
			id: 2,
			tag: "Hello world!",
			text: "Hello! Welcome to our growing forum!",
			date: "Mon Feb 25, 2019 9:37 pm",
			inReply: true,
			connectionWithPostID: 2
		},
		{
			id: 3,
			tag: "Hello world!",
			text: "Hello...",
			date: "Wed Feb 27, 2019 7:22 pm" ,
			inReply: true,
			connectionWithPostID: 2
		},],
	newCommentText: '',
	userData: [
		{
			id: 1,
			img: "https://sun9-59.userapi.com/c858416/v858416734/1bc6bb/aNJyl4sxWIM.jpg",
			count: 12,
			joined: 'Sat Jan 30, 2010 2:13 pm',
			name: 'Strange Face',},
		{
			id: 2,
			img: "https://sun9-28.userapi.com/c858416/v858416734/1bc6d9/fNAWf8aj7Xk.jpg",
			count: 9,
			joined: 'Thu Sep 30, 2007 1:32 pm',
			name: 'Praying Parishioner',},
		{
			id: 3,
			img: "https://sun9-20.userapi.com/c858416/v858416734/1bc6e9/McdwAUE2bA0.jpg",
			count: 183,
			joined: 'Fri Jul 30, 2000 8:17 pm',
			name: 'No Man',
		},
	],      
}

const commentReducer = (state = initialState, action) => {
	let newState = {
		...state,
		commentsData: [...state.commentsData],
	};
	//newState.userData = [...state.userData];

	const _newText = text => {
		newState.newCommentText = text
	}

	const _addComment = () => {
	  	let newPost = {
			id: 4,
			tag: "Hello world!",
			text: newState.newCommentText,
			date: new Date().toLocaleTimeString(),
			inReply: true
	  	}

		newState.commentsData.push(newPost)
		_newText("")
	}

	switch (action.type) {
		case 'ADD-COMMENT':
			_addComment()
			return newState;
		case 'ADD-TEXT':
			_newText(action.text)
			return newState;
      // case :
		default:
			return state;
	}
}

export default commentReducer;