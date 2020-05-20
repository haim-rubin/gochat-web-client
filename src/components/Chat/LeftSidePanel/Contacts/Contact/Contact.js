import React from 'react'
import cx from 'classnames'


const Contact = ({
    status,
    thumbnail = 'http://emilcarlsson.se/assets/louislitt.png',
    name,
    preview
}) => {
    return (
        <div className='contact'>
            <div className='wrap'>
                <span className={cx('contact-status', status)}></span>
                <img src={thumbnail} alt='' />
                <div className='meta'>
                    <p className='name'>{name}</p>
                    <p className='preview'>{preview}</p>
                </div>
            </div>
        </div>
    )
}
export default Contact