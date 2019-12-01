import React, { Component } from "react";
import { InputBase, Card, Tooltip } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { AddUserNote, GetAllNotes } from "./Service";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createState: true,
      title: "",
      text: "",
      color:"",
      archive:false,
      trash:false
    };
  }

  handleAddNote = event => {
    this.clearForm();
    event.preventDefault();
    this.setState({ createState: !this.state.createState });
    this.refreshNotes();
    this.refs.clearTitle.value = "";
    this.refs.clearText.value = "";
  };
  refreshNotes = () => {
    let addNoteDto = {};
    addNoteDto.title = this.state.title;
    addNoteDto.text = this.state.text;
    addNoteDto.color = this.state.color;
    let tokenUserId =localStorage.getItem("LoginToken");
    AddUserNote(addNoteDto, tokenUserId)
      .then(() => {
        console.log("note added successfully");
        console.log('add note props' , this.props);
        let currentState = {
          reminder:false,
          allNote: true,
          archiveNote: false,
          trashNote: false,
          label: false,
          name: null,
          labelId: 0
        };
        this.props.refresh(currentState);
        
      })
      .catch(err => {
        console.log("error in adding note");
      });
  };

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
  getNotes=()=>{
    GetAllNotes(localStorage.getItem("LoginToken"))
  }

  render() {
    return (
      <form id="addNoteForm">
        <div>
          {this.state.createState ? (
            <div style={{ paddingLeft: "15%",width: "550px" }}>
              <Card
                style={{
                  borderRadius: "5px",width: "550px"
                }}
              >
                <InputBase
                  placeholder="take a note"
                  style={{ padding: "1%", paddingLeft: "4%", width: "550px" }}
                  ref="clearText"
                  onClick={this.handleTransition}
                />
              </Card>
            </div>
          ) : (
            <div style={{ paddingLeft: "15%",width: "550px" }}>
              <Card style={{ display: "flex", flexDirection: "column", borderRadius: "10px",width: "550px" }}>
                <InputBase
                  placeholder="title"
                  name="title"
                  ref="clearTitle"
                  onChange={this.handleTitleChange}
                  style={{ padding: "1%", paddingLeft: "4%", width: "550px" }}
                />

                <InputBase
                  placeholder="take a note"
                  name="text"
                  ref="clearText"
                  onChange={this.handleTextChange}
                  style={{ padding: "1%", paddingLeft: "4%", width: "550px" }}
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      width: "300px"
                    }}
                  >
                    <Tooltip title="reminder">
                      <AddAlertOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="collaborator">
                      <PersonAddOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="change color" refresh={this.refreshNotes}>
                      <ColorLensOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="archive">
                      <ArchiveOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="more">
                      <MoreVertIcon style={{ width: "20px" }} />
                    </Tooltip>
                  </div>
                  <Button
                    onClick={this.handleAddNote}
                    refresh={this.refreshNotes}
                  >
                    Close
                  </Button>
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
