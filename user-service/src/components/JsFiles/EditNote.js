import React, { Component } from "react";
import {
  Dialog,
  TextField,
  Button,
  Tooltip,
  Chip,
  Avatar
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import { Card } from "@material-ui/core";
import {
  EditUserNote,
  RemoveNoteReminder,
  RemoveNoteFromLabel
} from "./Service";
import AddReminder from "./AddReminder";
import AddColor from "./AddColor";
import ArchiveNote from "./ArchiveNote";
import MoreButton from "./moreMenuDetails";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import AddCollaborator from "./AddCollaborator";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      noteData: "",
      open: false,
      noteColor: "",
      archive: false,
      trash: false,
      collabUsers: [],
      reminder: "",
      labels: []
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      title: nextprops.note.title,
      text: nextprops.note.text,
      noteData: nextprops.note,
      noteColor: nextprops.note.colour,
      archive: nextprops.note.archive,
      trash: nextprops.note.trash,
      collabUsers: nextprops.note.collabUsers,
      reminder: nextprops.note.reminder,
      labels: nextprops.note.labels
    });
  }
  handelAddCollab = collab => {
    this.setState({
      collabUsers: this.state.collabUsers.push(collab)
    });
  };
  handelAddColor = color => {
    this.setState({
      noteColor: color
    });
  };
  handelAddReminder = reminder => {
    this.setState({
      reminder: reminder
    });
  };
  handelArchive=archive=>{
    this.setState({
      archive:archive
    })
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
      title: this.state.title,
      colour: this.state.noteColor,
      trash: this.state.trash,
      archive: this.state.archive,
      reminder: this.state.reminder,
      labels: this.state.labels,
      collabUsers: this.state.collabUsers
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
    let tokenUserId = localStorage.getItem("LoginToken");
    RemoveNoteReminder(noteId, tokenUserId)
      .then(response => {
        console.log(response, "reminder deleted successfully");
        this.getNotes();
      })
      .catch(err => {
        console.log("reminder delete fail");
      });
  };
  handelRemoveNote = (labelObject, noteId) => {
    let labelId = labelObject.labelId;
    let tokenUserId = localStorage.getItem("LoginToken");
    RemoveNoteFromLabel(noteId, labelId, tokenUserId)
      .then(response => {
        this.getNotes();
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    let collabUsers=this.state.collabUsers
    console.log(this.state.text);

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "400px",
          backgroundColor: this.state.noteColor
        }}
      >
        <Dialog open={this.props.open} onClose={this.handleDialogClose}>
          <Card
            style={{
              backgroundColor: this.state.noteColor,
              // borderRadius: "15px",
              width: "400px"
            }}
          >
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
            <br></br>
            {this.state.reminder && (
              <Chip
                size="small"
                label={this.state.reminder}
                onDelete={() => this.handleDelete(this.props.note)}
                deleteIcon={<ClearOutlinedIcon />}
              />
            )}
            {this.state.labels && (
              <div>
                {this.state.labels.map(label => (
                  <Chip
                    size="small"
                    label={label.name}
                    onDelete={() =>
                      this.handelRemoveNote(label, this.props.note.noteId)
                    }
                    deleteIcon={<ClearOutlinedIcon />}
                  />
                ))}
              </div>
            )}
            {this.state.collabUsers && (
              <div>
                {this.state.collabUsers.map(users => (
                  <Avatar>{users.profilePicture}</Avatar>
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
                  refresh={this.handelAddReminder}
                  close={this.props.closeDialog}
                />
                <AddCollaborator
                  open={this.state.openCollab}
                  note={this.props.note}
                  closeDialog={this.handleDialogBoxCollab}
                  refresh={this.handelAddCollab}
                  close={this.props.closeDialog}
                />
                <AddColor refresh={this.handelAddColor} />
                <ArchiveNote
                  // note={this.props.note}
                  refresh={this.handelArchive}
                />
                <Tooltip title="more">
                  <MoreButton
                    noteProps={this.props.note}
                    refresh={this.props.refresh}
                    labelArray={this.state.labels}
                    close={this.props.closeDialog}
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
