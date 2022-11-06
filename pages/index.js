import styles from '../styles/Home.module.css'
import ImageRow from '../src/components/imageRow'
import { Component } from 'react'

//const ChosenBirdContext = React.createContext()

export default class Home extends Component {
  render () {
    return (
        <ImageRow/>
    )
  }
}