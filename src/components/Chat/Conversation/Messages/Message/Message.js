import React from 'react'
import cx from 'classnames'

const Message = ({ direction, thumbnail, content, name }) => {

    return (
        <div className={cx(direction)}>
            <img src={thumbnail} alt={name} />
            <p>{content.value}</p>
		</div>
    )
}

export default Message