import React, { Component } from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import {
  Tooltip,
  Dialog,
  DialogTitle,
  Button,
  DialogContent
} from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";

class AddCollaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      collabedUsers: []
    };
  }
  openPopper = () => {
    this.setState({
      open: !this.state.open
    });
  };
  closeCollab = () => {
    this.setState({
      open: false
    });
  };

  render() {
    console.log(this.props.note.collabUsers);
    let collabUser = this.props.note.collabUsers;
    return (
      <div>
        <div>
          <Tooltip title="Add collaborator">
            <PersonAddOutlinedIcon
              style={{ width: "20px" }}
              onClick={this.openPopper}
            />
          </Tooltip>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Dialog open={this.state.open}>
            <DialogTitle>Collaborators</DialogTitle>
            <div>
              <DialogContent>
                <span style={{ color: "black" }}>
                  {localStorage.getItem("emailId")}
                </span>
                <span style={{ color: "red" }}>(owner)</span>
              </DialogContent>
              {collabUser.map(user => (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between"
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column"
                      }}
                    >
                      <span style={{ color: "black",fontSize:'14px' }}>
                        <b>{user.firstname + " " + user.lastname}</b>
                      </span>
                      <span style={{ color: "#C1BBBB", fontSize:'12px'}}>
                        {user.email}
                      </span>
                    </div>
                    <ClearOutlinedIcon />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button onClick={this.closeCollab}>Close</Button>
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default AddCollaborator;
