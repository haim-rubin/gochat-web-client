import { observer, inject } from 'mobx-react'
import App from './App'
export default inject('appState')(observer(App))