import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "../CssFiles/RegisterStyle.css";

import { RegisterUser } from "./Service";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      password: "",
      confirmpassword: "",
      firstname: "",
      lastname: "",
      email: "",
      phonenumber: "",
      isValid: true,
      error: {}
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
  handleValidation=(event)=>{

    
    let email=this.state.email
    let password=this.state.password
    let firstname=this.state.firstname
    let lastname = this.state.lastname
    let isValid = this.state.isValid
    let error = this.state.error
     

    if(email===""){
      console.log('email is null');
      error["email"]="required"
      isValid=false
    }
    if(password==="")
    {
      console.log('password is null')
      error["password"]="required"
      isValid=false
    }
    if(firstname==="")
    {
      console.log('firstname is null')
      error["firstname"]="required"
      isValid=false
    }
    if(lastname===""){
      console.log('lastname is null')
      error["lastname"]="required"
      isValid=false
    }
    this.setState({
        error:error
    })
    return isValid
  }
  PasswordHandler = (event) => {
    event.preventDefault();
    // this.state.firstname="";
   
    
      console.log("In service");
      if (this.handleValidation() === true) {
        let error=this.state.error
        event.preventDefault();
        if (this.state.password !== this.state.confirmpassword) {
          console.log("error");
          error["confirmpassword"]="both passwords must be same"
        } else {
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
            this.props.history.push("/");
          })
          .catch(err => {
            console.log("errornew5r");
          });
      }
    }
  };
  LinkLoginHandler = () => {
    this.props.history.push("/");
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    return (
      <div className="registerMainDiv">
        <Card className="card">
          <div className="userInputs">
            <div className="headers">
              <h2>
                <span style={{ color: "blue" }}>
                  <b>F</b>
                </span>
                <span style={{ color: "red" }}>
                  <b>u</b>
                </span>
                <span style={{ color: "brown" }}>
                  <b>n</b>
                </span>
                <span style={{ color: "blue" }}>
                  <b>d</b>
                </span>
                <span style={{ color: "green" }}>
                  <b>o</b>
                </span>
                <span style={{ color: "red" }}>
                  <b>o</b>
                </span>
              </h2>
              Register to Fundoo
            </div>
            <div className="name">
              <div className="firstname">
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  name="firstname"
                  label="Firstname"
                  margin="dense"
                  variant="outlined"
                  onChange={this.handleChangeFirstname}
                />
                <span style={{color:"red"}}>{this.state.error.firstname}</span>
              </div>
              <div className="lastname">
                <TextField
                  required
                  fullWidth
                  id="outlined-required"
                  label="Lastname"
                  margin="dense"
                  variant="outlined"
                  name="lastname"
                  onChange={this.handleChangeLastname}
                />
                 <span style={{color:"red"}}>{this.state.error.lastname}</span>
              </div>
            </div>
            <div className="email">
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
                <span style={{color:"red"}}>{this.state.error.email}</span>
            </div>
            <div className="password">
              <div className="passwordEye">
                <TextField
                  id="outlined-adornment-password"
                  name="password"
                  fullWidth
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
                  <span style={{color:"red"}}>{this.state.error.password}</span>
              </div>
              <div className="passwordWithoutEye">
                <TextField
                  required
                  fullWidth
                  id="outlined-password-input"
                  label="Confirm-Password"
                  type="password"
                  margin="dense"
                  variant="outlined"
                  name="confirmpassword"
                  onChange={this.HandelConfirmPasswordChange}
                />
                 <span style={{color:"red"}}>{this.state.error.confirmpassword}</span>
              </div>
            </div>

            <div className="registerButton">
              <Button
                variant="contained"
                fullWidth
                className="button"
                color="primary"
                margin="dense"
                type="submit"
                onClick={this.PasswordHandler}
              >
                Register
              </Button>
              <Button
                className="link"
                fullWidth
                onClick={this.LinkLoginHandler}
              >
                already registered?
              </Button>
            </div>
            <div></div>
          </div>
          <div className="image">
            <img
              src={require('../../Assets/profile.png')}
              alt="imageNew"
              style={{ height: "150px", width: "150px" }}
            ></img>
            <br />
            <p>One account. All of Fundoo working for you.</p>
          </div>
        </Card>
      </div>
    );
  }
}

export default Register;
