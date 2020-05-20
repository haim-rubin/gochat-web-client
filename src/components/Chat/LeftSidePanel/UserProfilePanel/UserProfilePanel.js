import React from 'react'
import { observer, inject } from 'mobx-react'
import Expand from 'react-expand-animated'

import UserProfile from './UserProfile'
import UserStatusOptions from './UserStatusOptions'
import UserContactInfo from './UserContactInfo'
import cx from 'classnames'
const transitions = ['height', 'opacity', 'background']

const UserProfilePanel = ({ appState }) => {
    return (
        <div className={cx('user-profile-panel', { expanded: appState.openUserContactInfo })}>
            <div className='wrap'>
                <UserProfile {...appState.userProfile} onClick={() =>{appState.toggleUserStatusOptions()}}/>
                <i
                    className='fa fa-chevron-down expand-button'
                    aria-hidden='true'
                    onClick={() => {appState.toggleUserContactInfo()}}>
                </i>
                <Expand
                    open={appState.openUserStatusOptions}
                    duration={300}
                    transitions={transitions}>
                    <UserStatusOptions/>
                </Expand>
                <Expand
                    open={appState.openUserContactInfo}
                    duration={300}
                    transitions={transitions}>
                    <UserContactInfo/>
                </Expand>
            </div>
        </div>
    )
}

export default inject('appState')(observer(UserProfilePanel))