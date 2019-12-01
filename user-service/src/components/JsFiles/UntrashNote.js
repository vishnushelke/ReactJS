import React, { Component } from "react";
import { TrashUserNote } from "./Service";
import { Tooltip } from "@material-ui/core";
import RestoreFromTrashOutlinedIcon from '@material-ui/icons/RestoreFromTrashOutlined';

class TrashNote extends Component {
  handelRemoveFromTrash = () => {
    let noteId = this.props.note.noteId;
    let tokenUserId =localStorage.getItem("LoginToken");
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
