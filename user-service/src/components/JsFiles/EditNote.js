import React, { Component } from "react";
import {
  Dialog,
  TextField,
  Button,
  Tooltip
} from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import { Card} from "@material-ui/core";
import { EditUserNote } from "./Service";
import AddReminder from "./AddReminder";
import AddColor from "./AddColor";
import ArchiveNote from "./ArchiveNote";
import MoreButton from './moreMenuDetails'

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      noteData: "",
      open: false,
      noteColor:''
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      title: nextprops.note.title,
      text: nextprops.note.text,
      noteData: nextprops.note,
      noteColor:nextprops.note.colour
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
    let tokenUserId =localStorage.getItem("LoginToken");
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
        <Dialog open={this.props.open} onClose={this.handleDialogClose}>
          <Card style={{backgroundColor:this.state.noteColor}}>
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
          <div style={{display:'flex',justifyContent:'space-between',paddingLeft:'10px',paddingRight:'10px'}}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
                paddingTop: "10px",
                width:'300px'
              }}
            >
              <AddReminder note={this.props.note} refresh={this.getNotes} />
                        <Tooltip title="collaborator">
                          <PersonAddOutlinedIcon style={{ width: "20px" }} />
                        </Tooltip>
                        <AddColor note={this.props.note} refresh={this.getNotes} />
                        <ArchiveNote note={this.props.note} refresh={this.getNotes} />
                        <Tooltip title="more">
                        <MoreButton noteProps={this.props.note} refresh={this.getNotes} labelArray={this.state.labels} /> 
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
