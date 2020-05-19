
import { observable, decorate, action, configure, runInAction } from "mobx"
import { observer } from "mobx-react"

var appState = observable({
  timer: 0,

})
appState.increment = function(){
  this.timer ++;
}
appState.decreament = function(){
  this.timer--;
}
appState.resetTimer = function(){
  this.timer = 0;
}

configure({enforceActions: 'observed'})


  class AppState {
    messages = []
    timer = 0

    increment = function(){
        this.timer ++;
    }

    decreament = function(){
        this.timer--;
    }

    resetTimer = function(){
       // this.timer = 0;
        this.getMessages()
        .then(data => {
            runInAction(() =>{
                this.messages = data
            })

        })
    }

    getMessages = () => {
        return (
            new Promise((resolve, reject) =>{
                setTimeout(() => resolve([1,2,2,3]), 3000)
            })
        )
    }

    setMessages = messages => {
        this.messages = messages
    }
}

decorate(AppState, {
    messages: observable,
    timer: observable,
    getMessages: action,
    setMessages: action,

})

export default new AppState()