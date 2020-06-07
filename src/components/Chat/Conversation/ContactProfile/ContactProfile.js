import React from 'react'
import ContactThumbnail from '../../ContactThumbnail'
const ContactProfile = ({ name, thumbnail}) => {
    return (
        <div className='contact-profile'>

		<ContactThumbnail  size='medium' name={name} src={thumbnail}  />

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