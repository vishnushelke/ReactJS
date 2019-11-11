import React, { Component } from 'react';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import {MenuIcon} from '@material-ui-icons/MenuIcon';
const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanelSummary: {
      content: {
        margin: '0',
        padding: '0',
        color: 'white'
      }
    },
    MuiAppBar: {
      colorDefault: {
        backgroundColor: 'white'
      }
    }
  }
});

class PersistentDrawer extends Component {
  render() {
    return (
      <div className="rootDiv">
        <MuiThemeProvider theme={theme}>
          <toolbar>
            <AppBar position="fixed" className="AppBar" color="default">
              <Toolbar>
                <IconButton>
                    <MenuIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </toolbar>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default PersistentDrawer;
