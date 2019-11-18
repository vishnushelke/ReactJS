import React, { Component } from "react";
import { Card, TextField } from "@material-ui/core";
import { GetAllNotes } from "./Service";

class DisplayAllNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: []
    };
  }

  componentWillMount() {
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    GetAllNotes(tokenUserId)
      .then(response => {
        this.setState({
          notes: response.data.data
        });
      })
      .catch(err => {
        console.log("token not matched");
      });
  }
  render() {
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
                  margin: "10px"
                }}
              >
                <TextField
                  value={text.title}
                  InputProps={{ disableUnderline: true }}
                  style={{ paddingLeft: "10px" }}
                />

                <TextField
                  value={text.text}
                  InputProps={{ disableUnderline: true }}
                  style={{ paddingLeft: "10px" }}
                />
              </Card>
            </div>
          ))}
        </div>
      </form>
    );
  }
}

export default DisplayAllNotes;
