import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import {
  Tooltip,
  Paper,
  Dialog,
  DialogContent,
  InputBase,
  DialogTitle
} from "@material-ui/core";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";

class AddReminder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null
    };
  }
  handelDisplayReminder = event => {
    const { currentTarget } = event;
    this.setState({
      open: !this.state.open,
      anchorEl: currentTarget
    });
    console.log(this.state.open);
  };

  render() {
    const id = this.state.open ? "scroll-playground" : null;
    return (
      <div>
        <Tooltip title="reminder">
          <AddAlertOutlinedIcon
            style={{ width: "20px" }}
            onClick={this.handelDisplayReminder}
          />
        </Tooltip>
        <div>
          <Popper open={this.state.open} id={id} anchorEl={this.state.anchorEl} placement="bottom-start">
            <Paper style={{ width: "250px" }}>
              <DialogTitle><span style={{fontSize:'15px'}}>Reminder</span></DialogTitle>
            </Paper>
          </Popper>
        </div>
      </div>
    );
  }
}

export default AddReminder;
