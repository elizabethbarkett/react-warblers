import React, { Component } from 'react'
import styles from '../styles/Home.module.css'
import Game from '../src/components/game'
import ScoreBox from '../src/components/scoreBox'
import EndScorePopup from '../src/components/endScorePopup'

export const CorrectContext = React.createContext()

export default class Home extends Component {
  constructor(props) {
    super(props),
    this.state = {
      correct: 0,
      page: 1
    }
  }

  isPopupHidden = () => {
    if (this.state.page >= 11) {
      return "flex"
    } else {
      return "none"
    }
  }

  render () {
    return (
      <CorrectContext.Provider value={{
        state: this.state,
        handleChange: () => this.setState({
            correct: this.state.correct+1
        }),
        nextPage: () => this.setState({
            page: this.state.page+1
        }),
        reset: () => this.setState({
          page: 1,
          correct: 0
        })
        }}> 
        <div>
            <EndScorePopup score={this.state.correct/(this.state.page-1)} isHidden={this.isPopupHidden()}/>
            <div className={styles.grid}>
              <img src="/logo.png" style={{width:"150px", height:"150px"}} alt=""/>
              <span className={styles.text}>Elizabeth Barkett</span>
              <ScoreBox score={this.state.correct}/>
            </div>
          <Game key={this.state.page}/>
        </div>
        </CorrectContext.Provider>
    )
  }
}