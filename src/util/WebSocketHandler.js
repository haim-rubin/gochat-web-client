//TODO: Make this class singleton
class WebSocketHandler {

    constructor({ token, url, persistence }){
        if (!!WebSocketHandler.instance) {
            return WebSocketHandler.instance
        }

        WebSocketHandler.instance = this

        this.token = token
        this.url = url || `ws://${document.location.host}/ws`
        this.persistence = persistence
    }

    connect() {
        this.conn = new WebSocket(`${this.url}?token=${this.token}`)
    }

    restoreHandlers() {
        return {
            onMessage: this.conn.onmessage,
            onClose: this.conn.onclose,
            onOpen: this.conn.onopen,
            onError: this.conn.onerror,
        }
    }

    reconnect(timeout){
        setTimeout(() =>{
            const handlers = this.restoreHandlers()
            this.connect()
            this.addEventsListeners(handlers)
        }, timeout)
    }

    addEventsListeners({ onMessage, onClose, onOpen, onError }) {
        const { conn } = this

        conn.onclose = (event) => {
            if(this.persistence){
                console.log('reconnect')
                this.reconnect(100)
            }
            else{
                onClose(event)
            }

        }
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