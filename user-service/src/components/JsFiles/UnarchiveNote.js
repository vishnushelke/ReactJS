import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import UnarchiveOutlinedIcon from '@material-ui/icons/UnarchiveOutlined';
import { ArchiveUserNote } from "./Service";

class UnarchiveNote extends Component {
handleArchiveNote=()=>{
    let tokenUserId='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34'
    let noteId=this.props.note.noteId
    console.log(noteId);
    
    ArchiveUserNote(noteId,tokenUserId).then(response=>{
        console.log('note archived successfully');
        this.props.refresh();
    }).catch(err=>{
        console.log('note archive unsuccess');
        
    })
}
  render() {
    return (
      <div>
        <Tooltip title="Unarchive">
          <UnarchiveOutlinedIcon style={{ width: "20px" }} onClick={this.handleArchiveNote}/>
        </Tooltip>
      </div>
    );
  }
}

export default UnarchiveNote;
