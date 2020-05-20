import React from 'react'
import Messages from './Messages'
import ContactProfile from './ContactProfile'
import SendMessagePanel from './SendMessagePanel'

const Conversation = ({ appState }) => {
    return (
        <div className='content'>
            <ContactProfile {...appState.contactProfile}/>
            <Messages messages={appState.messages} />
            <SendMessagePanel/>
        </div>
    )
}

export default Conversation