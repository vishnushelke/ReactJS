import React, { Component } from "react";
import { InputBase, Card, IconButton } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createState: true
    };
  }
  handleAddNote = () => {
    this.setState({ createState: !this.state.createState });
  };
  render() {
    return (
      <div>
        {this.state.createState ? (
          <div style={{ paddingLeft: "15%" }}>
            <Card>
              <InputBase
                placeholder="take a note"
                style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
                onClick={this.handleAddNote}
              />
            </Card>
          </div>
        ) : (
          <div style={{ paddingLeft: "15%" }}>
            <Card style={{ display: "flex", flexDirection: "column" }}>
              <InputBase
                placeholder="title"
                style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
              />
              <InputBase
                placeholder="take a note"
                style={{ padding: "1%", paddingLeft: "4%", width: "650px" }}
              />
              
              <div
                style={{
                  display: "flex",
                  alignItems: "start",
                  paddingRight: "13px",
                  justifyContent: "space-between"
                }}
              >
                 <div>
                <IconButton label="Reminder">
                  <AddAlertOutlinedIcon />
                </IconButton>
                <IconButton>
                  <PersonAddOutlinedIcon />
                </IconButton>
                <IconButton>
                  <ColorLensOutlinedIcon />
                </IconButton>
                <IconButton>
                  <ImageOutlinedIcon />
                </IconButton>
                <IconButton>
                  <ArchiveOutlinedIcon />
                </IconButton>
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              </div>
                <Button onClick={this.handleAddNote}>Close</Button>
               
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default AddNote;
