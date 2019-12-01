import React, { Component } from "react";
import { TrashUserNote } from "./Service";
import { Button } from "@material-ui/core";

class TrashNote extends Component {
  handelAddToTrash = () => {
    let noteId = this.props.note.noteId;
    let tokenUserId =localStorage.getItem("LoginToken");
    TrashUserNote(noteId, tokenUserId)
      .then(response => {
        console.log("note trashed successfully");
        this.props.refresh()
        this.props.close()
      })
      .catch(err => {
        console.log("note trash fail");
      });
  };
  render() {
    return (
      <div>
        <Button fullWidth onClick={this.handelAddToTrash} style={{textAlign:'start'}}>
          Delete Note
        </Button>
      </div>
    );
  }
}

export default TrashNote;
