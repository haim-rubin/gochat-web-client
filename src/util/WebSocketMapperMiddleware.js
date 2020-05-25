import WebSocketHandler from './WebSocketHandler'

class WebSocketMapperMiddleware {

    constructor({ url }){
        this.url = url
    }

    login({ token }){
        const { url } = this
        this.webSocketHandler = new WebSocketHandler({ token, url })

        return (
            this.webSocketHandler.login()
            .then(res => {
                this.webSocketHandler
                    .addEventsListeners({
                        onMessage: this.innerOnMessage.bind(this),
                        onClose: this.innerOnClose.bind(this),
                        onOpen: this.innerOnOpen.bind(this),
                        onError: this.innerOnError.bind(this),
                    })
                return res
            })
            .catch((error) => {
                console.error(error)
                throw error
            })
        )

    }

    innerOnMessage({ data }){
        //TODO: Map the event data and raise listeners
        const message = JSON.parse(data)
        this.onMessage.forEach((handler) => {
            handler(message)
        })
      // return data
    }
    innerOnClose(event){
        //TODO: Map the event data and raise listeners
        console.log('Close arrived', event)
    }

    innerOnOpen(event){
        //TODO: Map the event data and raise listeners
        console.log('On open', event)

    }
    innerOnError(event){
        //TODO: Map the event data and raise listeners
        console.log('On error', event)
    }

    addEventListener( hndlerName, handler ){
        if(!this[hndlerName]){
            this[hndlerName] = []
        }
        this[hndlerName].push(handler)
    }

    addEventsListeners({ onMessage, onClose, onOpen, onError }){
        Object
            .entries({
                onMessage,
                onClose,
                onOpen,
                onError
            })
            .filter(([key, handler]) => typeof handler === 'function')
            .forEach(([handlerName, handler ]) => {
                this.addEventListener( handlerName, handler )
            })
    }

    send(message){
        this.webSocketHandler.send(
            JSON.stringify(message)
        )
    }

}

export default WebSocketMapperMiddleware
