import React, { Component } from 'react';
import './Options.css';

class Options extends Component {
    
    render() {
        const choicesInputs = this.props.choices.map((choice, i) => {
           return( 
               <span>
                   <label key={i} >
                        <input type="radio" name="country" value={choice.name} onClick={this.props.handleRadioClick} checked={this.props.selectedGuess === choice.name} /> {choice.name} 
                    </label>
                </span>
            )
        });
        console.log('choicesInputs');
        console.log(choicesInputs);
        
        if(this.props.gameOver === false){
            return (
            <div className="options">
              <form>
                  {choicesInputs}
                  <button type="button" onClick={this.props.handleClick} >Guess</button>
              </form>
            </div>
            
            )
        } else if (this.props.displayedCountry === this.props.selectedGuess) {
            return (
                <div className='winner'>
                    <span>Congratulations! You guessed correctly!</span>
                    <button type='button'>Play Again</button>
                </div>
            )
        } else {
            return (
                <div className='loser'>
                    <span>Congratulations! You guessed correctly!</span>
                    <button type='button'>Play Again</button>
                </div>
            )
        }
        
    }
}

export default Options;