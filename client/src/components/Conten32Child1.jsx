import React, { Component } from 'react';

export default class Content32Child1 extends Component {
  test = () => {
    console.log('这是子组件的Content32Child1 test 方法');
  };

  render() {
    return <div style={{lineHeight:'65px'}}>子组件</div>;
  }
}
