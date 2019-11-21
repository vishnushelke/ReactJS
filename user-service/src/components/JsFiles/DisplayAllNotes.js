import React, { Component } from "react";
import { Card, TextField, IconButton, Tooltip } from "@material-ui/core";
import { GetAllNotes } from "./Service";
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";

import ImageOutlinedIcon from "@material-ui/icons/ImageOutlined";
import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import EditNote from "./EditNote";
import AddColor from "../AddColor";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width:"400px",

      }
    },
  }
});

class DisplayAllNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      open:false,
      note:{}
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({notes:newProps.notes})
  }
  handleEditNote=(noteData)=>{
    this.setState({
      open:true,
      note:noteData
    })
  }
  handleDialogBox=()=>{
    this.setState({
      open:false
    })
  }
  handelNoteSave=(thisnote)=>{
    this.setState({
      open:false,
      note:thisnote
    })
  }
  render() {
    console.log(this.state.note,'noteupdate');
    
    let notes = this.state.notes;


    return (
      <form style={{ paddingLeft: "15%" }}>
        <div
          style={{
            display: "flex",
            width: "850px",
            justifyContent: "space-around",
            flexWrap: "wrap"
          }}
        >
          <MuiThemeProvider theme={theme}>
          {notes.map(text => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap"
              }}
            >
              <Card
                style={{
                  maxWidth: "250px",
                  minHeight: "100px",
                  textAlign: "start",
                  margin: "10px",
                  backgroundColor:text.colour
                }}
                
              >
                <div onClick={()=>this.handleEditNote(text)}>
                <TextField
                disabled
                  value={text.title}
                  InputProps={{ disableUnderline: true }}
                  style={{ paddingLeft: "10px" }}
                  // onClick={this.handelNoteSave(text)}
                />

                <TextField
                disabled
                  value={text.text}
                  InputProps={{ disableUnderline: true }}
                  style={{ paddingLeft: "10px" }}
                />
                </div>
                 <div style={{display:'flex',flexWrap:"wrap",flexDirection:'row',justifyContent:'space-around',paddingTop:'10px'}}>
                   
                 <Tooltip title="reminder">
                    <AddAlertOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="collaborator">
                    <PersonAddOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <AddColor note={text} refresh={this.props.refresh}/>
                    <Tooltip title="add image">
                    <ImageOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="archive">
                    <ArchiveOutlinedIcon style={{ width: "20px" }} />
                    </Tooltip>
                    <Tooltip title="more">
                    <MoreVertIcon style={{ width: "20px" }} />
                    </Tooltip>
                  </div>
              </Card>
            </div>
          ))}
          </MuiThemeProvider>
        </div>
        <EditNote open={this.state.open} note={this.state.note} closeDialog={this.handleDialogBox} refresh={this.props.refresh}/>
      </form>
    );
  }
}

export default DisplayAllNotes;
