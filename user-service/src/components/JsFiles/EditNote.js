import React, { Component } from "react";
import Popper from "popper.js";
import {
  Dialog,
  DialogTitle,
  TextField,
  Button,
  Tooltip
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { EditUserNote } from "./Service";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      text: "",
      noteData: "",
      open: false
    };
  }
  componentWillReceiveProps(nextprops) {
    this.setState({
      title: nextprops.note.title,
      text: nextprops.note.text,
      noteData: nextprops.note
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
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
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
              <Tooltip title="reminder">
                <AddAlertOutlinedIcon style={{ width: "20px" }} />
              </Tooltip>
              <Tooltip title="collaborator">
                <PersonAddOutlinedIcon style={{ width: "20px" }} />
              </Tooltip>
              <Tooltip title="change color">
                <ColorLensOutlinedIcon style={{ width: "20px" }} />
              </Tooltip>
              <Tooltip title="add image">
                <ImageOutlinedIcon style={{ width: "20px" }} />
              </Tooltip>
              <Tooltip title="archive">
                <ArchiveOutlinedIcon style={{ width: "20px" }} />
              </Tooltip>
              <Tooltip title="more">
                <MoreVertIcon style={{ width: "20px" }} />
              </Tooltip>
            </div>
            <div>
            <Button onClick={this.handleDialogClose}>Close</Button>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default EditNote;
