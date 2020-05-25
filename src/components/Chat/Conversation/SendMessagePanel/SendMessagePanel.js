import React from 'react'


const SendMessagePanel = ({ onSend, value, onTappedMessage, sendTextMessage }) => {
    return (
        <div className='message-input'>
			<div className='wrap'>
			<input
				type='text'
				placeholder='Write your message...'
				onKeyDown={(event) => {
					if (event.key === 'Enter'){
						onSend()
					}
				}}
				value={value}
				onChange={({ target }) => {
					onTappedMessage(target.value)
				}} />
			<i className='fa fa-paperclip attachment' aria-hidden='true'></i>
			<button className='submit' onClick={() => sendTextMessage()}>
				<i className='fa fa-paper-plane' aria-hidden='true'></i>
			</button>
			</div>
		</div>
    )
}

export default SendMessagePanel