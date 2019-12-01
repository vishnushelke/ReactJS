import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Checkbox from "@material-ui/core/Checkbox";
import {
  AddNoteToLabel,
  TrashUserNote,
  GetAllLabels,
  RemoveNoteFromLabel
} from "./Service";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import '../CssFiles/Dashboard.css'
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: "none"
      }
    },
    MuiList: {
      root: {
        width: "200px"
      }
    },
    MuiInputBase: {
      multiline: {
        padding: "0px 0px 0px 2px"
      }
    }
  }
});

const styles = theme => ({
  typography: {
    margin: theme.spacing(2)
  }
});

export default withStyles(styles)(
  class MoreButton extends React.Component {
    state = {
      anchorEl: null,
      open: false,
      openLabelMenu: false,
      noteLabels: [],
      orgLabels:[],
      dupLabels: [],
      createTag: false,
      labelSearch:'',
      labelMessage:''
    };

    componentWillReceiveProps(nextProps) {
      
      this.setState({
        noteLabels: nextProps.noteProps.labels
      });
    }
    handelRemoveNote=(labelObject)=>{
      let noteId= this.props.noteProps.noteId
        let labelId= labelObject.labelId
        let tokenUserId = localStorage.getItem("LoginToken")
        RemoveNoteFromLabel(noteId,labelId,tokenUserId).then(response=>{
          this.props.refresh();
        }).catch(err => {
          console.log(err);
        });
    }
    componentDidMount() { 
      this.getLabel()
      this.setState({
        noteLabels: this.props.noteProps.labels
      });
    }
    getLabel = () => {
      let tokenUserId = localStorage.getItem("LoginToken");
      GetAllLabels(tokenUserId)
        .then(response => {
          console.log("labels fetched successfully");
          console.log(response.data.data);
          this.setState({
            orgLabels: response.data.data,
            dupLabels:response.data.data
          });
        })
        .catch(err => {
          console.log("error while fetching labels");
        });
    };

    /**
     * @description : handle anchorEl
     * notesArray: set anchorEl state with current event
     */
    handleClick = event => {
      this.setState({
        anchorEl: event.currentTarget,
        open: true
      });
    };

    /**
     * @description : handle anchorEl
     * notesArray: set anchorEl state with null
     */
    handleClose = () => {
      this.setState({ anchorEl: null, open: false, openLabelMenu: false });
    };

    /**
     * @description : handle delete note api
     */
    handleDeleteNote = () => {
      this.setState({ open: false, openLabelMenu: false });
      let noteId = this.props.noteProps.noteId;
      let tokenUserId = localStorage.getItem("LoginToken");
      TrashUserNote(noteId, tokenUserId)
        .then(response => {
          console.log("note trashed successfully");
          this.props.refresh();
          this.props.close();
        })
        .catch(err => {
          console.log("note trash fail");
        });
    };

    handleLabelSearch = async event => {
      this.setState({ labelSearch: event.target.value });
      console.log(event.target.value);
      if (event.target.value.length <= 0) {
        this.setState({ createTag: false });
        this.setState({ dupLabels: this.state.orgLabels });
      } else {
        let labelArray = this.state.orgLabels;
        let searchArray = labelArray.filter(function(value, index, arr) {
          if (value.name.includes(event.target.value)) {
            return value;
          }
        });
        await this.setState({ dupLabels: searchArray });
        if (this.state.dupLabels.length <= 0) {
          this.setState({ createTag: true });
          this.setState({ labelMessage: "no such label" });
        }
      }
    };

    handleAddLabelMenu = () => {
      this.setState({ open: false, openLabelMenu: true });
    };

    handleChange = event => {
      const item = event.target.name;
      const isChecked = event.target.checked;
      this.setState(prevState => ({
        checkedItems: prevState.checkedItems.set(item, isChecked)
      }));
    };

    checkedEvent = (event, labelObject) => {
      if (event.target.checked) {
        this.setState({ open: false });
        
        
          let noteId= this.props.noteProps.noteId
          let labelId= labelObject.labelId
          let tokenUserId = localStorage.getItem("LoginToken")
          console.log('into add note to label',noteId,' ',labelId,' ',tokenUserId);
        AddNoteToLabel(noteId,labelId,tokenUserId)
          .then(data => {
            console.log(data);
            this.props.refresh();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        for (let i = 0; i < this.state.noteLabels.length; i++) {
          if (this.state.noteLabels[i]._id === labelObject._id) {
            this.state.noteLabels.splice(i, 1);
          }
        }
        this.setState({ noteLabels: this.state.noteLabels });
        this.handelRemoveNote(labelObject)
      }
    };
    render() {
      const { anchorEl } = this.state;
      return (
        <MuiThemeProvider theme={theme}>
          <div align="center">
            <MoreVertIcon onClick={this.handleClick} />

            <Popover
              open={this.state.open}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              style={{ width: "12%" }}
            >
              <MenuList>
                <MenuItem onClick={this.handleDeleteNote}>Delete note</MenuItem>
                <MenuItem onClick={this.handleAddLabelMenu}>Add label</MenuItem>
              </MenuList>
            </Popover>

            <Popover
              open={this.state.openLabelMenu}
              anchorEl={anchorEl}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              style={{ width: "50%" }}
            >
              <MenuList>
                <div className="labelPosition">Label Note</div>
                <div className="labelPosition">
                  <InputBase
                    placeholder="Enter Label Name"
                    onChange={event => this.handleSearchInput(event)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton>
                          <SearchIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    }
                    onChange={this.handleLabelSearch}
                  />
                </div>
                {this.state.dupLabels.map((labelObject, index) => (
                  <div className="labelPopover" key={index}>
                    <Checkbox
                      checked={this.state.noteLabels.find(
                        choice => choice.labelId === labelObject.labelId
                      )}
                      onClick={event => this.checkedEvent(event, labelObject)}
                    />
                    <label className="labelNameStyle">
                      {labelObject.name}
                    </label>
                  </div>
                ))}
                {this.state.createTag && (
                  <div>
                    {this.state.labelMessage}
                  </div>
                )}
              </MenuList>
            </Popover>
          </div>
        </MuiThemeProvider>
      );
    }
  }
);
