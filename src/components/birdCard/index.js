import { Component } from 'react';
import styles from './birdCard.module.css'

export default class BirdCard extends Component {

    render() {
        return(
            <div className={styles.card}>
                <img
                src={'/'+this.props.bird+'.jpeg'}
                style={{width: "250px", maxHeight: "300px"}}/>
            </div>
        );
    }
}