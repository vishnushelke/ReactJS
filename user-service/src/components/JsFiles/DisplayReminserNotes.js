import React, { Component } from "react";
import { Card, TextField, Tooltip } from "@material-ui/core";
import { GetAllNotes, RemoveNoteReminder, GetReminderNotes } from "./Service";
import AddReminder from "./AddReminder";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import Masonry from "react-masonry-component";
import EditNote from "./EditNote";
import AddColor from "./AddColor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import ArchiveNote from "./ArchiveNote";
import MoreIcon from "./MoreIcon";
import Chip from "@material-ui/core/Chip";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
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

class DisplayReminderNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      open: false,
      note: {}
      
    };
  }
  componentDidMount() {
    this.getNotes();
    console.log(this.state.notes,"notes");
  }

  getNotes = () => {
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    GetReminderNotes(tokenUserId)
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
  handelNoteSave = thisnote => {
    this.setState({
      open: false,
      note: thisnote
    });
  };

  handleDelete = note => {
    let noteId = 0;
    noteId = note.noteId;
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    RemoveNoteReminder(noteId, tokenUserId)
      .then(response => {
        console.log(response, "reminder deleted successfully");
      })
      .catch(err => {
        console.log("reminder delete fail");
      });
  };
  render() {

    // let className = sideOpen ? "movementOff" : "movementOn";
    let notes = this.state.notes;
    console.log(notes,"notes");
    

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
                        <Tooltip title="collaborator">
                          <PersonAddOutlinedIcon style={{ width: "20px" }} />
                        </Tooltip>
                        <AddColor note={text} refresh={this.getNotes} />
                        <ArchiveNote note={text} refresh={this.getNotes} />
                        <Tooltip title="more">
                          <MoreIcon note={text} refresh={this.getNotes} />
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

export default DisplayReminderNotes;