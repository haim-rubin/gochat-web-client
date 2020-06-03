import httpStatus from 'http-status'

const CONTENT_TYPE = {
    JSON: 'application/json',
    TEXT: 'text/html'
}

const JSON_HEADER = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const getOptionExtends = option => ({
    ...JSON_HEADER,
    ...option,
})

const isOkStatus = ({ status }) => (
    //Range of response OK
    status >= httpStatus.OK && status < httpStatus.MULTIPLE_CHOICES
)

const checkStatus = res => {
    if(!isOkStatus(res)) {
        throw res
    }
    return res
}

const parseJSON = res => (
    res.json()
)

const parseError = ref => {
    const { status, statusText, headers } = ref
    const contentType = headers.get('Content-Type')
    const error = true

    if(contentType.includes(CONTENT_TYPE.JSON)){
        return (
            ref
                .json()
                .then(({ message })=> ({
                    message: message || statusText,
                    status,
                    error
                }))
                .then(error => {
                    throw error
                })
        )
    }
    else if(contentType.includes(CONTENT_TYPE.TEXT)){
        return (
            ref
                .text()
                .then( message => ({
                    message: message || statusText,
                    status,
                    error
                }))
        )
    }

}

export const get = ({ url, ...option }) => {
    return (
        fetch(url, getOptionExtends(option))
            .then(checkStatus)
            .then(parseJSON)
            .catch(parseError)
    )
}

export const post = ({ url, ...option }) => {
    return (
        fetch(url, getOptionExtends({...option, method: 'POST', ...(option.body?{ body: JSON.stringify(option.body)}: {} ) }))
            .then(checkStatus)
            .then(parseJSON)
            .catch(parseError)
    )
}