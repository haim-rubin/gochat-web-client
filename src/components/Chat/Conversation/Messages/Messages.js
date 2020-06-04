import React, { useRef } from 'react'
import Message from './Message'

const Messages = ({messages, setMessagesContainerRef}) =>{
    const containerRef = useRef()
    setMessagesContainerRef(containerRef)
    return (
        <div className='messages' ref={containerRef}>
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