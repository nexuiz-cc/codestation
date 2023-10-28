import React, { Component } from 'react';
import Conten32Child1 from './Conten32Child1';
import withLog3 from '../HOC/withLog3';
const NewChild = withLog3(Conten32Child1);
export default class Content33 extends Component {

  constructor() {
    super();
    this.comRef = React.createRef();
    this.state = {
      show: true,
    };
  }

  clickHandle = () => {
    console.log('查看当前的 Ref 所关联的组件:',this.comRef);
  };

  render() {
    return (
      <div>
        <button onClick={() =>this.setState({show:!this.state.show})}>
          show/hide
        </button>
        <button onClick={this.clickHandle}>触发子组件方法</button>
        { this.state.show ? <NewChild ref={this.comRef} /> : null }
      </div>
    );
  }

}
