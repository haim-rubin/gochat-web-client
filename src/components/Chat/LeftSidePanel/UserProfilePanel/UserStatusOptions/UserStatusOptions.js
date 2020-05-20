import React from 'react'

const UserStatusOptions = () => {
    return (
        <div id='status-options'>
            <ul>
                <li id='status-online' className='active'>
                    <span className='status-circle'></span>
                    <p>Online</p>
                </li>
                <li id='status-away'>
                    <span className='status-circle'></span>
                    <p>Away</p>
                </li>
                <li id='status-busy'>
                    <span className='status-circle'></span>
                    <p>Busy</p>
                </li>
                <li id='status-offline'>
                    <span className='status-circle'></span>
                    <p>Offline</p>
                </li>
            </ul>
        </div>
    )
}

export default UserStatusOptions