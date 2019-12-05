import React, { Component } from "react";
import { Card, TextField, Tooltip, Chip, Avatar } from "@material-ui/core";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import EditNote from "./EditNote";
import AddColor from "./AddColor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MoreIcon from "./MoreIcon";
import { GetArchivedUserNote } from "./Service";
import UnarchiveNote from "./UnarchiveNote";
import Masonry from "react-masonry-component";
import AddReminder from "./AddReminder";
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
class DisplayArchiveNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      open: false,
      note: {}
    };
  }
  componentDidMount() {
    console.log("Archive notes called ");

    this.handelArchivedNotes();
  }
  handelArchivedNotes = () => {
    let tokenUserId =localStorage.getItem("LoginToken");
    GetArchivedUserNote(tokenUserId)
      .then(response => {
        console.log("archived notes fetched successfully");
        console.log(response.data.data);
        this.setState({
          notes: response.data.data
        });
      })
      .catch(err => {
        console.log("archived notes fetch fail");
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
  render() {
    console.log(this.state.note, "noteupdate");

    let notes = this.state.notes;

    return (
      <form style={{ paddingLeft: "15%" }}>
        <div
          style={{
            display: "flex",
            width: "850px",
            justifyContent: "space-around",
            flexDirection: "column"
          }}
        >
          <MuiThemeProvider theme={theme}>
            <Masonry
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
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
                              onDelete={() =>
                                this.handelRemoveNote(label, text.noteId)
                              }
                              deleteIcon={<ClearOutlinedIcon />}
                            />
                          ))}
                        </div>
                      )}
                      {text.collabUsers && (
                        <div>
                          {text.collabUsers.map(users=>(
                            <Avatar>{users.profilePicture}</Avatar>
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
                      <AddReminder note={text} refresh={this.handelArchivedNotes} />
                      <Tooltip title="collaborator">
                        <PersonAddOutlinedIcon style={{ width: "20px" }} />
                      </Tooltip>
                      <AddColor
                        note={text}
                        refresh={this.handelArchivedNotes}
                      />
                      <UnarchiveNote
                        refresh={this.handelArchivedNotes}
                        note={text}
                      />
                      <MoreIcon
                        note={text}
                        refresh={this.handelArchivedNotes}
                      />
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
          refresh={this.props.refresh}
        />
      </form>
    );
  }
}

export default DisplayArchiveNotes;
