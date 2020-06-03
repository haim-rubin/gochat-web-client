import React from 'react'

const UserProfile = ({ Nickname, Thumbnail, Status, onClick }) => {
    return (
        <div onClick={onClick}>
            <img src={Thumbnail} className={Status} alt={Nickname} />
            <p>{Nickname}</p>
        </div>
    )
}

export default UserProfile
