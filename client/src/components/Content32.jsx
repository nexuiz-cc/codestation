import React, { Component } from 'react';
import Conten32Child1 from './Conten32Child1';
import withLog2 from '../HOC/withLog2';
const NewChild = withLog2(Conten32Child1);
export default class Content32 extends Component {
  constructor() {
    super();
    this.comRef = React.createRef();
    this.state = {
      show: true,
    };
  }

  clickHandle = () => {
    // 查看当前的 Ref 所关联的组件
    console.log(this.comRef);
  };

  render() {
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              show: !this.state.show,
            })
          }>
          show/hide
        </button>
        <button onClick={this.clickHandle}>触发子组件方法</button>
        {this.state.show ? <NewChild ref={this.comRef} /> : null}
      </div>
    );
  }
}
