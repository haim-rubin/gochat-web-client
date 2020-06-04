import ActivationState from './ActivationState'
import InstantMessagesState from './InstantMessagesState'
import WebSocketMapperMiddleware from '../util/WebSocketMapperMiddleware'
import { getStorage } from '../services/storage'
import { TOKEN_KEYWORD } from '../util/consts'
import { observable, decorate, action, runInAction } from 'mobx'
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
                activationDetails: { email: '', nickname:'' },
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

      /* Handle messages scroll */
  setMessagesContainerRef = (ref) => {
    this.containerRef = ref.current
  }

  shouldScroll = () => (
    this.containerRef && this.containerRef.scrollTop + this.containerRef.clientHeight === this.containerRef.scrollHeight
  )

  scrollToBottom = () => {
    runInAction(() => {
        if(this.containerRef){
            this.containerRef.scrollTop = this.containerRef.scrollHeight
        }
    })
  }
}

decorate(RootState, {
    containerRef: observable,

    /* Actions */
    setMessagesContainerRef: action,
    scrollToBottom: action,
    shouldScroll: action,
})

export default new RootState({ storage })