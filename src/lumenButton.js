import React from 'react';

addLumen = () => {
    let newCount = this.state.lumens + 1;
      this.setState({
      lumens: newCount
      });
  };

class LumenButton extends React.Component {
    state = {
      lumens: 0
    };
    render(){
      return <button> Lumens: {this.state.lumens} onClick = {addLumen} </button>
    }
  }


  export default LumenButton;