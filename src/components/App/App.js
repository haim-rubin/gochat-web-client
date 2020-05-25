import React from 'react';
import Chat from '../Chat'

class App extends React.Component {
  componentDidMount(){
    this.props.appState.getUserProfile()
    this.props.appState.getContacts()
    this.props.appState.getMessages()
    this.props.appState.login()
    const contactId = 1
    this.props.appState.getContactProfile(contactId)

  }
  render(){
    return (
      <div className='app'>
        <Chat></Chat>
      </div>
    );
  }

}

export default App
