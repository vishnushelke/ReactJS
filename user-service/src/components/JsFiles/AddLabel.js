import React, { Component } from "react";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import {
  Dialog,
  DialogTitle,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Button
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import { AddUserLabel, DeleteUserLabel, UpdateUserLabel } from "./Service";
import "../CssFiles/Dashboard.css";
import label from "../../Assets/download.svg";
import pen from "../../Assets/pen.svg";
const theme = createMuiTheme({
  overrides: {
    MuiDialog: {
      paperScrollPaper: {
        width: "270px"
      }
    }
  }
});
class AddLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      labelName: "",
      error: {},
      labels: [],
      createChange: false,
      edit: false,
      currentLabel: "",
      editLabelName:""
    };
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      labels: newProps.labels
    });
  }
  handleAddLbel = () => {
    console.log(this.state.open, " open");

    this.setState({
      open: true
    });
    // console.log(this.state.open);
  };
  handleCloseDialog = () => {
    console.log("close button response", this.state.open);

    this.setState({
      open: false
    });
  };
  handelLabelName = event => {
    this.setState({
      labelName: event.target.value
    });
  };
  handelEditLabelName= event =>{
    this.setState({
      editLabelName: event.target.value
    });
    console.log(this.state.editLabelName);
    
  }
  handelAddLabel = () => {
    let addLabelDto = {};
    let tokenUserId = localStorage.getItem("LoginToken");
    addLabelDto.name = this.state.labelName;

    console.log(addLabelDto, tokenUserId);

    AddUserLabel(addLabelDto, tokenUserId)
      .then(response => {
        console.log("into add label result");
        console.log(response);
        this.props.refresh();
      })
      .catch(err => {
        console.log("error while creating label");
        this.setState({
          error: err
        });
      });
  };
  handleCreateField = () => {
    this.setState({ createChange: !this.state.createChange });
  };
  handleEdit = labelId => {
    this.setState({ edit: !this.state.edit });
    this.setState({ currentLabel: labelId });
  };
  handelDeleteLabel = label => {
    let labelId = label.labelId;
    let tokenUserId = localStorage.getItem("LoginToken");
    DeleteUserLabel(labelId, tokenUserId)
      .then(response => {
        console.log("label deleted successfully");
        this.props.refresh();
      })
      .catch(err => {
        console.log("label deletion fail");
      });
  };
  updateLabel=(label)=>{
    let labelId=label.labelId
    let tokenUserId = localStorage.LoginToken
    let addLabelDto={}
    addLabelDto.name=this.state.editLabelName
    UpdateUserLabel(labelId,tokenUserId,addLabelDto).then(response=>{
      console.log('label updated successfully',addLabelDto.name);
      this.props.refresh()
    }).catch(err=>{
      console.log('label updation fail');      
    })
  }
  render() {
    let open = this.state.open;
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <ListItem
            button
            key="Editlabels"
            onClick={this.handleAddLbel}
            style={{
              borderTopRightRadius: "10px",
              borderBottomRightRadius: "10px"
            }}
          >
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
          <div
            style={{
              display: "flex",
              alignContent: "center",
              padding: "10px",
              width: "300px"
            }}
          >
            <Dialog
              open={open}
              onClose={this.handleAddLbel}
              style={{
                // width: "200px",
                paddingBottom: "50px"
                // paddingLeft: "10px"
              }}
            >
              <DialogTitle>Edit Labels</DialogTitle>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "spaceBetween"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "spaceBetween"
                  }}
                >
                  {this.state.createChange === false && (
                    <div>
                      <AddIcon onClick={this.handleCreateField} />
                    </div>
                  )}
                  {this.state.createChange === true && (
                    <div>
                      <CloseIcon onClick={this.handleCreateField} />
                    </div>
                  )}
                  <div>
                    <TextField
                      placeholder="Create new Label"
                      onChange={this.handelLabelName}
                      onClick={this.handleCreateField}
                      name="labelName"
                      style={{ paddingLeft: "10px", width: "200px" }}
                      InputProps={{
                        disableUnderline: !this.state.createChange
                      }}
                    />
                  </div>

                  {this.state.createChange === true && (
                    <CheckIcon
                      onClick={this.handelAddLabel}
                      style={{ paddingRight: "10px" }}
                    />
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "spaceBetween"
                  }}
                >
                  {this.state.labels.map((text, index) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row"
                      }}
                    >
                      <div id="show" style={{ width: "50px" }}>
                        <div id="label">
                          <img src={label} alt="label"></img>
                        </div>
                        <div id="delete">
                          <DeleteIcon
                            fontSize="small"
                            // refresh={this.handelAddLabel}
                            onClick={() => this.handelDeleteLabel(text)}
                          />
                        </div>
                      </div>
                      <div>
                        <TextField
                          defaultValue={text.name}
                          onChange={this.handelEditLabelName}
                          name="editLabelName"
                          InputProps={{ disableUnderline: true }}
                        />
                      </div>
                      {/* {this.state.currentLabel === text.labelId && (
                        <div>
                          {" "}
                          {this.state.edit === false && (
                            <div onClick={() => this.handleEdit(text.labelId)}>
                              <img src={pen} alt="pen"></img>
                            </div>
                          )}
                        </div>
                      )}

                      {this.state.currentLabel === text.labelId && (
                        <div>
                          {this.state.edit === true && (
                            <CheckIcon
                              // onClick={this.handelAddLabel}
                              style={{ paddingRight: "10px" }}
                            />
                          )} */}

                      {this.state.currentLabel === text.labelId ? (
                        <CheckIcon
                          onClick={() => this.updateLabel(text)}
                        />
                      ) : (
                        <img
                          src={pen}
                          onClick={() => this.handleEdit(text.labelId)}
                          alt="pen"
                        ></img>
                      )}

                      {/* </div>
                      )} */}
                    </div>
                  ))}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingRight: "10px",
                    paddingBottom: "10px",
                    paddingTop: "10px"
                  }}
                >
                  <Button
                    onClick={this.handleCloseDialog}
                    style={{ width: "10%" }}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default AddLabel;
