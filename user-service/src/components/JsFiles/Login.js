import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "../CssFiles/LoginStyle.css";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { LoginUser } from "./Service";
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
      email: "",
      password: "",
      isValid:true,
      error: {}
    };
    this.handleValid=this.handleValid.bind(this);
  }
  
  handleValid=()=>{
      
      let error = this.state.error
    let email = this.state.email
    let password = this.state.password
    let isValid=this.state.isValid
    if(email==="")
    {
        isValid='false'
        error["email"]="required"
    }
    if(password==="")
    {
        isValid='false'
        console.log('error in password');
        error["password"]="required"
    }
    this.setState({
        error:error
    })
    return isValid
     
  }
  handleRegister = () => {
    this.props.history.push("/Register");
  };
  submitForget = () => {
    this.props.history.push("/forgetpassword");
  };
  submitLogin = () => {
    if (this.handleValid()===true) {
      let loginDto = {};

      loginDto.email = this.state.email;
      loginDto.password = this.state.password;
      console.log("hi", loginDto);
      LoginUser(loginDto)
        .then(response => {
          console.log(response);
          localStorage.setItem("LoginToken",response.data.data)
          localStorage.setItem("name",response.data.user.firstname+' '+response.data.user.lastname)
          localStorage.setItem("profilePic",response.data.user.profilePicture)
          localStorage.setItem("userId",response.data.user.uid)
          localStorage.setItem("emailId",response.data.user.email)
          this.props.history.push("/dashboard/notes");
        })
        .catch(err => {
          console.log("error");
        });
    }
  };
  handleChangeEmail = event => {
    this.setState({ email: event.target.value });
  };
  handleChangePassword = event => {
    this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
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
            <h3>Sign in</h3>
            <h4>Continue to Fundoo</h4>
          </div>
          <div className="emailLogin">
            <TextField
              required
              id="outlined-required"
              name="email"
              label="Email"
              margin="normal"
              variant="outlined"
              onChange={this.handleChangeEmail}
              // fullWidth
            />
            <span style={{color:"red"}}>{this.state.error.email}</span>
            <br></br>
            {/* </div>
                    <div className="passwordLogin"> */}
            <TextField
              id="outlined-adornment-password"
              // fullWidth
              name="password"
              required
              variant="outlined"
              type={this.state.showPassword ? "text" : "password"}
              label="Password"
              onChange={this.handleChangePassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className="eyeIcon"
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

          <div className="buttons">
            <Button
              variant="contained"
              color="primary"
              onClick={this.submitLogin}
            >
              Login
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.submitForget}
            >
              Forget
            </Button>
          </div>
          <br></br>
          <div className="referenceRegister">
           
            <Button onClick={this.handleRegister}>new user?</Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default Login;
