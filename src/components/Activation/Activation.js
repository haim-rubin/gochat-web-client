import React from 'react'
import SendActivationCode from './SendActivationCode'
import ActivateCode from './ActivateCode'


const Activation = ({
    step,
    onSendActivation,
    activationDetails,
    onActivateDetailsChange,
    doesEmailIsValid,
    onCodeChange,
    onVerifyCode,
    doesItFinishInputCode }) => {

    return (
        <div className='chat-frame'>
            <div className='activation'>
            {
                step === 1
                ? <SendActivationCode
                    activationDetails={activationDetails}
                    onActivateDetailsChange={onActivateDetailsChange}
                    onSendActivation={onSendActivation}
                    doesEmailIsValid={doesEmailIsValid}/>
                : <ActivateCode
                    onCodeChange={onCodeChange}
                    onVerifyCode={onVerifyCode}
                    doesItFinishInputCode={doesItFinishInputCode}/>
            }
            </div>
        </div>
    )

}


export default Activation