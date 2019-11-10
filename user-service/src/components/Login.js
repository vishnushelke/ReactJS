import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import './LoginStyle.css'
class Login extends Component {
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
                        <TextField
                            required
                            id="outlined-required"
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            fullWidth
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
                            fullWidth
                        />
                        {/* <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                        >
                                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={70}
                            />
                        </FormControl> */}

                    </div>

                    <div className="buttons">
                        <Button variant="contained" color="primary">Login</Button>
                        <Button variant="contained" color="secondary">Forget</Button>
                    </div>
                    <br></br>
                    <div className="referenceRegister">
                        <a href="">Register</a>
                    </div>

                    {/* <Link href="{forgot.js}"/> */}
                </div>
            </Card>
        );
    }
}

export default Login;
