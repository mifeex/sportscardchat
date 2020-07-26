import * as React from 'react';

const Preloader = () => {
	return (
		<div style={{zIndex: 9999, width: "100%", height: "100%", position: "absolute", backgroundColor: "#eaecf0", overflow: "hidden"}}>Loading ...</div>
	)
}

export default Preloader