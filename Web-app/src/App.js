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
    this.state = {
      light: 0,
      autolight: 50,
      state: "Manual",
      idState: 0
    };
  }

  sendMicroGear = () => {
    var str = "";
    str += this.state.idState;

    var light_val = this.state.light.toString();
    while (light_val.length != 3) {
      light_val = "0" + light_val;
    }
    str += light_val;

    var auto_light_val = this.state.autolight.toString();
    while (auto_light_val.length != 3) {
      auto_light_val = "0" + auto_light_val;
    }
    str += auto_light_val;
    this.gear.chat("nodemcu", str);

    console.log(str);
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
              }}
            />
            <br />
            <br />
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                console.log("AutoDim");
                this.setState({ state: "AutoDim", idState: 1 });
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
                document.getElementById("manual").disabled = false;
                document.getElementById("auto").disabled = true;
              }}
            >
              Manual
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button
              className="btn btn-outline-primary"
              onClick={() => {
                console.log("Send");
                this.sendMicroGear();
              }}
            >
              Send
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
