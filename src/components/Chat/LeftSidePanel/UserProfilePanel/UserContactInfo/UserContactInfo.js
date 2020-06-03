import React from 'react'

const UserContactInfo = ({ Nickname, Username }) => {

    return (
        <div id='expanded'>
            <label htmlFor='twitter'>
                <i className='fa fa-facebook fa-fw' aria-hidden='true'/>
            </label>
            <input name='twitter' type='text' onChange={()=>{}} value={Nickname} />
            <label htmlFor='twitter'>
                <i className='fa fa-twitter fa-fw' aria-hidden='true'/>
            </label>
            <input name='twitter' type='text' onChange={()=>{}} value={Username} />
        </div>
    )
}

export default UserContactInfo