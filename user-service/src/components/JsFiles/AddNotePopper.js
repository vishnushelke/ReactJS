import React, { Component } from 'react';
import { InputBase, Card } from "@material-ui/core";

class AddNotePopper extends Component {
  render() {
    return (
      <div style={{ paddingLeft: "15%" }}>
        <Card>
          <InputBase
            placeholder="title"
            style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
          />
          <InputBase
            placeholder="take a note"
            style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
          />
        </Card>
      </div>
    );
  }
}

export default AddNotePopper;
