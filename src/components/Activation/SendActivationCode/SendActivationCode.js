import React from 'react'


const SendActivationCode = ({ onSendActivation, activationDetails, onActivateDetailsChange, doesEmailIsValid }) => {

    return (
        <div className='activation-step send-activation-code'>
            <div className='container'>
                <div className='header'>Chillchat - get activation code</div>
                <div className='row'>

                    <div className='input-group input-group-icon'>
                        <input
                            value={activationDetails.nickname}
                            onChange={({ target }) => onActivateDetailsChange({ nickname: target.value })}
                            className='user-input-detail'
                            type='text'
                            placeholder='Nickname'/>
                        <div className='input-icon'>
                            <i className='fa fa-user'></i>
                        </div>
                    </div>
                    <div  className='input-group input-group-icon'>
                        <input
                            value={activationDetails.email}
                            placeholder='Please enter your email'
                            onChange={({ target }) => onActivateDetailsChange({ email: target.value })}
                            className='user-input-detail' type='email' placeholder='Email Adress'/>
                        <div className='input-icon'>
                            <i className='fa fa-envelope'></i>
                        </div>
                    </div>
                </div>
                <button className='submit' disabled={!doesEmailIsValid} onClick={() => doesEmailIsValid && onSendActivation()}>
                    <i className='fa fa-paper-plane' aria-hidden='true'></i>
                </button>
            </div>
        </div>

    )
}

export default SendActivationCode