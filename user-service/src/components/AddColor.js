import React, { Component } from "react";
import { Tooltip, Dialog, IconButton, Popover } from "@material-ui/core";
import ColorLensOutlinedIcon from "@material-ui/icons/ColorLensOutlined";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ColorUserNote } from "./JsFiles/Service";
const theme = createMuiTheme({
  overrides: {
    MuiPaper: {
      root: {
        width:"100px",

      }
    },
  }
});
const colorsPallete = [
  {
    colorName: "Default",
    colorCode: "#ffffff"
  },
  {
    colorName: "Red",
    colorCode: "#f28b82"
  },
  {
    colorName: "Orange",
    colorCode: "#fbbc04"
  },
  {
    colorName: "Yellow",
    colorCode: "#fff475"
  },
  {
    colorName: "Green",
    colorCode: "#ccff90"
  },
  {
    colorName: "Teal",
    colorCode: "#a7ffeb"
  },
  {
    colorName: "Blue",
    colorCode: "#cbf0f8"
  },
  {
    colorName: "Dark blue",
    colorCode: "#aecbfa"
  },
  {
    colorName: "Purple",
    colorCode: "#d7adfb"
  },
  {
    colorName: "Pink",
    colorCode: "#fdcfe8"
  },
  {
    colorName: "Dark Brown",
    colorCode: "#e6c9a7"
  },
  {
    colorName: "Gray",
    colorCode: "#e8eaed"
  }
];
class AddColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      anchorEl: null,
      note:{},
      noteId:1
    };
  }
 
  handleColorPopper = event => {
    this.setState({
      anchorEl: event.target
    });
  };
  handleClose=()=>{
    this.setState({
        anchorEl: null
      });
  }
  setColor=(color)=>{
      console.log(color);
      // console.log(this.props.note);
      
      let noteId=this.props.note.noteId; 
      let tokenUserId = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34";
      ColorUserNote(noteId,color,tokenUserId).then(response=>{
        this.props.refresh();
        console.log('color set successfully');
        
      }).catch(err=>{
        console.log('error while adding color');
        
      })
      this.setState({
        anchorEl: null
      });
  }
  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <Tooltip title="change color">
            <ColorLensOutlinedIcon
              style={{ width: "20px" }}
              onClick={this.handleColorPopper}
            />
          </Tooltip>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center"
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center"
            }}
          >
            <div>
              {colorsPallete.map((text, index) => (
                <IconButton style={{ backgroundColor: text.colorCode }} onClick={()=>this.setColor(text.colorCode)}/>
              ))}
            </div>
          </Popover>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default AddColor;
