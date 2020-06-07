import React from 'react'

const UserProfile = ({ Nickname, Thumbnail='http://emilcarlsson.se/assets/harveyspecter.png', Status, onClick }) => {
    return (
        <div onClick={onClick}>
            <img src={'http://emilcarlsson.se/assets/harveyspecter.png'} className={Status} alt={Nickname} />
            <p>{Nickname}</p>
        </div>
    )
}

export default UserProfile
