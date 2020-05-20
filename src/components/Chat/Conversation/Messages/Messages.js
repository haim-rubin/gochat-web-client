import React from 'react'
import Message from './Message'

const Messages = ({messages}) =>{
    return (
        <div className='messages'>
			<ul>
                {
                    messages
                        .map((message, idx) => {
                            return (
                                <li key={idx}>
                                    <Message {...message}/>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default Messages