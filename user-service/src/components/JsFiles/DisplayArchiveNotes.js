import React, { Component } from "react";
import { Card, TextField, Tooltip } from "@material-ui/core";

import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";


import EditNote from "./EditNote";
import AddColor from "../AddColor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MoreIcon from './MoreIcon'
import { GetArchivedUserNote } from "./Service";
import UnarchiveNote from "./UnarchiveNote";

const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width: "400px"
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
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
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
            flexWrap: "wrap"
          }}
        >
          <MuiThemeProvider theme={theme}>
            {notes.map(text => (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap"
                }}
              >
                <Card
                  style={{
                    maxWidth: "250px",
                    minHeight: "100px",
                    textAlign: "start",
                    margin: "10px",
                    backgroundColor: text.colour
                  }}
                >
                  <div onClick={() => this.handleEditNote(text)}>
                    <TextField
                      disabled
                      value={text.title}
                      InputProps={{ disableUnderline: true }}
                      style={{ paddingLeft: "10px" }}
                    />

                    <TextField
                      disabled
                      value={text.text}
                      InputProps={{ disableUnderline: true }}
                      style={{ paddingLeft: "10px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingTop: "10px"
                    }}
                  >
                    <Tooltip title="reminder">
                      <AddAlertOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="collaborator">
                      <PersonAddOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <AddColor note={text} refresh={this.handelArchivedNotes} />
                    <Tooltip title="add image">
                      <ImageOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <UnarchiveNote refresh={this.handelArchivedNotes} note={text}/>
                    <MoreIcon note={text} refresh={this.handelArchivedNotes}/>
                  </div>
                </Card>
              </div>
            ))}
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
