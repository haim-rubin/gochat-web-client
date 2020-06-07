import React, { Component } from 'react'
import cx from 'classnames'

const getInitials = (name = '') => (
    name
        .split(' ')
        .map(part => part[0])
        .join('')
)

class ContactThumbnail extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loadSucceeded: false
        }
        const img = new Image()

        img.addEventListener('error', () => {
            this.setState({ loadSucceeded: false })
        })

        img.addEventListener('load', () => {
            this.setState({ loadSucceeded: true })
        })

        img.src = props.src
    }

    render() {

        const { size, src, name } = this.props
        const { loadSucceeded } = this.state
        return(
            <div className={cx('contact-thumbnail', size)} >
                {
                    loadSucceeded
                    ? <img src={src} alt={name} />
                    : <div className='initials'>{getInitials(name)}</div>
                }
            </div>
        )
    }
}


export default ContactThumbnail