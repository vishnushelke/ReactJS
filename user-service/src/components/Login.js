import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './LoginStyle.css'
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Register from './Register';
import { Link } from '@material-ui/core';
class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showPassword: false,

        }
    }
    handleRegister=()=>{
        this.props.history.push('/Register')
    }
    submitForget=()=>{
        this.props.history.push('/forgetpassword')
    }
    submitLogin=()=>{
        this.props.history.push('/Dashboard')
    }
    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
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
                            <span style={{ color: 'red' }}>F</span>
                            <span style={{ color: 'blue' }}>u</span>
                            <span style={{ color: 'brown' }}>n</span>
                            <span style={{ color: 'pink' }}>D</span>
                            <span style={{ color: 'green' }}>o</span>
                            <span>o</span>
                        </h3>
                        <h3>Sign in</h3>
                        <h4>Continue to Fundoo</h4>
                    </div>
                    <div className="emailLogin">
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                    <div className="passwordLogin">
                        <TextField
                            id="outlined-adornment-password"
                            fullWidth
                            required
                            variant="outlined"
                            type={this.state.showPassword ? 'text' : 'password'}
                            label="Password"
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Toggle password visibility"
                                            onClick={this.handleClickShowPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                    </div>

                    <div className="buttons">
                        <Button variant="contained" color="primary" onClick={this.submitLogin}>Login</Button>
                        <Button variant="contained" color="secondary" onClick={this.submitForget}>Forget</Button>
                    </div>
                    <br></br>
                    <div className="referenceRegister">
                       {/* <Link to={'/register'}></Link> */}
                       <Link onClick={this.handleRegister}>new user?</Link>
                    </div>

                    {/* <Link href="{forgot.js}"/> */}
                </div>
            </Card>
        );
    }
}

export default Login;
