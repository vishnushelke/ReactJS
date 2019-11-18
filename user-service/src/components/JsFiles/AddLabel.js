import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popper,
  TextField
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

class AddLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }
  handleAddLbel = () => {
    console.log(this.state.open, " open");

    this.setState({
      open: !this.state.open
    });
    // console.log(this.state.open);
  };
  handelLabelName = event => {
    console.log(event.target.value);

    this.setState({
      labelName: event.target.value
    });
  };

  render() {
    let open = this.state.open;
    let id = open ? "simple-popper" : null;
    return (
      <div>
        <ListItem button key="Editlabels" onClick={this.handleAddLbel}>
          <ListItemIcon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              class="gb_Tc"
            >
              <path d="M20.41 4.94l-1.35-1.35c-.78-.78-2.05-.78-2.83 0L13.4 6.41 3 16.82V21h4.18l10.46-10.46 2.77-2.77c.79-.78.79-2.05 0-2.83zm-14 14.12L5 19v-1.36l9.82-9.82 1.41 1.41-9.82 9.83z"></path>
            </svg>
          </ListItemIcon>
          <ListItemText primary="Edit labels" />
        </ListItem>
        <div>
          <Dialog open={open} onClose={this.handleAddLbel}>
            <DialogTitle>Edit Labels</DialogTitle>
            <div style={{display:'flex',flexDirection:'row'}}>
              <TextField
                placeholder="Create new Label"
                onChange={this.handelLabelName}
              ></TextField>
              <CheckIcon />
            </div>
          </Dialog>
        </div>
      </div>
    );
  }
}

export default AddLabel;
