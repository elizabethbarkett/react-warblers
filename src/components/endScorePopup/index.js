import { Component } from "react";
import styles from './endScorePopup.module.css'
import { CorrectContext } from "../../../pages";

export default class EndScorePopup extends Component {
    //Nice Work! | Keep Training!
    //Score:
    //Play Again Button
    //lizbarkett.com website

    getMessage = () => {
        if (this.props.score > 0.5) {
            return "Great Job!"
        } else {
            return "Keep training!"
        }
    }
    render(){
        return (
            <CorrectContext.Consumer>
                {(context) => (
                    <div className={styles.main} style={{display:this.props.isHidden}}>
                    <div className={styles.innerFrame}>
                        <div className={styles.header}>
                            <span className={styles.headerText}>{this.getMessage()}</span>
                            <span className={styles.subHeaderText}>{this.props.score*100}%</span>
                        </div>
                        <div className={styles.playAgainFrame}>
                            <button className={styles.button} onClick={() => context.reset()}>
                                <span className={styles.buttonText}>Play Again</span>
                            </button>
                        </div>
                        <div className={styles.playAgainFrame}>
                            <button className={styles.button}>
                                <a href="https://www.biggestweekinamericanbirding.com/">
                                <span className={styles.buttonText}>Biggest Week in American Birding</span>
                                </a>
                            </button>
                        </div>
                        <div className={styles.playAgainFrame}>
                            <button className={styles.button}>
                                <span className={styles.buttonText}>About Me</span>
                            </button>
                        </div>
                    </div>
                </div>
                )}
            </CorrectContext.Consumer>
        )
    }
}