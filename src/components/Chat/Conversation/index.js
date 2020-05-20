import { inject, observer} from 'mobx-react'
import Conversation from './Conversation'
export default inject('appState')(observer(Conversation))