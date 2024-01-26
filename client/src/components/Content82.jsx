import React, { PureComponent } from 'react';
import '../css/LearnReact.css';
import { Button } from 'antd';
export default class Content82 extends PureComponent {
  constructor() {
    super();
    this.state = {
      counter: 1,
    };
    this.plus = this.plus.bind(this);
    this.minus = this.minus.bind(this);
    this.default = this.default.bind(this);
  }

  plus(){
    this.setState({ counter: this.state.counter + 1 })
  }
  minus(){
    this.setState({ counter: this.state.counter - 1 })
  }
  default(){
    this.setState({ counter: 1 })
  }
  render() {
    console.log('App 渲染了');
    return (
      <div>
        <h1>App 组件</h1>
        <div className='p'>{this.state.counter}</div>
        <Button className='btn2' onClick={this.plus}> +1 </Button>
        <Button className='btn2' onClick={this.minus}> -1 </Button>
        <Button className='btn2' onClick={this.default}> 1 </Button>
      </div>
    );
  }
}
