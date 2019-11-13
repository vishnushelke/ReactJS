import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import "../CssFiles/VerifyUser.css";
import { ValidateUser } from "./Service";

class VerifyUser extends Component {
  VerifyHandler = () => {
    let token = this.props.match.params.token;
    ValidateUser(token).then(respose => {
      console.log(respose);
      this.props.history.push("/Login");
    }).catch(err=>{
      console.log('token not matched')
    });
    
  };

  render() {
    return (
      <Card className="myCard">
        <div className="mainDiv">
          <div>
            <h2 className="text">
              <span style={{ color: "red" }}>F</span>
              <span style={{ color: "blue" }}>u</span>
              <span style={{ color: "brown" }}>n</span>
              <span style={{ color: "pink" }}>D</span>
              <span style={{ color: "green" }}>o</span>
              <span>o</span>
            </h2>
            <h4>Verify Yourself</h4>
            <h4>Continue to Fundoo</h4>
          </div>

          <div className="buttonVerify">
            <Button
              variant="contained"
              color="primary"
              onClick={this.VerifyHandler}
            >
              Verify
            </Button>
          </div>
        </div>
      </Card>
    );
  }
}

export default VerifyUser;
