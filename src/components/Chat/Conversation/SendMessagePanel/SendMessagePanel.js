import React from 'react'


const SendMessagePanel = () => {
    return (
        <div className="message-input">
			<div className="wrap">
			<input type="text" placeholder="Write your message..." />
			<i className="fa fa-paperclip attachment" aria-hidden="true"></i>
			<button className="submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
			</div>
		</div>
    )
}

export default SendMessagePanel