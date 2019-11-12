import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './RegisterStyle.css'
import { Link } from '@material-ui/core';
class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            password: '',
            confirmpassword: ''
        }
    }
    PasswordChangeHandler = event => {
        this.setState({
            password: event.target.value
        })
    }
    HandelConfirmPasswordChange = event => {
        this.setState({
            confirmpassword: event.target.value
        })
    }
    PasswordHandler = event => {
        if (this.state.password !== this.state.confirmpassword)
            console.log('error')
            else
            this.props.history.push('/VerifyUser')
    }
    LinkLoginHandler=()=>{
        this.props.history.push('/Login')
    }

    render() {
        const { password, confirmpassword } = this.state
        return (
            <Card className="myRegisterCard">
                <div className="mainRegisterDiv" onSubmit={this.PasswordHandler}>
                    <div>
                        <h3 className="text">
                            <span style={{ color: 'red' }}>F</span>
                            <span style={{ color: 'blue' }}>u</span>
                            <span style={{ color: 'brown' }}>n</span>
                            <span style={{ color: 'pink' }}>D</span>
                            <span style={{ color: 'silver' }}>o</span>
                            <span>o</span>
                        </h3>
                    </div>
                    <div>
                        <h3>Register</h3>
                        <h3>Register to Fundoo</h3>
                    </div>
                    <div className="name">
                        <TextField
                            required
                            id="outlined-required"
                            label="Firstname"
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Lastname"
                            margin="normal"
                            variant="outlined"
                            className="lastname"
                        />
                    </div>
                    <div className="email">
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            variant="outlined"

                        />
                        <TextField
                            id="outlined-required"
                            label="Phone Number"
                            margin="normal"
                            variant="outlined"

                        />

                    </div>
                    <div className="password">
                        <div>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={password}
                                onChange={this.PasswordChangeHandler}
                            />
                        </div>
                        <div>
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Confirm-Password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                                value={confirmpassword}
                                onChange={this.HandelConfirmPasswordChange}
                            />
                        </div>
                    </div>


                    <div className="buttonsRegister">
                        <Button variant="contained" color="primary" type="submit" onClick={this.PasswordHandler}>Register</Button>
                    </div>
                    <br></br>
                    <div className="referenceLogin">
                        <Link onClick={this.LinkLoginHandler}>already registered?</Link>
                    </div>

                </div>
            </Card>
        );
    }
}

export default Register;
