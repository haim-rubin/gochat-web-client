import React from 'react'
import Contact from './Contact'
import cx from 'classnames'

const Contacts = ({ contacts, onContactClick, openUserContactInfo = false}) => {
    return (
        <div className={cx('contacts-list', { expanded: openUserContactInfo })} id='contacts'>
			<ul>
                {
                    contacts
                        .map((contact, idx) =>{
            				return(
                                <li key={idx} onClick={() => onContactClick(contact) }>
                                    <Contact {...contact}/>
                                </li>
                            )
                        })
                }
            </ul>
        </div>
    )
}

export default Contacts