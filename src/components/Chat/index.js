import { inject, observer } from 'mobx-react'
import Chat from './Chat'
export default  inject('appState')(observer(Chat))