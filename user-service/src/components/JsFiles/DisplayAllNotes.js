import React, { Component } from "react";
import { Card, TextField, Tooltip } from "@material-ui/core";
import {
  GetAllNotes,
  RemoveNoteReminder,
  RemoveNoteFromLabel
} from "./Service";
import AddReminder from "./AddReminder";
import Masonry from "react-masonry-component";
import EditNote from "./EditNote";
import AddColor from "./AddColor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ArchiveNote from "./ArchiveNote";
import Chip from "@material-ui/core/Chip";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import MoreButton from "./moreMenuDetails";
import AddCollaborator from "./AddCollaborator";
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width: "400px"
      }
    },
    MuiInputBase: {
      root: {
        width: "90%"
      }
    }
  }
});

class DisplayAllNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      open: false,
      note: {},
      sideOpen: true,
      labels: [],
      openCollab:false
    };
  }
  componentWillMount() {
    this.getNotes();
    console.log(this.state.sideOpen, "kjsdbkjdb");
  }

  componentWillReceiveProps(newProps) {
    this.getNotes();
    console.log("display notes callled");
    console.log("newProps Recievedddddddddd", newProps);
    let open = newProps.location.state.open;
    let labels = newProps.location.state.labels;
    this.setState({
      sideOpen: open,
      labels: labels
    });
  }

  getNotes = () => {
    let tokenUserId = localStorage.getItem("LoginToken");
    GetAllNotes(tokenUserId)
      .then(response => {
        console.log(response.data.data);
        // this.props.refresh()
        this.setState({
          notes: response.data.data.reverse()
        });
      })
      .catch(err => {
        console.log("token not matched");
      });
  };
  handleEditNote = noteData => {
    this.setState({
      open: true,
      note: noteData
    });
  };
  handleDialogBox = () => {
    this.setState({
      open: false
    });
  };
  handleDialogBoxCollab=()=>{
    this.setState({
      openCollab: false
    });
  }
  handelNoteSave = thisnote => {
    this.setState({
      open: false,
      note: thisnote
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
  render() {
    let sideOpen = this.state.sideOpen;
    console.log(sideOpen, "kjsdbkjdb");

    // let className = sideOpen ? "movementOff" : "movementOn";
    let notes = this.state.notes;

    return (
      <form style={{ alignItems: "center", paddingLeft: "15%" }}>
        <div
          style={{
            // display: "flex",
            width: "850px"
            // justifyContent: "space-around",
            // flexDirection: "column"
          }}
        >
          {/* <div>
            <AddNote refresh={this.getNotes} />
          </div> */}

          <div>
            <MuiThemeProvider theme={theme}>
              <Masonry
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  paddingTop: "5%"
                }}
              >
                {notes.map(text => (
                  <div>
                    <Card
                      style={{
                        maxWidth: "250px",
                        minHeight: "100px",
                        textAlign: "start",
                        margin: "10px",
                        backgroundColor: text.colour,
                        borderRadius: "15px"
                      }}
                    >
                      <div onClick={() => this.handleEditNote(text)}>
                        <TextField
                          multiline
                          disabled
                          value={text.title}
                          InputProps={{ disableUnderline: true }}
                          style={{ paddingLeft: "10px" }}
                        />
                        <TextField
                          multiline
                          disabled
                          value={text.text}
                          InputProps={{ disableUnderline: true }}
                          style={{ paddingLeft: "10px" }}
                        />
                      </div>
                      {text.reminder && (
                        <Chip
                          size="small"
                          label={text.reminder}
                          // onClick={handleClick}
                          onDelete={() => this.handleDelete(text)}
                          deleteIcon={<ClearOutlinedIcon />}
                        />
                      )}
                      {text.labels && (
                        <div>
                          {text.labels.map(label => (
                            <Chip
                              size="small"
                              label={label.name}
                              // onClick={handleClick}
                              onDelete={() =>
                                this.handelRemoveNote(label, text.noteId)
                              }
                              deleteIcon={<ClearOutlinedIcon />}
                            />
                          ))}
                        </div>
                      )}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          paddingTop: "10px"
                        }}
                      >
                        <AddReminder note={text} refresh={this.getNotes} />
                        <AddCollaborator
                          open={this.state.openCollab}
                          note={text}
                          closeDialog={this.handleDialogBoxCollab}
                          refresh={this.getNotes}
                        />
                        <AddColor note={text} refresh={this.getNotes} />
                        <ArchiveNote note={text} refresh={this.getNotes} />
                        <Tooltip title="more">
                          <MoreButton
                            noteProps={text}
                            refresh={this.getNotes}
                            labelArray={this.state.labels}
                          />
                        </Tooltip>
                      </div>
                    </Card>
                  </div>
                ))}
              </Masonry>
            </MuiThemeProvider>
          </div>
          <EditNote
            open={this.state.open}
            note={this.state.note}
            closeDialog={this.handleDialogBox}
            refresh={this.getNotes}
          />
        </div>
      </form>
    );
  }
}

export default DisplayAllNotes;
