import React from 'react';
import logo from './logo.svg';
import './App.css';
import { observer, inject } from 'mobx-react'

class TimerView extends React.Component {
    render() {
        return (
            <div>
              <button onClick={() => this.props.appState.increment()}>Inc</button>
              <button onClick={() => this.props.appState.decreament()}>Dec</button>
              <div>
              {this.props.appState.timer}
              </div>
              <button onClick={this.onReset.bind(this)}>
                Reset
            </button>
            </div>

        )
    }

    onReset() {
        this.props.appState.resetTimer()
    }
  }
const TTT = observer(TimerView)

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
             </a>
             {
               this.props.appState.messages.map(v => <div>
                 {v}
               </div>)
             }
           <TTT appState={this.props.appState}></TTT>

        </header>
      </div>
    );
  }

}

export default inject('appState')(observer(App))
