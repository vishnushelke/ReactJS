import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import { ResetUserPassword } from "./Service";

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confpassword: "",
      err: {}
    };
  }
  handelConfPasswordChange = event => {
    this.setState({
      confpassword: event.target.value
    });
  };
  handelPasswordChange = event => {
    this.setState({
      password: event.target.value
    });
  };

  handleResetPassword = () => {
    let password = this.state.password;
    let confpassword = this.state.confpassword;
    let resetPasswordDto = {};
    resetPasswordDto.password = password;
    let token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    let err = this.state.err;
    if (password !== confpassword) {
      err["password"] = "both password should be same";
      console.log("both password not same");
    } else {
      console.log("password matched");
      ResetUserPassword(resetPasswordDto, token)
        .then(response => {
          console.log("password set successfully");
          this.props.history.push("/");
        })
        .catch(err => {
          console.log("password reset fail");
        });
    }
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
            name="password"
            onChange={this.handelPasswordChange}
          />
        </div>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Confirm your New Password"
            margin="normal"
            variant="outlined"
            name="confpassword"
            onChange={this.handelConfPasswordChange}
          />
          <span style={{ color: "red" }}>{this.state.err.confpassword}</span>
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
