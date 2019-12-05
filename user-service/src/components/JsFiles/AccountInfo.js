import React, { Component } from "react";
import {
  Popper,
  Paper,
  DialogContent,
  Divider,
  IconButton,
  TextField,
  Avatar,
  InputBase,
  ClickAwayListener
} from "@material-ui/core";
import profilePic from "../../Assets/images.jpeg";
import Button from "@material-ui/core/Button";
import Fundoo from "../../Assets/images.jpeg";
import nullProfile from "../../Assets/nullProfile.jpg";
import { UploadUserProfile, GetUserProfile } from "./Service";
const fs = require("fs");

class AccountInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      open: false,
      image: null
    };
  }
  handleAccountInfo = event => {
    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: !this.state.open
    });
  };
  handleSignOut = () => {
    localStorage.removeItem("LoginToken");
    this.props.props.history.push("/");
  };
  handleImageChange = event => {
    this.setState({
      image: event.target.files[0]
    });
  };
  handelUploadImage = () => {
    console.log("into upload image", this.state.image);
    const formData = new FormData();
    formData.append("file", this.state.image);

    localStorage.setItem("profilePic", this.state.image);
    let tokenUserId = localStorage.getItem("LoginToken");
    UploadUserProfile(formData, tokenUserId)
      .then(response => {
        console.log("user profile saved successfully");
        localStorage.setItem("profilePic",response.data.data)
      })
      .catch(err => {
        console.log("profile pic save error");
      });
  };
  componentWillMount() {
    this.getProfile();
  }
  handelClose = () => {
    this.setState({ anchorEl: null });
  };
  getProfile = () => {
    GetUserProfile(localStorage.getItem("LoginToken"))
      .then(response => {
        console.log(
          "profile fetched successfully",
          JSON.stringify(response.data.data)
        );
        this.setState({
          image: response.data.data
        });
      })
      .catch(err => {
        console.log("profile pic fetch fail");
      });
  };

  render() {
    let name = localStorage.getItem("name");
    let email = localStorage.getItem("emailId");
    let profilePic = localStorage.getItem("profilePic");
    let open = this.state.open;
    const id = open ? "scroll-playground" : null;
    return (
      // <ClickAwayListener onClickAway={this.handleAccountInfo}>
      <div
        style={{
          display: "flex",
          justifycontent: "center",
          textAlign: "center"
        }}
      >
        <img
          src={profilePic}
          alt="kjagsS"
          style={{ hight: "50px", width: "50px" }}
          onClick={this.handleAccountInfo}
          // onClose={this.handleAccountInfo}
        ></img>

        <div
          style={{
            display: "flex",
            justifycontent: "center",
            alignContent: "center"
          }}
        >
          <Popper
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            onClose={this.handelClose}
            style={{ display: "flex", justifycontent: "center" }}
          >
            <Paper
              style={{
                margin: "25px",
                alignSelf: "center",
                paddingLeft: "5%",
                paddingRight: "5%",
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                width: "300px",
                paddingBottom: "10%"
              }}
            >
              <img
                src={profilePic}
                alt={nullProfile}
                style={{
                  hight: "100px",
                  width: "100px",
                  display: "flex",
                  alignSelf: "center"
                }}
              ></img>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <InputBase
                  type="file"
                  id="image"
                  accept="image/png, image/jpeg"
                  onChange={this.handleImageChange}
                  InputProps={{ disableUnderline: true }}
                  required
                />
                <Button type="submit" onClick={this.handelUploadImage}>
                  upload
                </Button>
              </div>
              <div>{name}</div>
              <br></br>
              <div>{email}</div>
              <br></br>
              <Divider></Divider>
              <DialogContent style={{ display: "flex", flexDirection: "row" }}>
                <Button onClick={this.handleSignOut} fullWidth>
                  <IconButton style={{ paddingRight: "25px" }}>
                    <svg
                      class="gb_wb"
                      enable-background="new 0 0 24 24"
                      focusable="false"
                      height="20"
                      viewBox="0 0 24 24"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 7c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zm6 5H3v-.99C3.2 16.29 6.3 15 9 15s5.8 1.29 6 2v1zm3-4v-3h-3V9h3V6h2v3h3v2h-3v3h-2z"></path>
                    </svg>
                  </IconButton>
                  Add new account?
                </Button>
              </DialogContent>
              <Divider></Divider>
              <DialogContent>
                <Button onClick={this.handleSignOut}>Sign out</Button>
              </DialogContent>
            </Paper>
          </Popper>
        </div>
      </div>
      // </ClickAwayListener>
    );
  }
}

export default AccountInfo;
