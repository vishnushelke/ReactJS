import React, { Component } from "react";
import { TrashUserNote } from "./Service";
import { Button } from "@material-ui/core";

class TrashNote extends Component {
  handelAddToTrash = () => {
    let noteId = this.props.note.noteId;
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    TrashUserNote(noteId, tokenUserId)
      .then(response => {
        console.log("note trashed successfully");
      })
      .catch(err => {
        console.log("note trash fail");
      });
  };
  render() {
    return (
      <div>
        <Button fullWidth onClick={this.handelAddToTrash}>
          Delete Note
        </Button>
      </div>
    );
  }
}

export default TrashNote;
