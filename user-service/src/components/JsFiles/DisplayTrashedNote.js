import React, { Component } from "react";
import { Card, TextField, Tooltip } from "@material-ui/core";
import DeleteForever from "./DeleteForever";
import Masonry from "react-masonry-component";
import EditNote from "./EditNote";
import UntrashNote from "./UntrashNote";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { GetTrashedUserNote } from "./Service";

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

class DisplayTrashedNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      open: false,
      note: {}
    };
  }
  componentDidMount() {
    console.log("trash notes called ");

    this.handelTrashedNotes();
  }
  handelTrashedNotes = () => {
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    GetTrashedUserNote(tokenUserId)
      .then(response => {
        console.log("trashed notes fetched successfully");
        console.log(response.data.data);
        this.setState({
          notes: response.data.data
        });
      })
      .catch(err => {
        console.log("trashed notes fetch fail");
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
                    <div>
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
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        paddingTop: "10px"
                      }}
                    >
                      <DeleteForever
                        note={text}
                        refresh={this.handelTrashedNotes}
                      />
                      <UntrashNote
                        note={text}
                        refresh={this.handelTrashedNotes}
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

export default DisplayTrashedNote;
