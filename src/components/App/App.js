import React from 'react'
import Chat from '../Chat'
import Activation from '../Activation'

class App extends React.Component {
  componentDidMount(){
    this.props.appState.iMessages.getUserProfile()
    this.props.appState.iMessages.getContacts()
    this.props.appState.iMessages.getMessages()
    //this.props.appState.iMessages.login()
    const contactId = 1
    this.props.appState.iMessages.getContactProfile(contactId)

  }
  render(){
    const { activation } = this.props.appState
    return (
      <div className='app'>
        {
           activation.isActivated || false
           ? <Chat></Chat>
           :
           (
             <Activation
              onSendActivation={activation.onSendActivation}
              activationDetails={activation.activationDetails}
              onActivateDetailsChange={activation.onActivateDetailsChange}
              doesEmailIsValid={activation.doesEmailIsValid}
              step={activation.step}
              onVerifyCode={activation.onVerifyCode}
              onCodeChange={activation.onCodeChange}
              code={activation.code}
              doesItFinishInputCode={activation.doesItFinishInputCode}
             />
           )
        }

      </div>
    );
  }

}

export default App
