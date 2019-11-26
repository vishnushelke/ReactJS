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
      label: false,
      open: false
    };
  }

  componentWillMount() {
    let currentState = {
      archiveNote: false,
      allNote: true,
      trashNote: false,
      label: false,
      name: null
    };
    this.handleCurrentClick(currentState);
  }

  handleAccountInfo = () => {
    this.setState({
      accountOpen: !this.state.accountOpen
    });
  };
  handleCurrentClick = currentState => {
    this.setState({ open: currentState.open });
    if (currentState.allNote === true) {
      console.log("sdfasdgdfgsdfg");

      this.props.history.push({pathname:"/Dashboard/notes",state:{open:this.state.open}});
    } else if (currentState.archiveNote === true) {
      console.log("archive");

      this.props.history.push("/Dashboard/archivenotes");
    } else if (currentState.trashNote === true) {
      console.log("trashed notes clicked");
      this.props.history.push("/Dashboard/trashnotes");
    } else if (currentState.reminder === true) {
      console.log("reminder notes clicked");
    } else if (currentState.label === true) {
      let name = currentState.name;
      let labelId = currentState.labelId;
      console.log("label clicked");
      this.props.history.push({
        pathname: "/Dashboard/" + name,
        state: { name: name, labelId: labelId }
      });
    }
  };
  render() {
    let open = this.state.open;
    let className = open ? "movementOff" : "movementOn";
    return (
      <div className="rootDiv">
        <MuiThemeProvider theme={theme}>
          <AppBar position="fixed" className="AppBar" color="default">
            <Toolbar>
              <div className="nameIcon">
                <MyDrawer
                  currentClick={this.handleCurrentClick}
                  className={className}
                />
                <img src={Fundoo} alt="logo" className="image" />
                <h3>FundooNotes</h3>
              </div>

              <Paper style={{ width: "550px" }}>
                <div className="searchClass">
                  <div>
                    <SearchIcon className="search" />
                  </div>

                  <InputBase placeholder="search" className="searchBar" />
                </div>
              </Paper>

              <div className="rightSideIcons">
                <RefreshIcon
                  style={{ paddingTop: "12px", paddingRight: "48px" }}
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
            paddingTop: "50px",
            paddingBottom: "50px"
          }}
        ></div>
        <div className={className}>
          <AddNote refresh={this.getNotes} />
        </div>
      </div>
    );
  }
}

export default PersistentDrawer;
