import React, { Component } from 'react'

export default class Conten3Child2 extends Component {

  // 我们创建 *Ref* 不再是通过字符串的形式，而是采用的 *createRef* 这个静态方法创建了一个 *Ref* 对象，
  // 并在组件实例上面新增了一个 *inputRef* 属性来保存这个 *Ref* 对象。  

  constructor(props) {
    super();
    this.inputRef = React.createRef();
    console.log(this.inputRef); // {current: null}
  }
  clickHandle = () => {
    console.log(this.inputRef); // {current: input}
    this.inputRef.current.focus();
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef}/>
        <button onClick={this.clickHandle}>聚焦</button>
      </div>
    )
  }
}
