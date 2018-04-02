import React, { Component } from 'react';
import './GameOver.css';

class GameOver extends Component {
    render(){
        console.log('displayedCountry = ' + this.props.displayedCountry);
        console.log(this.props.selectedGuess)
        
        if (this.props.displayedCountry === this.props.selectedGuess) {
            return (
                <div className='winner'>
                    <span>Congratulations! You guessed correctly!</span>
                    <button type='button' onClick={this.props.newGame}>Play Again</button>
                </div>
            )
        } else {
            return (
                <div className='loser'>
                    <span>Sorry. The correct answer was {this.props.displayedCountry}</span>
                    <button type='button' onClick={this.props.newGame}>Play Again</button>
                </div>
            )
        }
    }
}


export default GameOver;