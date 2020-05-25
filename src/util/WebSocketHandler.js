//TODO: Make this class singleton
class WebSocketHandler {

    constructor({ token, url }){
        if (!!WebSocketHandler.instance) {
            return WebSocketHandler.instance
        }

        WebSocketHandler.instance = this

        this.token = token
        this.url = url || `ws://${document.location.host}/ws`
    }


    connect() {
        this.conn = new WebSocket(`${this.url}?token=${this.token}`)
    }

    addEventsListeners({ onMessage, onClose, onOpen, onError }) {
        const { conn } = this
        conn.onclose = onClose
        conn.onmessage = onMessage
        conn.onopen = onOpen
        conn.onerror = onError
    }

    login () {
        return (
            new Promise((resolve, reject) => {
                try{
                    this.connect()
                    resolve({ connected: true })
                }
                catch(error){
                    reject(error)
                }
            })
        )
    }

    send(message){
        this.conn.send(message)
    }
}

Object.defineProperty(WebSocketHandler, 'isWebSocketSupported', {
    get: function() {
         return !!WebSocket
    }
})

export default WebSocketHandler