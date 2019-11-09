import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import './LoginStyle.css'
class Login extends Component {
    render() {
        return (
            <Card className="myCard">
                <div className="mainDiv">
                    <div>
                        <h3 className="text">
                            <span style={{color:'red'}}>F</span>
                            <span style={{color:'blue'}}>u</span>
                            <span style={{color:'brown'}}>N</span>
                            <span style={{color:'pink'}}>d</span>
                            <span style={{color:'silver'}}>O</span>
                            <span>o</span>
                            <span style={{color:'indigo'}}>A</span>
                            <span style={{color:'skyblue'}}>p</span>
                            <span style={{color:'green'}}>P</span>
                        </h3>
                        <TextField
                            required
                            id="outlined-required"
                            label="Username"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                        />
                    </div>

                    <div className="buttons">
                        <Button variant="contained" color="primary">Login</Button>
                        <Button variant="contained" color="secondary">Forget</Button>
                    </div>
                </div>
            </Card>


        );
    }
}

export default Login;
