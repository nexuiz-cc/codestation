import React from 'react';
import '../css/LearnReact.css';
import Content81 from './Content81';
import Content82 from './Content82';
function Content8(props) {
  return (
    <div className='root'>
      <br />
      <Content81/>
      <br />
      <p className='p'>我们在类组件中书写了一个 shouldComponentUpdate 的生命周期钩子函数,该函数会在渲染执行之前被调用,</p>
      <p className='p'>函数内部能够接收到新的属性和新的状态，我们要做的就是让新的属性和状态和当前的属性以及状态进行浅比较，</p>  
      <p className='p'>如果相同则返回false,也就是不重新渲染。</p>
      <p className='p'>现在React官方已经提供了PureComponent,因此一般情况下我们是不需要手写shouldComponentUpdate的。</p>
      <p className='p'>React.PureComponent与React.Component很相似。两者的区别在于React.Component并未实现shouldComponentUpdate()</p>
      <p className='p'>而React.PureComponent中以浅层对比prop和state的方式来实现了该函数。</p>
      <Content82/>
      <br />
      <br />
      <p className='p'>● React.memo</p>
    </div>
  );
}

export default Content8;
