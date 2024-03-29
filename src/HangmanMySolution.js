import React, { Component } from "react";
import { randomWord } from "./words"
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { 
      nWrong: 0, 
      guessed: new Set(), 
      answer: randomWord()
    };
    this.handleGuess = this.handleGuess.bind(this);
    this.resetGame = this.resetGame.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={ltr}
      >
        {ltr}
      </button>
    ));
  }

  setAlt() {
    return `${this.state.nWrong} wrong guesses`
  }

  showGame() {
    return <div> 
      <img src={this.props.images[this.state.nWrong]} alt={this.setAlt()} />
      <p className="Hangman-wrong">Number Of Guesses Left: {this.props.maxWrong - this.state.nWrong}</p>
      <p className='Hangman-word'>{this.guessedWord()}</p>
      <p className='Hangman-btns'>{this.generateButtons()}</p>
    </div>
  }

  youLose() {
    return <div>
      <p className="Hangman-text">YOU LOSE!</p> 
      <button className="Hangman-try-again" onClick={this.resetGame}>Play Again?</button>
    </div>
  }

  youWin() {
    return <div>
      <p className="Hangman-text">YOU GOT IT! CONGRATULATIONS.</p> 
      <p className="Hangman-text">The word is: {this.state.answer}</p>
      <button className="Hangman-try-again" onClick={this.resetGame}>Play Again?</button>
    </div>
  }

  resetGame() {
    this.setState({ 
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  checkWord() {
    let completeWord = this.guessedWord()
    let isWinner = this.state.answer === completeWord.join("");
    return isWinner
  }

  /** render: render game */
  render() {
    let hasWon = this.checkWord()
    console.log(this.state.answer)
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        { 
          hasWon ? this.youWin() : this.state.nWrong >= this.props.maxWrong ? this.youLose() : this.showGame()
        }
      </div>
    );
  }
}

export default Hangman;
