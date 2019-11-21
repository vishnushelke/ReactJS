import React, { Component } from "react";
import { InputBase, Card, IconButton, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AddUserNote } from "./Service";
import DisplayAllNotes from "./DisplayAllNotes";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createState: true,
      title: "",
      text: ""
    };
  }

  handleAddNote = event => {
    this.clearForm();
    event.preventDefault();
    this.setState({ createState: !this.state.createState });
    this.refreshNotes()
    this.refs.clearTitle.value = "";
    this.refs.clearText.value = "";

    
  };
  refreshNotes=()=>{
    let addNoteDto = {};
    addNoteDto.title = this.state.title;
    addNoteDto.text = this.state.text;
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    AddUserNote(addNoteDto, tokenUserId)
      .then(()=>{console.log("note added successfully")
      this.props.refresh();
    })
      .catch(err => {
        console.log("error in adding note");
      });
  }
  
  handleTextChange = event => {
    this.setState({
      text: event.target.value
    });
  };
  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleTransition = () => {
    this.setState({ createState: !this.state.createState });
  };
  clearForm = () => {
    document.getElementById("addNoteForm").reset();
    this.setState({
      text: "",
      title: ""
    });
  };

  render() {
    return (
      <form id="addNoteForm">
        <div>
          {this.state.createState ? (
            <div style={{ paddingLeft: "15%" }}>
              <Card>
                <InputBase
                  placeholder="take a note"
                  style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
                  ref="clearText"
                  onClick={this.handleTransition}
                />
              </Card>
            </div>
          ) : (
            <div style={{ paddingLeft: "15%" }}>
              <Card style={{ display: "flex", flexDirection: "column" }}>
                <InputBase
                  placeholder="title"
                  name="title"
                  ref="clearTitle"
                  onChange={this.handleTitleChange}
                  style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
                />

                <InputBase
                  placeholder="take a note"
                  name="text"
                  ref="clearText"
                  onChange={this.handleTextChange}
                  style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
                />

                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingTop: "10px"
                  }}
                >
                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-around',width:'300px'}}>
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
                  <Button onClick={this.handleAddNote} refresh={this.refreshNotes}>Close</Button>
                </div>
              </Card>
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default AddNote;
