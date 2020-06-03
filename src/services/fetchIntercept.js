import fetchIntercept from 'fetch-intercept'
import { TOKEN_KEYWORD } from'../util/consts'
import { getStorage } from './storage'
const storage = getStorage()

fetchIntercept.register({
    request: function (url, config) {
        // Modify the url or config here
        const token = storage.get(TOKEN_KEYWORD)
        config.headers = { ...config.headers, ...token}
        return [url, config]
    },

    requestError: function (error) {
        // Called when an error occured during another 'request' interceptor call
        return Promise.reject(error)
    },

    response: function (response) {
        // Modify the reponse object
        return response
    },

    responseError: function (error) {
        // Handle an fetch error
        return Promise.reject(error)
    }
})
