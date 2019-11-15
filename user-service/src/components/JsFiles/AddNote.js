import React, { Component } from "react";
import { InputBase, Card } from "@material-ui/core";

class AddNote extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }
  }
  handleAddNote=()=>{
    this.props.props.history.push("/AddNotePopper");
  }
  render() {
    return (
      <div style={{ paddingLeft: "15%" }}>
        <Card>
          <InputBase
            placeholder="take a note"
            style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
          onClick={this.handleAddNote}/>
        </Card>
      </div>
    );
  }
}

export default AddNote;
