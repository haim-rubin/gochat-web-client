import ActivationState from './ActivationState'
import InstantMessagesState from './InstantMessagesState'
import WebSocketMapperMiddleware from '../util/WebSocketMapperMiddleware'

class RootState {
    constructor() {
        this.iMessages = new InstantMessagesState({ WebSocketMapperMiddleware, rootState: this })
        this.activation =
            new ActivationState({
                doesUserActivated: false,
                activationCode: '',
                token: null,
                rootState: this,
                activationDetails: { email: 'haim.rubin@gmail.com', nickname:'haymon' },
                doesEmailIsValid: true,
                step: 1,
                doesItFinishInputCode: false,
                code: '',
            })
    }
}

export default new RootState()