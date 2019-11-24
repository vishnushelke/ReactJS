import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";
import { ForeverDeleteUserNote } from "./Service";
class DeleteForever extends Component {
  handelDeleteForever = () => {
    let noteId = this.props.note.noteId;
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    ForeverDeleteUserNote(noteId, tokenUserId)
      .then(response => {
        console.log("note delete success");
      })
      .catch(err => {
        console.log("note delete fail");
      });
  };
  render() {
    return (
      <div>
        <Tooltip title="Delete forever">
          <DeleteForeverOutlinedIcon
            style={{ width: "20px" }}
            onClick={this.handelDeleteForever}
          />
        </Tooltip>
      </div>
    );
  }
}

export default DeleteForever;
