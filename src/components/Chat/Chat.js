import React from 'react'
import LeftSidePanel from './LeftSidePanel'
import Conversation from './Conversation'

const Chat = (props) => {
    return (
        <div className='chat-frame'>
            <LeftSidePanel/>
            <Conversation/>
        </div>
    )
}
export default Chat