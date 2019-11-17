import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  InputBase,
  Paper
} from "@material-ui/core";
import Fundoo from "../../Assets/images.jpeg";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import "../CssFiles/Dashboard.css";
import SearchIcon from "@material-ui/icons/Search";
import RefreshIcon from "@material-ui/icons/Refresh";
import AccountInfo from "../JsFiles/AccountInfo";
import MyDrawer from "./MyDrawer";
import AddNote from "./AddNote";
import DisplayAllNotes from "./DisplayAllNotes";

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
      accountOpen:false
    };
  }
handleAccountInfo=()=>{
  
  this.setState({
    accountOpen:!this.state.accountOpen
  })
}
  render() {
    return (
      <div className="rootDiv">
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed" className="AppBar" color="default">
            <Toolbar>
              <div className="nameIcon">
                <MyDrawer />
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
                <RefreshIcon style={{paddingTop:'5px',paddingRight:'48px'}} />
                
                <AccountInfo props={this.props} />
                <div>
                </div>
                
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
        <div style={{display:'flex',alignSelf:'center',alignItems:'center',paddingTop:'100px',paddingBottom:'50px'}}>
        <AddNote props={this.props}/>
        </div>
        <div>
          <DisplayAllNotes/>
        </div>
      </div>
    );
  }
}

export default PersistentDrawer;
