import React, { Component } from "react";
import { TrashUserNote } from "./Service";
import { Button, Tooltip } from "@material-ui/core";
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';

class TrashNote extends Component {
  handelRemoveFromTrash = () => {
    let noteId = this.props.note.noteId;
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    TrashUserNote(noteId, tokenUserId)
      .then(response => {
        console.log("note trashed successfully");
        this.props.refresh()
      })
      .catch(err => {
        console.log("note trash fail");
      });
  };
  render() {
    return (
      <div>
        <Tooltip title="Restore">
          <RestoreFromTrashOutlinedIcon style={{ width: "20px" }} onClick={this.handelRemoveFromTrash}/>
        </Tooltip>
      </div>
    );
  }
}

export default TrashNote;
