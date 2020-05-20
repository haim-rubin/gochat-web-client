import React from 'react'

const ContactProfile = ({ name, thumbnail}) => {
    return (
        <div className='contact-profile'>
			<img src={thumbnail} alt={name} />
			<p>{name}</p>
			<div className='social-media'>
				<i className='fa fa-facebook' aria-hidden='true'></i>
				<i className='fa fa-twitter' aria-hidden='true'></i>
				 <i className='fa fa-instagram' aria-hidden='true'></i>
			</div>
		</div>
    )
}

export default ContactProfile