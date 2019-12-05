import React from "react";


class Content extends React.Component {
  constructor(props) {
    console.log('constructor called');
    super(props)
  
    
  }
  
  componentWillMount() {
    console.log("Component WILL MOUNT!");
  }
  componentDidMount() {
    console.log("Component DID MOUNT!");
  }
  componentWillReceiveProps(newProps) {
    console.log("Component WILL RECIEVE PROPS!");
  }
  shouldComponentUpdate(newProps, newState) {
    console.log("component should update!");
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("Component WILL UPDATE!");
  }
  componentDidUpdate(prevProps, prevState) {
    console.log("Component DID UPDATE!");
  }
  componentWillUnmount() {
    console.log("Component WILL UNMOUNT!");
  }
  render() {
    console.log('render called');
    return (
      <div>
        <h3>{this.props.myNumber}</h3>
      </div>
    );
  }
}
export default Content;
