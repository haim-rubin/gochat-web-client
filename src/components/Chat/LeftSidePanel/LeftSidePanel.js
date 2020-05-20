import React from 'react'
import Contacts from './Contacts'
import SearchContactPanel from './SearchContactPanel'
import UserProfilePanel from './UserProfilePanel/UserProfilePanel'
import BottomBar from './BottomBar'

const LeftSidePanel = ({ appState }) => {
    return (
        <div id="sidepanel">
            <UserProfilePanel/>
            <SearchContactPanel/>
            <Contacts
                contacts={appState.contacts}
                openUserContactInfo={appState.openUserContactInfo} />
            <BottomBar/>
        </div>
    )
}

export default LeftSidePanel