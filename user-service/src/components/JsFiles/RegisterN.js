import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "../CssFiles/RegisterStyle.css"
import { Link } from "@material-ui/core";
import image from '../profile.png'
import { RegisterUser } from "./Service";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class RegisterN extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: ""
    };
  }
  handleChangeFirstname = event => {
    this.setState({ firstname: event.target.value });
  };
  handleChangeLastname = event => {
    this.setState({ lastname: event.target.value });
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleChangePhonenumber = event => {
    this.setState({ phonenumber: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({
      password: event.target.value
    });
  };
  HandelConfirmPasswordChange = event => {
    this.setState({
      confirmpassword: event.target.value
    });
  };
  PasswordHandler = event => {
    if (this.state.password !== this.state.confirmpassword) {
      console.log("error");
    } else {
      console.log("In service");

      let registerDto = {};

      registerDto.firstname = this.state.firstname;
      registerDto.lastname = this.state.lastname;
      registerDto.email = this.state.email;
      registerDto.phonenumber = this.state.phonenumber;
      registerDto.confirmpassword = this.state.confirmpassword;
      registerDto.password = this.state.password;
      console.log("hi", registerDto);
      RegisterUser(registerDto)
        .then(registerDto => {
          console.log(registerDto);
          this.props.history.push("/VerifyUser");
        })
        .catch(err => {
          console.log("errornew5r");
        });
    }
  };
  LinkLoginHandler = () => {
    this.props.history.push("/Login");
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    return (
      <Card>
        <div className="registerMainDiv">
          <div>
            <h3>
              <span style={{ color: "blue" }}>F</span>
              <span style={{ color: "red" }}>u</span>
              <span style={{ color: "brown" }}>n</span>
              <span style={{ color: "blue" }}>D</span>
              <span style={{ color: "green" }}>o</span>
              <span style={{ color: "red" }}>o</span>
            </h3>
            <h3>Register</h3>
            <h3>Register to Fundoo</h3>
          </div>
          <div>
          <TextField
              required
              id="outlined-required"
              name="firstname"
              label="Firstname"
              margin="dense"
              variant="outlined"
              onChange={this.handleChangeFirstname}
            />
            <TextField
              required
              id="outlined-required"
              label="Lastname"
              margin="dense"
              variant="outlined"
              className="lastname"
              name="lastname"
              onChange={this.handleChangeLastname}
            />
          </div>
          <div >
            <TextField
              required
              id="outlined-required"
              label="Email"
              margin="dense"
              fullWidth
              variant="outlined"
              name="email"
              onChange={this.handleChangeEmail}
            />
            </div>
            <div >
            <div >
              <TextField
                id="outlined-adornment-password"
                name="password"
                required
                margin="dense"
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label="Password"
                onChange={this.handleChangePassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        className="eyeIconRegister"
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </div>
            <div>
              <TextField
                required
                id="outlined-password-input"
                label="Confirm-Password"
                type="password"
                margin="dense"
                variant="outlined"
                name="confirmpassword"
                onChange={this.HandelConfirmPasswordChange}
              />
            </div>
          </div>

          <div >
            <Button
              variant="contained"
              color="primary"
              margin="dense"
              type="submit"
              onClick={this.PasswordHandler}
            >
              Register
            </Button>
          </div>
          <div >
            <Link onClick={this.LinkLoginHandler}>already registered?</Link>
          </div>
        </div>
        <div>
          <img src={image} alt="imageNew" ></img>
        </div>
      </Card>
    );
  }
}

export default RegisterN;
