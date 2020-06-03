import { get, post } from '../util/http'

export const getActivationCode = ({ email, nickname }) => {
    return (
        get({url: `api/verification/code?username=${email}&nickname=${nickname}`})
    )
}

export const verifyActivationCode = ({ code, actionId }) => {
    return (
        post({
            url: `api/verification/code/verify`,
            body: { Code: code, ID: Number(actionId) }
        })
        .then(data => {
            console.log(data)
            return data
        })
    )
}

export const getUser = () => {
    return (
        get({url: `api//user/info`})
    )
}


