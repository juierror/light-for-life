import React, { Component } from "react";
import "./App.css";
import microgear from "microgear";

class App extends Component {
  constructor(props) {
    super(props);
    this.gear = microgear.create({
      key: "uBCg2t7fJBwD0nr",
      secret: "F7b6F7IkHT0gfbcnuXUQyAB2N",
      alias: "lfl"
    });
    this.gear.connect("lightforlife");

    this.gear.on("connected", () => {
      console.log("connected . . .");
    });
    // gear2.on("error", err => {
    //   //console.log("Error: " + err);
    //   gear2.connect("lightforlife");
    // });
    this.state = {
      light: 0,
      autolight: 50,
      state: "Manual",
      idState: 0
    };
  }

  sendMicroGear = () => {
    this.gear.chat(
      "nodemcu",
      `${this.state.idState} ${this.state.light} ${this.state.autolight}`
    );
    console.log("Success");
  };

  componentDidMount() {
    document.getElementById("manual").disabled = false;
    document.getElementById("auto").disabled = true;
  }

  render() {
    return (
      <div className="App float-none" id="main">
        <nav className="navbar navbar-dark bg-primary">
          <a className="navbar-brand" href="#">
            <img
              src="L.jpg"
              width="30"
              height="30"
              class="d-inline-block align-top"
              alt=""
            />
            &nbsp;Light For Life
          </a>
        </nav>
        <img
          src="./light.png"
          alt="light"
          style={{ opacity: `${this.state.light / 100}` }}
          width="300"
          height="300"
        />
        <div className="row" id="bottombox">
          <div className="col-6 border border-primary rounded" id="leftbox">
            <br />
            <br />
            <br />
            <h4> State : {this.state.state} </h4>
            <br />
            <h4> Light : {this.state.light} </h4>
            <br />
            <h4> AutoDim : {this.state.autolight} </h4>
            <br />
          </div>
          <div className="col-6 border border-primary rounded" id="rightbox">
            <br />
            <h4>Manual Light</h4>
            <br />
            <input
              className="slider"
              id="manual"
              type="range"
              value={this.state.light}
              min="0"
              max="100"
              onInput={e => {
                this.setState({ light: e.target.value });
                console.log(e.target.value);
                //setTimeout(this.sendValue, 250);
                setTimeout(this.sendMicroGear, 500);
              }}
            />
            <h4>AutoDim Light</h4>
            <br />
            <input
              className="slider"
              id="auto"
              type="range"
              value={this.state.autolight}
              min="0"
              max="100"
              onInput={e => {
                this.setState({ autolight: e.target.value });
                console.log(e.target.value);
                //setTimeout(this.sendValue, 250);
                setTimeout(this.sendMicroGear, 500);
                //this.sendAutoValue();
              }}
            />
            <br />
            <br />
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                console.log("AutoDim");
                this.setState({ state: "AutoDim", idState: 1 });
                //this.sendState(1);
                setTimeout(this.sendMicroGear, 500);
                document.getElementById("manual").disabled = true;
                document.getElementById("auto").disabled = false;
              }}
            >
              Auto Dim
            </button>
            &nbsp;
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                console.log("Manual");
                this.setState({ state: "Manual", idState: 0 });
                //this.sendState(0);
                setTimeout(this.sendMicroGear, 500);
                document.getElementById("manual").disabled = false;
                document.getElementById("auto").disabled = true;
              }}
            >
              Manual
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
