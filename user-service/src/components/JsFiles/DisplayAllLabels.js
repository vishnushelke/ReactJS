import React, { Component } from 'react';
import { GetAllNotes } from './Service';

class DisplayAllLabels extends Component {
    constructor(props) {
      super(props)
    
      this.state = {
         labels:[],
         addLabelActive:false
      }
    }
    componentWillMount(){
        let tokenUserId='eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.xw0wWGGzxZBMattBsKUw5e8nffwz7waJmunE_ag7k34';
        GetAllNotes(tokenUserId).then(response=>{
            console.log('labels fetched successfully')
        }).catch(err=>{
            console.log('error while fetching labels')
        })
    }
    
  render() {
      let label=this.state.labels
      let open=this.state.addLabelActive
    return (
      open? <h1>asghdhj</h1>:null
    );
  }
}

export default DisplayAllLabels;
