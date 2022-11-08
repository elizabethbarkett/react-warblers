import React, { Component } from 'react'
import styles from './scoreBox.module.css'


export default class ScoreBox extends Component {
    render() {
        return (
            <div className={styles.box}>
                <div className={styles.header}>
                    <span>Score:</span>
                </div>
                <div>
                    <span>
                        {this.props.score}
                    </span>
                </div>
            </div>
        )
    }
}