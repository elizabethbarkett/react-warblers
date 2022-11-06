import { Component } from 'react'
import BirdCard from '../birdCard';
import styles from './imageRow.module.css'

const jsonData = require('../../birds.json');
const loadData = () => JSON.parse(JSON.stringify(jsonData))

function shuffle(array) {
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

export default class ImageRow extends Component {
    constructor(props) {
        super(props),
        this.state = {
            birds: loadData(),
            birdsArray: [],
            chosenBird: {},
            isMounted: false
        }
    }

    componentDidMount = () => {
        this.setChosenBird();
        //this.getRandomBirdArray();
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
        let shuffledArray = shuffle(birdArray)
        this.setState({birdsArray: shuffledArray})
    }

    render() {
        console.log(loadData())
        return (
            <div className={styles.container}>
                <div className={styles.headerFrame}>
                    <span className={styles.headerFont}>{this.state.chosenBird["common_name"]}</span>
                </div>
                <div className={styles.main}>
                    <BirdCard bird={this.state.birdsArray[0]}/>
                    <BirdCard bird={this.state.birdsArray[1]}/>
                    <BirdCard bird={this.state.birdsArray[2]}/>
                    <BirdCard bird={this.state.birdsArray[3]}/>
                </div>
            </div>
        )
    }
}

