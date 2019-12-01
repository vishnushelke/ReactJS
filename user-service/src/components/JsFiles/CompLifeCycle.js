import React, { Component } from "react";
import { Button } from "@material-ui/core";

export class CompLifeCycle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "1"
    };
  }

  handelState = () => {
    this.setState({ value: "10" });
    this.props.history.push(
      { pathname: "/comp" },
      { state: { value: this.state.value } }
    );
  };
  render() {
    return (
      <div>
        <Button onClick={this.handelState}>submit</Button>
      </div>
    );
  }
}

export default CompLifeCycle;
