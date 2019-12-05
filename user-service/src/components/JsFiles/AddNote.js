import React, { Component } from "react";
import { InputBase, Card, Tooltip, Chip, Avatar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import AddColor from "./AddColor";
import AddReminder from "./AddReminder";
import UnarchiveNote from "./ArchiveNote";
import MoreIcon from "./MoreIcon";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import { AddUserNote, GetAllNotes } from "./Service";
import AddCollaborator from "./AddCollaborator";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createState: true,
      title: "",
      text: "",
      color: "",
      archive: false,
      trash: false,
      collabUsers: [],
      reminder:''
    };
  }

  handleAddNote = event => {
    this.clearForm();
    event.preventDefault();
    this.setState({
       createState: !this.state.createState ,
       color:'',
       archive: false,
       trash: false,
       collabUsers: [],
       reminder:''
      });
    this.refreshNotes();
    this.refs.clearTitle.value = "";
    this.refs.clearText.value = "";
  };
  refreshNotes = () => {
    let addNoteDto = {};
    addNoteDto.title = this.state.title;
    addNoteDto.text = this.state.text;
    addNoteDto.colour = this.state.color;
    addNoteDto.reminder=this.state.reminder;
    addNoteDto.archive = this.state.archive;
    addNoteDto.collabUsers = this.state.collabUsers;
    console.log(addNoteDto,'addnoteDto');
    
    let tokenUserId = localStorage.getItem("LoginToken");
    AddUserNote(addNoteDto, tokenUserId)
      .then(() => {
        console.log("note added successfully");
        console.log("add note props", this.props);
        let currentState = {
          reminder: false,
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
  handelAddColor = color => {
    this.setState({
      color: color
    });
  };
  handleDelete=()=>{
    this.setState({
      reminder:''
    })
  }
  handelArchive=archive=>{
    this.setState({
      archive:archive
    })
  }
  handelAddReminder = reminder =>{
    this.setState({
      reminder:reminder
    })
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
  getNotes = () => {
    GetAllNotes(localStorage.getItem("LoginToken"));
  };

  render() {
    return (
      <form id="addNoteForm">
        <div>
          {this.state.createState ? (
            <div style={{ paddingLeft: "15%", width: "550px" }}>
              <Card
                style={{
                  borderRadius: "5px",
                  width: "550px"
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
            <div style={{ paddingLeft: "15%", width: "550px" }}>
              <Card
                style={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "10px",
                  width: "550px",
                  backgroundColor:this.state.color
                }}
              >
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
                {this.state.reminder && (
                        <Chip
                        style={{width:'200px'}}
                          size="small"
                          label={this.state.reminder}
                          onDelete={this.handleDelete}
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
                                this.handelRemoveNote(label, this.state.noteId)
                              }
                              deleteIcon={<ClearOutlinedIcon />}
                            />
                          ))}
                        </div>
                      )}
                      {this.state.collabUsers && (
                        <div>
                          {this.state.collabUsers.map(users=>(
                            <Avatar>{users.profilePicture}</Avatar>
                          ))}
                        </div>
                      )}

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
                    <AddReminder refresh={this.handelAddReminder} />
                    <AddCollaborator
                          open={this.state.openCollab}
                          // note={text}
                          closeDialog={this.handleDialogBoxCollab}
                          refresh={this.handelAddCollab}
                        />
                    <AddColor
                      // note={this.state}

                      refresh={this.handelAddColor}
                    />
                    <UnarchiveNote
                      refresh={this.handelArchive}
                      // note={text}
                    />
                    <MoreIcon
                      // note={text}
                      refresh={this.handelArchivedNotes}
                    />
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
