import React, { Component } from "react";
import { Tooltip } from "@material-ui/core";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import { ArchiveUserNote } from "./Service";

class ArchiveNote extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       archive:false
    }
  }
  
handleArchiveNote=()=>{
  if(this.props.note){
    let tokenUserId =localStorage.getItem("LoginToken");
    let noteId=this.props.note.noteId
    console.log(noteId);
    
    ArchiveUserNote(noteId,tokenUserId).then(response=>{
        console.log('note archived successfully');
        this.props.refresh();
    }).catch(err=>{
        console.log('note archive unsuccess');
        
    })
  }else{
    this.setState({
      archive:!this.state.archive
    })
    console.log(this.state.archive);    
    this.props.refresh(this.state.archive)
  }
}
  render() {
    return (
      <div>
        <Tooltip title="archive">
          <ArchiveOutlinedIcon style={{ width: "20px" }} onClick={this.handleArchiveNote}/>
        </Tooltip>
      </div>
    );
  }
}

export default ArchiveNote;
