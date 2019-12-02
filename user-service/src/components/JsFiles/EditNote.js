import React, { Component } from "react";
import { Dialog, TextField, Button, Tooltip, Chip } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import { Card } from "@material-ui/core";
import { EditUserNote, RemoveNoteReminder, RemoveNoteFromLabel } from "./Service";
import AddReminder from "./AddReminder";
import AddColor from "./AddColor";
import ArchiveNote from "./ArchiveNote";
import MoreButton from "./moreMenuDetails";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

class  EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      noteData: "",
      open: false,
      noteColor: ""
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      title: nextprops.note.title,
      text: nextprops.note.text,
      noteData: nextprops.note,
      noteColor: nextprops.note.colour
    });
  }
  handleTitle = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleText = event => {
    this.setState({
      text: event.target.value
    });
  };
  handleDialogClose = () => {
    let note = {
      text: this.state.text,
      title: this.state.title
    };
    let tokenUserId = localStorage.getItem("LoginToken");
    let noteId = this.state.noteData.noteId;
    console.log(noteId);

    EditUserNote(note, tokenUserId, noteId)
      .then(response => {
        console.log("note edited successfully");
        this.props.refresh();
      })
      .catch(err => {
        console.log("note edit fail");
      });
    this.props.closeDialog();
  };
  handleDelete = note => {
    let noteId = 0;
    noteId = note.noteId;
    let tokenUserId =localStorage.getItem("LoginToken");
    RemoveNoteReminder(noteId, tokenUserId)
      .then(response => {
        console.log(response, "reminder deleted successfully");
        this.getNotes()
      })
      .catch(err => {
        console.log("reminder delete fail");
      });
  };
  handelRemoveNote=(labelObject,noteId)=>{
    let labelId= labelObject.labelId
    let tokenUserId = localStorage.getItem("LoginToken")
    RemoveNoteFromLabel(noteId,labelId,tokenUserId).then(response=>{
      this.getNotes()
    }).catch(err => {
      console.log(err);
    });
}
  render() {
    console.log(this.state.text);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "400px"
        }}
      >
        <Dialog open={this.props.open} onClose={this.handleDialogClose} >
          <Card style={{ backgroundColor: this.state.noteColor}}>
            <TextField
              style={{ paddingLeft: "20px" }}
              defaultValue={this.state.title}
              InputProps={{ disableUnderline: true }}
              onChange={this.handleTitle}
              multiline
            >
              {this.state.title}
            </TextField>
            <TextField
              style={{ paddingLeft: "20px" }}
              defaultValue={this.state.text}
              InputProps={{ disableUnderline: true }}
              onChange={this.handleText}
              multiline
            >
              {this.state.text}
            </TextField>
            {this.props.note.reminder && (
                        <Chip
                          size="small"
                          label={this.props.note.reminder}
                          // onClick={handleClick}
                          onDelete={() => this.handleDelete(this.props.note)}
                          deleteIcon={<ClearOutlinedIcon />}
                        />
                      )}
                      {this.props.note.labels && (
                        <div>
                        {this.props.note.labels.map(label=>(
                          <Chip
                          size="small"
                          label={label.name}
                          // onClick={handleClick}
                          onDelete={() => this.handelRemoveNote(label,this.props.note.noteId)}
                          deleteIcon={<ClearOutlinedIcon />}
                        />
                        ))}
                         </div>
                      )}
                        
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingLeft: "10px",
                paddingRight: "10px"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-around",
                  paddingTop: "10px",
                  width: "300px"
                }}
              >
                <AddReminder
                  note={this.props.note}
                  refresh={this.props.refresh}
                />
                <Tooltip title="collaborator">
                  <PersonAddOutlinedIcon style={{ width: "20px" }} />
                </Tooltip>
                <AddColor note={this.props.note} refresh={this.props.refresh} />
                <ArchiveNote
                  note={this.props.note}
                  refresh={this.props.refresh}
                />
                <Tooltip title="more">
                  <MoreButton
                    noteProps={this.props.note}
                    refresh={this.props.refresh}
                    labelArray={this.state.labels}
                  />
                </Tooltip>
              </div>
              <div>
                <Button onClick={this.handleDialogClose}>Close</Button>
              </div>
            </div>
          </Card>
        </Dialog>
      </div>
    );
  }
}

export default EditNote;
