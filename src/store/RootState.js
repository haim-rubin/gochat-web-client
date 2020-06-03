import ActivationState from './ActivationState'
import InstantMessagesState from './InstantMessagesState'
import WebSocketMapperMiddleware from '../util/WebSocketMapperMiddleware'
import { getStorage } from '../services/storage'
import { TOKEN_KEYWORD } from '../util/consts'
const storage = getStorage()

class RootState {
    constructor({ storage }) {
        this.storage = storage
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
                isActivated: false,
                userInfo: {}
            })
    }

    login() {
        const token = this.storage.get(TOKEN_KEYWORD)
        this.iMessages.registerInstantMessages(token)
    }
}

export default new RootState({ storage })