import React, { Component } from 'react';
import './App.css';
import Options from './Options';
import shuffle from 'shuffle-array';
import GameOver from './GameOver';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      countries:[{}],
      displayedCountry:{},
      choices:[], 
      selectedGuess:"",
      gameOver:false
    }
    
    this.handleClick = this.handleClick.bind(this);
    this.handleRadioClick = this.handleRadioClick.bind(this);
    this.newGame = this.newGame.bind(this);
    this.shuffleCountries = this.shuffleCountries.bind(this);
  }
  
  componentDidMount(){
    console.log('did mount')
    const allCountries = 'https://restcountries.eu/rest/v2/all';
    
    fetch(allCountries)
      .then(data => data.json())
      .then(data => {
        const countries = [];
        data.forEach(country => {
          const c = {};
          c.name = country.name;
          c.flag = country.flag;
          countries.push(c);
          
        });
        return countries;
      })
      .then(countries => {
        this.setState({countries})
        return countries;
      })
      .then(countries => this.shuffleCountries(countries))
      .then(() => console.log('displayedCountry = ' + this.state.displayedCountry.name));
      
  };
  
  shuffleCountries(countries){
    const randomCountry = Math.floor(Math.random()*Math.floor(this.state.countries.length));
    const displayedCountry = this.state.countries[randomCountry];
    const choices = [displayedCountry]
    
    for(let i=0; i<3; i++){
      const randomCountry = Math.floor(Math.random()*Math.floor(this.state.countries.length));
      choices.push(countries[randomCountry]);
    }
    shuffle(choices);
    
    this.setState({displayedCountry, choices})
  }
  
  handleClick(e) {
    this.setState({gameOver:true});
  }
  
  handleRadioClick(e) {
    this.setState({selectedGuess:e.target.value});
  }
  
  newGame(){
    const allCountries = Object.assign(this.state.countries)
    this.shuffleCountries(allCountries);
    
    this.setState({
      selectedGuess:"",
      gameOver:false
    })
  }
  
  render() {
    const flag = this.state.displayedCountry.flag;
    
    return (
      <div className="App">
        <header>
          Guess the Flag Game
        </header>
        { this.state.gameOver ?
            <GameOver selectedGuess={this.state.selectedGuess} displayedCountry={this.state.displayedCountry.name} newGame={this.newGame} /> :
            <Options choices={this.state.choices} handleClick={this.handleClick} handleRadioClick={this.handleRadioClick} selectedGuess={this.state.selectedGuess} gameOver={this.state.gameOver} />
        }
          

        <div className="flag">
          <img className="flag-img" src={flag} alt={this.state.displayedCountry.name} />  
        </div>
        
        
      </div>
    );
  }
}

export default App;
