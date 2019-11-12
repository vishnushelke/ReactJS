import React, { Component } from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";

class VerifyUserToReset extends Component {
  VerifyHandler=()=>{
    this.props.history.push('/ResetPassword')
  }
  render() {
    return (
      <Card className="myCard">
        <div className="mainDiv">
          <div>
            <h3 className="text">
              <span style={{ color: "red" }}>F</span>
              <span style={{ color: "blue" }}>u</span>
              <span style={{ color: "brown" }}>n</span>
              <span style={{ color: "pink" }}>D</span>
              <span style={{ color: "green" }}>o</span>
              <span>o</span>
            </h3>
            <h3>Verify Yourself</h3>
            <h4>Continue to Fundoo</h4>
          </div>
          <div className="emailLoginVerifyToReset">
            <TextField
              required
              id="outlined-required"
              label="Token"
              margin="normal"
              variant="outlined"
              fullWidth
            />
            <h6>Please check your email for a message with your code</h6>
          </div>
          <br></br>
          <div className="buttonVerify">
            <Button
              variant="contained"
              color="primary"
              onClick={this.VerifyHandler}
            >
              Verify
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default VerifyUserToReset;
