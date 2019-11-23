import React, { Component } from "react";
import { AppBar, Toolbar, InputBase, Paper } from "@material-ui/core";
import Fundoo from "../../Assets/images.jpeg";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "../CssFiles/Dashboard.css";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import AccountInfo from "../JsFiles/AccountInfo";
import MyDrawer from "./MyDrawer";
import AddNote from "./AddNote";
import DisplayAllNotes from "./DisplayAllNotes";
import { GetAllNotes, GetArchivedUserNote } from "./Service";

const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanelSummary: {
      content: {
        margin: "0",
        padding: "0",
        color: "white"
      }
    },
    MuiToolbar: {
      root: {
        display: "flex",
        justifyContent: "space-between"
      }
    },
    MuiInputBase: {
      root: {
        width: "600px"
      }
    },
    MuiSvgIcon: {
      root: {
        height: "1.5em"
      }
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: "white"
      }
    }
  }
});

class PersistentDrawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      accountOpen: false,
      notes: []
    };
  }
  componentWillMount() {
    this.getNotes();
  }
  getNotes = () => {
    let tokenUserId =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
    GetAllNotes(tokenUserId)
      .then(response => {
        console.log(response.data.data);
        this.setState({
          notes: response.data.data.reverse()
        });
      })
      .catch(err => {
        console.log("token not matched");
      });
  };
  handelArchivedNotes=()=>{
    let tokenUserId='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34'
    GetArchivedUserNote(tokenUserId).then(response=>{
      console.log('archived notes fetched successfully');
      console.log(response.data.data);
      
    }).catch(err=>{
      console.log('archived notes fetch fail');
      
    })
  }
  handleAccountInfo = () => {
    this.setState({
      accountOpen: !this.state.accountOpen
    });
  };
  handleCurrentClick=(currentState)=>{
    if(currentState.allNote===true)
    {
      console.log('all notes clicked');
      
    }
    else if(currentState.archiveNote===true)
    {
      console.log('archived notes clicked');
      
    }
    else if(currentState.trashNote===true)
    {
      console.log('trshed notes clicked');
      
    }
    else if(currentState.reminder===true)
    {
      console.log('reminder notes clicked');
      
    }
  }
  render() {
    return (
      <div className="rootDiv">
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed" className="AppBar" color="default">
            <Toolbar>
              <div className="nameIcon">
                <MyDrawer currentClick={this.handleCurrentClick}/>
                <img src={Fundoo} alt="logo" className="image" />
                <h3>FundooNotes</h3>
              </div>

              <Paper>
                <div className="searchClass">
                  <div>
                    <SearchIcon className="search" />
                  </div>

                  <InputBase placeholder="search" className="searchBar" />
                </div>
              </Paper>

              <div className="rightSideIcons">
                <RefreshIcon
                  style={{ paddingTop: "5px", paddingRight: "48px" }}
                />

                <AccountInfo props={this.props} />
                
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            alignItems: "center",
            paddingTop: "100px",
            paddingBottom: "50px"
          }}
        >
          <AddNote props={this.props} refresh={this.getNotes} />
        </div>
        <div>
          <DisplayAllNotes notes={this.state.notes} refresh={this.getNotes} />
        </div>
      </div>
    );
  }
}

export default PersistentDrawer;
