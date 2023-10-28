import React, { Component } from 'react';

export default class Conten31Child1 extends Component {
  test = () => {
    console.log('这是子组件的 test 方法');
  };

  render() {
    return <div style={{lineHeight:'65px'}}>子组件</div>;
  }
}
