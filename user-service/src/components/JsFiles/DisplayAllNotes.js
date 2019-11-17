import React, { Component } from "react";
import { Card, DialogContent, Divider } from "@material-ui/core";

class DisplayAllNotes extends Component {
  render() {
    return (
      <form style={{paddingLeft: "15%"}}>
        <div>
          <Card style={{maxWidth:'250px',minHeight:'150px',textAlign:'start'}}>
              <DialogContent>
                  vishnu
              </DialogContent>
              <Divider></Divider>
              <DialogContent>
                  hey vishnu here
              </DialogContent>
          </Card>
        </div>
      </form>
    );
  }
}

export default DisplayAllNotes;
