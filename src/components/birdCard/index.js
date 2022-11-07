import { Component } from 'react';
import styles from './birdCard.module.css'
import { SelectionContext } from '../game';
import { CorrectContext } from '../../../pages';

export default class BirdCard extends Component {
    constructor(props) {
        super(props),
        this.state = {
            isCorrect: false,
            userHasSelected: false
        }
    }

    setCSS = () => {
        if (!this.state.userHasSelected) {
            return styles.card
        } else if (this.state.isCorrect) {
            return styles.correctCard
        } else if (this.state.userHasSelected && !this.state.isCorrect){
            return styles.wrongCard
        }
    }

    render() {
        return(
            <SelectionContext.Consumer>
            {(context) => (
                <button className={this.setCSS()} value={this.props.birdImg} disabled={this.props.disabled} onClick={
                    () => {context.handleChange(this.props.birdImg, (this.props.correctBird === this.props.birdImg)); 
                    this.setState({isCorrect: (this.props.correctBird === this.props.birdImg), userHasSelected: true})}}>
                    <img
                    src={'/'+this.props.birdImg+'.jpeg'}
                    style={{width: "250px", maxHeight: "300px"}}/>
                </button>
            )}
        </SelectionContext.Consumer>
        );
    }
}