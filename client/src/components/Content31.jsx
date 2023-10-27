import React, { Component } from 'react'
import Conten31Child1 from './Conten31Child1'
export default class Content31 extends Component {
  constructor(props) {
    super();
    this.comRef = React.createRef();
  }
  clickHandle = () => {
    console.log(this);
    console.log(this.comRef); // {current: ChildCom1}
    this.comRef.current.test();
  }
  render() {
    return (
      <div>
        {/* ref 关联子组件 */}
        <Conten31Child1 ref={this.comRef}/>
        <button onClick={this.clickHandle}>触发子组件方法</button>
      </div>
    )
  }
}
