import LeftSidePanel from './LeftSidePanel'
import { inject, observer } from 'mobx-react'

export default inject('appState')(observer(LeftSidePanel))