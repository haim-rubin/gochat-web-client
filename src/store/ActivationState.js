
import { observable, decorate, action, configure, runInAction } from 'mobx'
import { getActivationCode, verifyActivationCode } from '../services/httpService'
import { emailRegexPattern } from '../util/consts'
configure({enforceActions: 'observed'})

class ActivationState {
    constructor({ doesUserActivated, activationCode, token, activationDetails , doesEmailIsValid, step, doesItFinishInputCode, code }){
        this.doesUserActivated = doesUserActivated
        this.activationCode = activationCode
        this.token = token
        this.activationDetails = activationDetails
        this.doesEmailIsValid = doesEmailIsValid
        this.step = step
        this.doesItFinishInputCode = doesItFinishInputCode
        this.code = code
    }

    verificationDetails = {}

    verifyEmail(){
        this.doesEmailIsValid = emailRegexPattern.test(this.activationDetails.email)
    }

    checkIfFinishInputCode(){
        this.doesItFinishInputCode = this.code.length >= 6
    }

    onCodeChange = (valueKeyPair) => {
        this.code = valueKeyPair.code
        this.checkIfFinishInputCode()
    }

    //Step 1 send activation code by email
    onSendActivation = () => {
        getActivationCode(this.activationDetails)
            .then(verificationDetails =>{
                runInAction(() =>{
                    this.verificationDetails = verificationDetails
                    this.step = 2
                })
            })
            .catch(error => {

            })
    }
    //Step 2 verify activation code
    onVerifyCode = () => {
        verifyActivationCode({ ...this.verificationDetails, code: this.code })
            .then(token =>{
                runInAction(() =>{
                    this.token = token
                })
            })
            .catch(error => {
                console.error(error)
            })
    }

    onActivateDetailsChange = (valueKeyPair) => {
        this.activationDetails = { ...this.activationDetails, ...valueKeyPair }
        this.verifyEmail()
    }
}

decorate(ActivationState, {
    verificationDetails: observable,
    activationDetails: observable,
    doesEmailIsValid: observable,
    step: observable,
    code: observable,
    doesItFinishInputCode: observable,

    /* Actions */
    onSendActivation: action,
    onCodeChange: action,
    onActivateDetailsChange: action,
})

export default ActivationState