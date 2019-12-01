import React, { Component } from "react";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Popper, Paper } from "@material-ui/core";
import TrashNote from "./TrashNote";
import AddNoteToLabel from "./AddNoteToLabel";
class MoreIcon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null
    };
  }
  handelMoreIcon = event => {
    console.log("more clicked");

    const { currentTarget } = event;
    this.setState({
      anchorEl: currentTarget,
      open: !this.state.open
    });
  };

  close = () => {
    this.setState({
      // anchorEl: null,
      open: false
    });
  };

  render() {
    let note = this.props.note;
    let open = this.state.open;
    const id = open ? "scroll-playground" : null;
    return (
      <div>
        <div>
          <MoreVertIcon
            style={{ width: "20px" }}
            onClick={this.handelMoreIcon}
          />
        </div>
        <div>
          <Popper
            id={id}
            open={open}
            anchorEl={this.state.anchorEl}
            style={{ width: "50px" }}
          >
            <Paper style={{ width: "200px", textAlign: "left" }}>
              <div>
                <TrashNote
                  note={note}
                  refresh={this.props.refresh}
                  close={this.close}
                />
              </div>
              <div>
                <AddNoteToLabel note={note} refresh={this.props.refresh}  close={this.close} anchorEl={this.state.anchorEl} labels={this.props.labels}/>
              </div>
            </Paper>
          </Popper>
        </div>
      </div>
    );
  }
}

export default MoreIcon;
