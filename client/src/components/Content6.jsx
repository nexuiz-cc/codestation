import React from 'react';
import '../css/LearnReact.css';
import { Code } from '@atlaskit/code';
import Content61 from './Content61';
function Content6(props) {
  return (
    <div className='root'>
      <h4 className='h4'>Portal提供了一种将子节点渲染到存在于父组件以外的DOM节点的优秀的方案。</h4>
      <p className='p'>其语法为：</p>
      <Code className='code' style={{position:'relative',top:'-5px'}}>&nbsp;ReactDOM.createPortal(child, container)&nbsp;</Code>
      <p className='p' style={{position:'relative',top:'10px'}}>第一个参数（child）是任何可渲染的React子元素,第二个参数（container）是一个DOM元素。</p>
      <h4 className='h4'>● 什么场景下需要使用Portals?</h4>
      <Content61/>
      <p className='p'>尽管portal可以被放置在DOM树中的任何地方,但在任何其他方面,其行为和普通的React子节点行为一致。</p>
      <p className='p'>由于portal仍存在于React树,且与DOM树中的位置无关,那么无论其子节点是否是portal,像context这样的功能特性都是不变的。</p>
      <p className='p'>这包含事件冒泡。一个从portal内部触发的事件会一直冒泡至包含React树的祖先,即便这些元素并不是DOM树中的祖先。</p>
    </div>
  );
}

export default Content6;
