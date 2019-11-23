import React, { Component } from "react";
import "./App.css";
import HangmanMySolution from "./HangmanMySolution";
import HangmanSolution from "./HangmanSolution";

class App extends Component {
  render() {
    return (
      <div className="App">
        <HangmanMySolution />
        {/* <HangmanSolution /> */}
      </div>
    );
  }
}

export default App;
