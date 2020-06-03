
import { observable, decorate, action, configure, runInAction, get } from 'mobx'
import { getActivationCode, verifyActivationCode, getUser } from '../services/httpService'
import { emailRegexPattern, TOKEN_KEYWORD } from '../util/consts'
configure({enforceActions: 'observed'})

class ActivationState {
    constructor({ rootState, doesUserActivated, activationCode, token,
                    activationDetails, doesEmailIsValid, step,
                    isActivated, doesItFinishInputCode, code, userInfo }){
        this.doesUserActivated = doesUserActivated
        this.activationCode = activationCode
        this.token = token
        this.activationDetails = activationDetails
        this.doesEmailIsValid = doesEmailIsValid
        this.step = step
        this.doesItFinishInputCode = doesItFinishInputCode
        this.code = code
        this.rootState = rootState
        this.isActivated = isActivated
        this.userInfo = userInfo
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
                console.error(error)
            })
    }
    //Step 2 verify activation code
    onVerifyCode = () => {
        verifyActivationCode({ ...this.verificationDetails, code: this.code })
            .then(payload  =>{
                runInAction(() =>{
                    if(payload.token){
                        this.rootState.storage.set(TOKEN_KEYWORD, payload)
                        this.getUserInfo()
                    }
                })
            })
            .catch(error => {
                this.rootState.storage.set(TOKEN_KEYWORD, {token: null})
                console.error(error)
            })
    }

    getUserInfo = () => {
        getUser()
            .then(userInfo  =>{
                if (userInfo){
                    runInAction(() => {
                        this.userInfo = userInfo
                        this.rootState.login()
                        this.isActivated = true
                    })
                }

            })
            .catch(error => {
                runInAction(() => {
                    this.isActivated = false
                })
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
    isActivated: observable,
    userInfo: observable,

    /* Actions */
    onSendActivation: action,
    onCodeChange: action,
    onActivateDetailsChange: action,
})

export default ActivationState