import React, { Component } from "react";
import {
  IconButton,
  Drawer,
  createMuiTheme,
  List,
  ListItem,
  ListItemIcon,
  Divider
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { MuiThemeProvider } from "@material-ui/core/styles";
import ListItemText from "@material-ui/core/ListItemText";

import AddLabel from "./AddLabel";
import { GetAllLabels } from "./Service";


const theme = createMuiTheme({
  overrides: {
    MuiDrawer: {
      paper: {
        marginTop: "70px",
        width: "20%"
      }
    }
  }
});
class MyDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: true,
      AnchorEl: null,
      labels: []
    };
  }
  componentWillMount() {
    this.getLabel();
  }
  getLabel = () => {
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    GetAllLabels(tokenUserId)
      .then(response => {
        console.log("labels fetched successfully");
        console.log(response.data.data);
        this.setState({
          labels: response.data.data
        });
      })
      .catch(err => {
        console.log("error while fetching labels");
      });
  }; 
  

  handleDrawer = event => {
    const { currentTarget } = event;
    this.setState({
      AnchorEl: currentTarget,
      open: !this.state.open
    });
  };
 handelAllNotes=()=>{
   let currentState={
     allNote:true,
     archiveNote:false,
     trashNote:false
   }
   this.props.currentClick(currentState)
 }
  handelArchivedNotes=()=>{
    let currentState={
      allNote:false,
      archiveNote:true,
      trashNote:false
    }
    console.log(this.props);
    this.props.currentClick(currentState)
  }
  handelTrashedNotes=()=>{
    let currentState={
      allNote:false,
      archiveNote:false,
      trashNote:true
    }
    this.props.currentClick(currentState)
  }

  componentWillReceiveProps(nextProps){
    console.log('kuch',nextProps);
    
  }
  render() {
    let open = this.state.open;
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <IconButton>
            <MenuIcon onClick={this.handleDrawer} />
          </IconButton>
          <div style={{ textAlign: "initial" }}>
            <Drawer variant="persistent" anchor="left" open={open}>
              <List>
                <ListItem onClick={this.handelAllNotes} button key="Notes">
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="gb_Tc"
                    >
                      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6A4.997 4.997 0 0 1 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary="Notes" />
                </ListItem>

                <ListItem button key="Reminders">
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="gb_Tc"
                    >
                      <path d="M18 17v-6c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v6H4v2h16v-2h-2zm-2 0H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6zm-4 5c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary="Reminder" />
                </ListItem>
              </List>
              <Divider></Divider>
              <div
                class="JNdkSc-tJHJj"
                style={{
                  paddingLeft: "10%",
                  paddingTop: "5%",
                  paddingBottom: "5%"
                }}
              >
                Labels
              </div>
              <List>
                <div>
                  {this.state.labels.map(label => (
                    <ListItem button key={label.name}>
                      <ListItemIcon>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          class="gb_Tc"
                        >
                          <path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></path>
                        </svg>
                      </ListItemIcon>
                      <ListItemText primary={label.name} />
                    </ListItem>
                  ))}
                </div>
                <AddLabel refresh={this.getLabel} labels={this.state.labels} />
              </List>
              <Divider></Divider>
              <List>
                <ListItem onClick={this.handelArchivedNotes} button key="Archive">
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="gb_Uc"
                    >
                      <path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItem>
                <ListItem onClick={this.handelTrashedNotes} button key="Trash">
                  <ListItemIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      class="gb_Tc"
                    >
                      <path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"></path>
                      <path d="M9 8h2v9H9zm4 0h2v9h-2z"></path>
                    </svg>
                  </ListItemIcon>
                  <ListItemText primary="Trash" />
                </ListItem>
              </List>
            </Drawer>
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default MyDrawer;
