import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.key = "uBCg2t7fJBwD0nr:F7b6F7IkHT0gfbcnuXUQyAB2N";
    this.url = "https://api.netpie.io/topic/lightforlife/test/";
    this.state = {
      light: 0,
      state: "Manual"
    };
    axios
      .put(`${this.url}state?auth=${this.key}&retain`, 0, {
        headers: { "Content-Type": "text/plain" }
      })
      .then(res => {
        console.log(res);
      });
  }

  sendState = state => {
    axios
      .put(`${this.url}state?auth=${this.key}&retain`, state, {
        headers: { "Content-Type": "text/plain" }
      })
      .then(res => {
        console.log(`${this.url}state?auth${this.key}&retain`);
        console.log(res);
      });
  };

  sendValue = value => {
    axios
      .put(`${this.url}value?auth=${this.key}&retain`, this.state.light, {
        headers: { "Content-Type": "text/plain" }
      })
      .then(res => {
        console.log(`${this.url}value?auth${this.key}&retain`);
        console.log(res);
      });
  };

  render() {
    return (
      <div className="App">
        <img
          src="./light.png"
          alt="light"
          style={{ opacity: `${this.state.light / 100}` }}
          width="300"
          height="300"
        />
        <h3> State : {this.state.state} </h3>
        <h3> Light : {this.state.light} </h3>
        <br />
        <input
          id="manual"
          type="range"
          value={this.state.light}
          min="0"
          max="100"
          onInput={e => {
            this.setState({ light: e.target.value });
            this.sendValue(e.target.value);
          }}
        />
        <br />
        <br />
        <button
          onClick={() => {
            console.log("AutoDim");
            this.setState({ state: "AutoDim" });
            this.sendState(1);
            document.getElementById("manual").disabled = true;
          }}
        >
          Auto Dim
        </button>
        &nbsp;
        <button
          onClick={() => {
            console.log("Manual");
            this.setState({ state: "Manual" });
            this.sendState(0);
            document.getElementById("manual").disabled = false;
          }}
        >
          Manual
        </button>
      </div>
    );
  }
}

export default App;
