import React from 'react';

class LumenButton extends React.Component {
  state = {
      lumens: 0
    };
  
  render() {
      
        return <button> 💡 {this.state.lumens} </button>
    }
  }
  
  /*addLumen = () => {
      let newCount = this.state.lumens + 1;
        this.setState({
        lumens: newCount
      });
    };*/

  export default LumenButton;
