import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import AddAlertOutlinedIcon from "@material-ui/icons/AddAlertOutlined";
import '../CssFiles/AddReminderStyle.css'
import { AddNoteReminder } from './Service';

const theme = createMuiTheme({
    overrides: {
        'MuiPopover': {
            'paper': {
                maxWidth: "158%"
            }
        }
    }
});

export default class AddReminder extends Component {
    state = {
        anchorEl: null,
        open: false,
        openChildMenu: false,
        noteLabels: [],
        userReminderDate: "",
        userReminderTime:""
    };

    /**
       * @description : handle anchorEl
       * notesArray: set anchorEl state with current event
       */
    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget, open: true
        });
    };

    /**
    * @description : handle anchorEl
    * notesArray: set anchorEl state with null
    */
    handleClose = () => {
        this.setState({ anchorEl: null, open: false, openChildMenu: false });
    };

    handleChildMenu = () => {
        this.setState({ open: false, openChildMenu: true });
    }

    handleDate = (event) => {
        this.setState({ userReminderDate:event.target.value});
        
    }

    handleTime = (event) => {
        this.setState({ userReminderTime: event.target.value });
        console.log(this.state.userReminderTime);
        
    }

    
    /**new Date(year, month{start from 0}, day, hours, minutes, seconds, milliseconds) */
    addReminder = (requestValue) => {
        this.setState({ anchorEl: null, open: false, openChildMenu: false });
        /**@param today current date with current system time  */
        var today = new Date();
        let day = today.getDate(); /** day of current date */
        let month = today.getMonth();/** month of current date */
        let year = today.getFullYear();/** year of current date */
        let reminderDate; /** common variable for collecting reminder time */

        /** for reminder setting for today itself with 8 PM */
        if (requestValue === 1) {
            reminderDate = (new Date(year, month, day, 20, 0, 0)).toString();
            console.log("today date", reminderDate);

        } /** for reminder setting for tomorrow with time 8 AM */
        else if (requestValue === 2) {
            var tomorrow = new Date();
            tomorrow.setDate(today.getDate() + 1);
            tomorrow.setHours(8);
            tomorrow.setMinutes(0);
            tomorrow.setSeconds(0);
            reminderDate = tomorrow.toString()
            console.log("tomorrow date ", reminderDate);

        } /** for reminder setting for next week with time 8 AM */
        else if (requestValue === 3) {
            var weekdayValue = today.getDay();/** week day value of current [0-sun,1-mon] */
            let date = new Date(today.setDate(today.getDate() + weekdayValue + (weekdayValue === 0 ? -6 : 2)));
            date.setHours(8);
            date.setMinutes(0);
            date.setSeconds(0);
            reminderDate = date.toString();
            console.log("next monday date", reminderDate);

             
        } /** for reminder setting for user selected date and time*/
        else {
            let concatDate = this.state.userReminderDate + " " + this.state.userReminderTime;            
            let newDate = new Date(concatDate)
            reminderDate = newDate.toString();
                   
        }
        console.log("note data",this.props.note);
        
        if (this.props.note) {
            let tokenUserId =localStorage.getItem("LoginToken");
            let date=[]
           
            let reminderTime = {
                reminder: reminderDate,
                noteId: this.props.note.noteId
            }
            let remindernew=''
            date=reminderDate.split(' ')
            console.log(date,'date array');
            
            remindernew=date[2]+' '+date[1]+' '+date[3]+' '+date[4]+' UTC'
            console.log("new date",remindernew);    
            AddNoteReminder(reminderTime.noteId,remindernew,tokenUserId).then((data) => {
                console.log(data);
                this.props.refresh();
            }).catch((err) => {
                console.log(err);
            })
        } 
        else {
            // this.props.setReminderOnNewNote(reminderDate);
            let date=[]
            date=reminderDate.split(' ')
            console.log(date,'date array');
            let remindernew=''
            remindernew=date[2]+' '+date[1]+' '+date[3]+' '+date[4]+' UTC'
            console.log("note data",this.props.note);
            this.props.refresh(remindernew);
        }
        

    }

    render() {
        const { anchorEl } = this.state;

        return (
            <div>
                <Tooltip title="reminder">
          <AddAlertOutlinedIcon
            style={{ width: "20px" }}
            onClick={this.handleClick}
          />
        </Tooltip>
                <div>
                    <Popover
                        open={this.state.open}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '50%' }}
                    >
                        <div>
                            <div className="reminderTextStyle">
                                <label>Reminder:</label>
                            </div>
                            <MenuList>

                                <MenuItem onClick={() => this.addReminder(1)}>
                                    <div className="reminderStyle">
                                        Later today <span>8 PM</span>
                                    </div>
                                </MenuItem>

                                <MenuItem onClick={() => this.addReminder(2)}>
                                    <div className="reminderStyle">
                                        Tomorrow <span>8 AM</span>
                                    </div></MenuItem>

                                <MenuItem onClick={() => this.addReminder(3)}>
                                    <div className="reminderStyle">
                                        Next week <span>Mon,8 AM</span>
                                    </div></MenuItem>

                                <div className="watchReminderStyle">
                                    <MenuItem onClick={this.handleChildMenu}><AccessTimeIcon />  Pick date & time</MenuItem>
                                </div>
                            </MenuList>
                        </div>
                    </Popover>
                </div>

                <MuiThemeProvider theme={theme}>
                    <Popover
                        open={this.state.openChildMenu}
                        anchorEl={anchorEl}
                        onClose={this.handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        style={{ width: '50%' }}
                    >
                            <MenuList>
                                <div className="dateTimeStyle">
                                <TextField
                                    label="Date"
                                    type="date"
                                    value={this.state.userReminderDate}
                                    onChange={this.handleDate}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <TextField
                                    label="Time"
                                    type="time"
                                    value={this.state.userReminderTime}
                                    onChange={this.handleTime}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Button variant="contained"
                                    size="large"
                                    color="primary"
                                    onClick={this.addReminder}>save</Button>
                                
                                </div>
                        </MenuList>
                    </Popover>
                </MuiThemeProvider>
            </div>
        )
    }
}