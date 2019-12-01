import React, { Component } from "react";
import {
  Button,
  Popper,
  Paper,
  ListItemText,
  ListItemIcon,
  ListItem,
  List
} from "@material-ui/core";
import { GetAllLabels } from "./Service";
import Checkbox from '@material-ui/core/Checkbox';

class AddNoteToLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
      labels: [],
      checkedB: false
    };
  }
  handleAddLabels = async () => {
    console.log("add label clicked");
    //  this.props.close()

      this.setState({
      open:!this.state.open 
    });

    console.log("open state",this.state.open);
    
    
  };
  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  componentDidMount() {
    this.getLabel();
    console.log("newProps of add noteTo label", this.props.anchorEl);
    this.setState({
      anchorEl: this.props.anchorEl,
      
    });
  }
  getLabel = () => {
    let tokenUserId = localStorage.getItem("LoginToken");
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

  render() {
    let labels = this.state.labels;
    console.log(labels, "labels of addd note to label");

    let id = this.state.open ? "scroll-playground" : null;
    return (
      <div
        style={{
          display: "flex",
          justifycontent: "center",
          textAlign: "center"
        }}
      >
        <Button
          fullWidth
          onClick={this.handleAddLabels}
          style={{ textAlign: "start" }}
        >
          Add Label
        </Button>
        <Popper
          id={id}
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          placement="bottom-start"
          style={{ display: "flex", justifycontent: "center" }}
        >
          <Paper
            style={{
              margin: "25px",
              alignSelf: "center",
              paddingLeft: "5%",
              paddingRight: "5%",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "300px",
              paddingBottom: "10%"
            }}
          >
            <List>
              <div>
                {this.state.labels.map(label => (
                  <ListItem
                    onClick={() =>
                      this.handelLabelNotes(label.name, label.labelId)
                    }
                    button
                    key="Notes"
                    style={{
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px"
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={this.state.checkedB}
                        onChange={this.handleChange("checkedB")}
                        value="checkedB"
                        color="primary"
                      />
                    </ListItemIcon>
                    <ListItemText primary={label.name} />
                  </ListItem>
                ))}
              </div>
            </List>
          </Paper>
        </Popper>
      </div>
    );
  }
}

export default AddNoteToLabel;
