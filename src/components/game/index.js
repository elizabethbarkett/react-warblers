//GAME: 

import React, { Component } from 'react'
import styles from './game.module.css'
import { CorrectContext } from '../../../pages';
import ImageRow from '../imageRow';


const jsonData = require('../../birds.json');
const loadData = () => JSON.parse(JSON.stringify(jsonData))
export var SelectionContext = React.createContext();

export default class Game extends Component {
    constructor(props) {
        super(props),
        this.state = {
            birds: loadData(),
            birdsArray: [],
            chosenBird: {},
            userSelection: "",
            isCorrect: false,
            userIncorrect: false,
            isMounted: false,
            page: 1
        }
    }

    componentDidMount = () => {
        this.setChosenBird();
    }

    setChosenBird = () => {
        let theChosenOne = this.getRandomBird();
        console.log("Chosen: " + theChosenOne)
        this.setState({chosenBird: theChosenOne}, this.getRandomBirdArray(theChosenOne["img_name"]))
    }

    getRandomBird = () => {
        let bird = this.state.birds[Math.floor(Math.random() * this.state.birds.length)]
        let idx = this.state.birds.indexOf(bird)
        console.log("INDEX: " + idx)
        console.log(bird["img_name"])
        return bird;
    }

    getRandomBirdArray = (chosenBird) => {
        let birdArray = [];
        birdArray.push(chosenBird) //populate the prompted bird
        while (birdArray.length < 4) {
            let b = this.getRandomBird();

            if (birdArray.includes(b["img_name"])) {
                continue;
            } else {
                birdArray.push(b["img_name"])
            }
        }
        console.log(birdArray)
        let shuffledArray = this.shuffle(birdArray)
        this.setState({birdsArray: shuffledArray})
    }

    shuffle(array) {
        //thanks stack overflow https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    isDisabled = () => {
        if (this.state.isCorrect) {
            return true;
        }
    }
    
    encouragingText = () => {
        if (this.state.isCorrect) {
            return "Correct!"
        } else if (this.state.userSelection=="" && !this.state.isCorrect){
            return "Please choose below:"
        } else {
            return "Please try again"
        }
    }

    nextButtonIsDisabled = () => {
        if (this.state.userSelection == "" || !this.state.isCorrect) {
            return true;
        } else {
            return false;
        }
    }

    userPoints = () => {
        if (this.state.userIncorrect) {
            return 0;
        } else {
            return 1;
        }
    }

    render() {
        console.log(loadData())
        return (
            <CorrectContext.Consumer>
                {(context) => (
                    <SelectionContext.Provider value={{
                        state: this.state,
                        handleChange: (setValue, result) => {
                            this.setState({
                            userSelection: setValue,
                            isCorrect: result
                        });
                        if (!result){
                            this.setState({
                                userIncorrect: true
                            })
                        } else if (result && !this.state.userIncorrect) {
                            context.handleChange()
                        }
                        }}}>
                        <div className={styles.container}>
                            <div className={styles.headerFrame}>
                                <h1 className={styles.headerFont}>Select the {this.state.chosenBird["common_name"]}. </h1>
                            </div>
                            <div className={styles.subHeaderFrame}>
                                <h2 className={styles.subHeaderFont}>{this.encouragingText()}</h2>
                            </div>
                            <ImageRow birdsArray={this.state.birdsArray} correctBird={this.state.chosenBird} isDisabled={this.isDisabled()}/>
                            <div className={styles.buttonFrame}>
                                <button className={styles.button} onClick={() => context.nextPage()} hidden={this.nextButtonIsDisabled()}>
                                    <span className={styles.text}>Next</span>
                                </button>
                            </div>
                        </div>
                    </SelectionContext.Provider>
                )}
            </CorrectContext.Consumer>
        )
    }
}

