import React, { Component } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Paper
} from "@material-ui/core";
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fundoo from "../images.jpeg";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import "../CssFiles/Dashboard.css";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import RefreshIcon from "@material-ui/icons/Refresh";
import AppsIcon from "@material-ui/icons/Apps";

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
        // backgroundColor: "pink"
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
    super(props)
  
    this.state = {
       anchorEl:null
    }
  }
  
  render() {
    return (
      <div className="rootDiv">
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed" className="AppBar" color="default">
            <Toolbar>
              <div className="nameIcon">
                <IconButton className="iconButton" edge="start">
                  <MenuIcon />
                </IconButton>

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

              <div>
                <AppsIcon className="appsIcon" />
                <RefreshIcon className="refreshIcon" />
                <div>
                <AccountCircleIcon className="accountCircleIcon" />
                  {/* <Popper open={open} anchorEl={anchorEl}>
                    <Paper>
                      <Typography className={this.props.typography}>
                        The content of the Popper.
                      </Typography>
                    </Paper>
                  </Popper> */}
                </div>
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default PersistentDrawer;
