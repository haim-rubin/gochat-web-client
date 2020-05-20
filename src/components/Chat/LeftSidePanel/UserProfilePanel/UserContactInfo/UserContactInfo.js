import React from 'react'

const UserContactInfo = () => {

    return (
        <div id='expanded'>
            <label htmlFor='twitter'>
                <i className='fa fa-facebook fa-fw' aria-hidden='true'/>
            </label>
            <input name='twitter' type='text' onChange={()=>{}} value='mikeross' />
            <label htmlFor='twitter'>
                <i className='fa fa-twitter fa-fw' aria-hidden='true'/>
            </label>
            <input name='twitter' type='text' onChange={()=>{}} value='ross81' />
            <label htmlFor='twitter'>
                <i className='fa fa-instagram fa-fw' aria-hidden='true'/>
            </label>
            <input name='twitter' type='text' onChange={()=>{}} value='mike.ross' />
        </div>
    )
}

export default UserContactInfo