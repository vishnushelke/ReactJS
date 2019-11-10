import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

export class ForgetPassword extends Component {
    render() {
        return (
            <Card className="forgetPasswordCard">
                <div>
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
                    <Button variant="contained" color="primary">Submit</Button>
                </div>
            </Card>

        );
    }
}

export default ForgetPassword;
