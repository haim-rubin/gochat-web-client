import React from 'react'
import Messages from './Messages'
import ContactProfile from './ContactProfile'
import SendMessagePanel from './SendMessagePanel'

const Conversation = ({ appState }) => {
    return (
        <div className='content'>
            <ContactProfile {...appState.iMessages.contactProfile}/>
            <Messages messages={appState.iMessages.messages} setMessagesContainerRef={appState.setMessagesContainerRef}/>
            <SendMessagePanel
                onSend={() => {
                    appState.iMessages.sendTextMessage()
                }}
                value={appState.iMessages.tappedMessage[appState.iMessages.currentChat.ParticipanID || appState.iMessages.currentChat.GroupID] || ''}
                onTappedMessage={appState.iMessages.onTappedMessage}
                sendTextMessage={() => appState.iMessages.sendTextMessage()}
            />
        </div>
    )
}
export default Conversation