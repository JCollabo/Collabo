import React from 'react';

class LumenButton extends React.Component {
    state = {
      lumens: 0
    };
    render(){
      return <button> Lumens: {this.state.lumens} onClick = {addLumen} </button>
    }
  }

  addLumen = () => {
    let newCount = this.state.lumens + 1;
      this.setState({
      lumens: newCount
      });
  };


  export default LumenButton;