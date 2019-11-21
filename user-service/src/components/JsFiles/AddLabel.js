import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { AddUserLabel } from "./Service";
import "../CssFiles/Dashboard.css";
class AddLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      labelName: "",
      error: {},
      labels: []
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      labels: newProps.labels
    });
  }
  handleAddLbel = () => {
    console.log(this.state.open, " open");

    this.setState({
      open: true
    });
    // console.log(this.state.open);
  };
  handleCloseDialog = () => {
    console.log("close button response", this.state.open);

    this.setState({
      open: false
    });
  };
  handelLabelName = event => {
    this.setState({
      labelName: event.target.value
    });
  };
  handelAddLabel = () => {
    let addLabelDto = {};
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    addLabelDto.name = this.state.labelName;

    console.log(addLabelDto, tokenUserId);

    AddUserLabel(addLabelDto, tokenUserId)
      .then(response => {
        console.log("into add label result");
        console.log(response);
        this.props.refresh();
      })
      .catch(err => {
        console.log("error while creating label");
        this.setState({
          error: err
        });
      });
  };

  render() {
    let open = this.state.open;
    return (
      <div>
        <ListItem button key="Editlabels" onClick={this.handleAddLbel}>
          <ListItemIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="gb_Tc"
            >
              <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Edit labels" />
        </ListItem>
        <div
          style={{ display: "flex", alignContent: "center", padding: "10px" }}
        >
          <Dialog
            open={open}
            onClose={this.handleAddLbel}
            style={{
              width: "550px",
              paddingBottom: "50px"
              // paddingLeft: "10px"
            }}
          >
            <DialogTitle>Edit Labels</DialogTitle>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <TextField
                placeholder="Create new Label"
                onChange={this.handelLabelName}
                fullWidth
                name="labelName"
                style={{ paddingLeft: "10px" }}
              ></TextField>
              <CheckIcon
                onClick={this.handelAddLabel}
                style={{ paddingRight: "10px" }}
              />
              <br></br>
            </div>
            <div className="LabelAlign">
              {this.state.labels.map((text,index)=>(
                <TextField defaultValue={text.name} />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingRight: "10px",
                paddingBottom: "10px",
                paddingTop: "10px"
              }}
            >
              <Button onClick={this.handleCloseDialog} style={{ width: "10%" }}>
                Close
              </Button>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default AddLabel;
