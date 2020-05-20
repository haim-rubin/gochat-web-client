import React from 'react'

const UserProfile = ({ name, thumbnail, status, onClick }) => {
    return (
        <div onClick={onClick}>
            <img src={thumbnail} className={status} alt={name} />
            <p>{name}</p>
        </div>
    )
}

export default UserProfile
