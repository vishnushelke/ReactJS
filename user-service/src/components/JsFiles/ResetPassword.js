import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";

class ResetPassword extends Component {
    handleResetPassword = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <Card className="forgetPasswordCard">
        <div className="mainDivForgotPassword">
          <h3 className="text">
            <span style={{ color: "red" }}>F</span>
            <span style={{ color: "blue" }}>u</span>
            <span style={{ color: "brown" }}>n</span>
            <span style={{ color: "pink" }}>D</span>
            <span style={{ color: "green" }}>o</span>
            <span>o</span>
          </h3>
          <h4>Reset Password</h4>
          <h4>Continue to Fundoo</h4>
          <TextField
            required
            id="outlined-required"
            label="Enter your New Password"
            margin="normal"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Confirm your New Password"
            margin="normal"
            variant="outlined"
          />
        </div>
        <div className="buttonForgetPassword">
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleResetPassword}
          >
            Submit
          </Button>
        </div>
      </Card>
    );
  }
}

export default ResetPassword;
