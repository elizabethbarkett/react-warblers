//IMAGE ROW

import React, {Component} from 'react';
import BirdCard from '../birdCard';
import styles from './imageRow.module.css'

export default class ImageRow extends Component {

    render() {
        const correctBird = this.props.correctBird["img_name"]
        return (
            <div className={styles.main}>
                <BirdCard birdImg={this.props.birdsArray[0]} correctBird={correctBird} disabled={this.props.isDisabled}/>
                <BirdCard birdImg={this.props.birdsArray[1]} correctBird={correctBird} disabled={this.props.isDisabled}/>
                <BirdCard birdImg={this.props.birdsArray[2]} correctBird={correctBird} disabled={this.props.isDisabled}/>
                <BirdCard birdImg={this.props.birdsArray[3]} correctBird={correctBird} disabled={this.props.isDisabled}/>
            </div>
        )
    }

}