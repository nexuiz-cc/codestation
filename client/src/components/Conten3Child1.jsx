import React, { Component } from 'react'

export default class Conten3Child1 extends Component {
    clickHandle = () => {
        console.log(this);
        console.log(this.refs.inputRef);
        this.refs.inputRef.focus();
      }
  render() {
    return (
        <div>
          <input type="text" ref="inputRef"/>
          <button onClick={this.clickHandle}>聚焦</button>
        </div>
      )
  }
}
