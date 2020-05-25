import React from 'react'
import Messages from './Messages'
import ContactProfile from './ContactProfile'
import SendMessagePanel from './SendMessagePanel'

const Conversation = ({ appState }) => {
    return (
        <div className='content'>
            <ContactProfile {...appState.contactProfile}/>
            <Messages messages={appState.messages} />
            <SendMessagePanel
                onSend={() => {
                    appState.sendTextMessage()
                }}
                value={appState.tappedMessage[appState.currentChat.ParticipanID || appState.currentChat.GroupID] || ''}
                onTappedMessage={appState.onTappedMessage}
                sendTextMessage={() => appState.sendTextMessage()}
            />
        </div>
    )
}
export default Conversation