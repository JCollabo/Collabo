import React from 'react';

class LumenButton extends React.Component {
    state = {
      lumens: 5
    };
    render(){
      return <button> Lumens: {this.state.lumens} </button>
    }
  }

  /*addLumen = () => {
    let lumenValue = this.state.lumens + 1;
      this.setState({
      lumens: lumenValue
      });
  };*/


  export default LumenButton;
