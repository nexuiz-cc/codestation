import React, { Component } from 'react';
import { objectEqual } from '../utils/tool';
import { Button } from 'antd';

export default class Content81 extends Component {
  constructor() {
    super();
    this.state = {
      counter: 1
    };
  }
 /**
   * 
   * @param {*} nextProps 新的 props
   * @param {*} nextState 新的 state
   * @returns 
   */
 shouldComponentUpdate(nextProps, nextState) {
    // shouldComponentUpdate会根据返回值来决定是否重新渲染
    // 默认是 true，要重新渲染
    // 如果返回 false，则不会重新渲染
    // 我们就需要将当前的 props 和 state 与新的 props 和 state 进行一个比较
    if (objectEqual(this.props, nextProps) && objectEqual(this.state, nextState)) {
      // 如果新旧 props 和 state 都是相同的，那么就返回 false，不需要重新渲染
      return false;
    }
    return true;
  }

  render() {
    console.log("App 渲染了");
    return (
      <div>
        <br />
        <h1 className='p'>APP组件</h1>
        <br />     
        <h4 className='h4'> ● shouldComponentUpdate</h4>
        <div className='p'style={{paddingBottom:'10px',paddingTop:'10px'}}>{this.state.counter}</div>
        <Button className='btn2' onClick={() => this.setState({ counter: this.state.counter + 1 })}>+1</Button>
        <Button className='btn2' onClick={() => this.setState({ counter: this.state.counter - 1 })}>-1</Button>
        <Button className='btn2' onClick={() => this.setState({ counter: 1 })}>1</Button>
        <br />
      </div>
    )
  }
}
