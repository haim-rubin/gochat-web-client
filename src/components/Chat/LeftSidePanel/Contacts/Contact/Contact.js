import React from 'react'
import cx from 'classnames'


const Contact = ({
    Status,
    Thumbnail = 'http://emilcarlsson.se/assets/louislitt.png',
    Name,
    Preview
}) => {
    return (
        <div className='contact'>
            <div className='wrap'>
                <span className={cx('contact-status', Status)}></span>
                <img src={Thumbnail} alt='' />
                <div className='meta'>
                    <p className='name'>{Name}</p>
                    <p className='preview'>{Preview}</p>
                </div>
            </div>
        </div>
    )
}
export default Contact