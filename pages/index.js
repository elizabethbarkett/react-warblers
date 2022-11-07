import styles from '../styles/Home.module.css'
import Game from '../src/components/game'
import React, { Component } from 'react'

export const CorrectContext = React.createContext()

export default class Home extends Component {
  constructor(props) {
    super(props),
    this.state = {
      correct: 0
    }
  }

  render () {
    return (
      <CorrectContext.Provider value={{
        state: this.state,
        handleChange: () => this.setState({
            correct: this.state.correct+=1
        })
        }}> 
        <div>
          <div className={styles.grid}>
            <img src="/logo.png" width="150px" height="150px"/>
            <span className={styles.text}>Elizabeth Barkett</span>
          </div>
          <span>{this.state.correct}</span>
          <Game/>
        </div>
        </CorrectContext.Provider>
    )
  }
}