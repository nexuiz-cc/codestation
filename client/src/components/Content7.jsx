import React from 'react';
import '../css/LearnReact.css';
import Content71 from './Content71';
function Content7(props) {
  return (
    <div className='root'>
      <br />
      <p className='p'>错误边界是一种React组件,这种组件可以捕获发生在其子组件树任何位置的JavaScript错误,并打印这些错误,同时展示降级UI,</p>
      <p className='p'>而并不会渲染那些发生崩溃的子组件树。错误边界可以捕获发生在整个子组件树的渲染期间、生命周期方法以及构造函数中的错误。</p>
      <Content71 />
      <br />
      <p className='p'>错误边界组件主要是用来捕获UI渲染时的错误,因此如下场景中错误是无法捕获的：</p>
      <li className='p' style={{ lineHeight: 1.5 }}>事件处理</li>
      <li className='p' style={{ lineHeight: 1.5 }}>异步代码</li>
      <li className='p' style={{ lineHeight: 1.5 }}>服务端渲染</li>
      <li className='p' style={{ lineHeight: 1.5 }}>它自身抛出来的错误</li>
      <strong className='p' style={{ lineHeight: 1.5 }}>错误边界组件仅能过处理渲染子组件期间的同步错误。</strong>
    </div>
  );
}

export default Content7;
