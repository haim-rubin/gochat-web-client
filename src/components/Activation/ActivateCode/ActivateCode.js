import React from 'react'


const ActivateCode = ({ code, doesItFinishInputCode, onVerifyCode, onCodeChange }) => {

    return (
        <div className='activation-step'>
            <div className='container'>
                <div className='header'>Chillchat - Activate user</div>
                <div className='row'>
                    <div className='input-group input-group-icon'>
                        <input
                            value={code}
                            onChange={({ target }) => onCodeChange({ code: target.value })}
                            className='user-input-detail'
                            type='text'
                            placeholder='Please enter the code that sent to your email'
                            onKeyDown={(event) => {
                                if (event.key === 'Enter'){
                                    doesItFinishInputCode && onVerifyCode()
                                }
                            }}
                            />
                        <div className='input-icon'>
                            <i className='fa fa-key'></i>
                        </div>
                    </div>

                </div>
                <button className='submit' disabled={!doesItFinishInputCode} onClick={() => doesItFinishInputCode && onVerifyCode()}>
                    <i className='fa fa-paper-plane' aria-hidden='true'></i>
                </button>
            </div>
        </div>

    )
}

export default ActivateCode

