import React, { Component } from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import {
  Tooltip,
  Dialog,
  DialogTitle,
  Button,
  DialogContent,
  Avatar,
  InputBase,
  createMuiTheme,
  MuiThemeProvider
} from "@material-ui/core";
import ClearOutlinedIcon from "@material-ui/icons/ClearOutlined";
import DoneIcon from "@material-ui/icons/Done";
import { CollaborateNote, DeleteCollaboration } from "./Service";
import nullPropfile from '../../Assets/nullProfile.jpg'

const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperWidthSm: {
        // width: "700px",
        borderRadius: "10px"
      }
    }
  }
});

class AddCollaborator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      collabedUsers: [],
      collaborate: ""
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
  handelRemoveCollaboration=()=>{
    let noteId = this.props.note.noteId;
    let emailId = this.state.collaborate;
    let tokenUserId = localStorage.getItem("LoginToken");
    DeleteCollaboration(noteId, emailId, tokenUserId)
      .then(response => {
        console.log("note collaborated deleted successfully");
        this.props.refresh()
      })
      .catch(err => {
        console.log("note collaboration delete fail");
      });
  }
  handelCollaborateChange = event => {
    this.setState({
      collaborate: event.target.value
    });
  };
  
  handelCollaborate = () => {
    if(this.props.note){
      let noteId = this.props.note.noteId;
      let emailId = this.state.collaborate;
      let tokenUserId = localStorage.getItem("LoginToken");
      CollaborateNote(noteId, emailId, tokenUserId)
        .then(response => {
          console.log("note collaborated successfully",response);
          this.props.refresh()
          this.setState({
            collabUsers:response.data.data
          })
        })
        .catch(err => {
          console.log("note collaboration fail");
        });
    }else{
      let emailId = this.state.collaborate;
      console.log('dhbjh',emailId);
      this.setState({
        collabedUsers:this.state.collabedUsers.push(emailId)
      })
    }
   
  };

  render() {
   let profilePicture=(this.props.note)? this.props.note.collabUsers.profilePicture:{nullPropfile}
    let collabUser=(this.props.note)? this.props.note.collabUsers:this.state.collabedUsers
   
    return (
      <div>
        <MuiThemeProvider theme={theme}>
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
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <Avatar>{localStorage.getItem("profilePic")}</Avatar>
                  <DialogContent>
                    <span style={{ color: "black" }}>
                      <b>{localStorage.getItem("emailId")}</b>
                    </span>
                    <span
                      style={{
                        color: "black",
                        fontStyle: "italic",
                        fontSize: "12px"
                      }}
                    >
                      (Owner)
                    </span>
                  </DialogContent>
                </div>
                <div style={{ paddingBottom: "10px" }}>
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
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row"
                            }}
                          >
                            <Avatar
                              src={profilePicture}
                              alt="image"
                            ></Avatar>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column"
                              }}
                            >
                              <span
                                style={{
                                  color: "black",
                                  fontSize: "14px",
                                  paddingTop: "10px",
                                  paddingLeft: "25px"
                                }}
                              >
                                <b>{user.firstname + " " + user.lastname}</b>
                              </span>

                              <span
                                style={{
                                  color: "#C1BBBB",
                                  fontSize: "12px",
                                  paddingLeft: "25px"
                                }}
                              >
                                {user.email}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ClearOutlinedIcon style={{ paddingRight: "10px" }} onClick={this.handelRemoveCollaboration}/>
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row"
                  }}
                >
                  <Avatar>
                    <PersonAddOutlinedIcon />
                  </Avatar>
                  <InputBase
                    placeholder="Person or email to share with"
                    style={{ padding: "1%", paddingLeft: "4%", width: "525px" }}
                    ref="clearText"
                    value={this.state.collaborate}
                    onChange={this.handelCollaborateChange}
                  />
                  <DoneIcon onClick={this.handelCollaborate} />
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  backgroundColor: "#CEC7C7",
                  padding: "10px"
                }}
              >
                <Button onClick={this.closeCollab}>Cancel</Button>
                <Button onClick={this.closeCollab}>Close</Button>
              </div>
            </Dialog>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AddCollaborator;
