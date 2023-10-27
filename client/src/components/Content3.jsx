import React ,{useState}from 'react';
import Conten3Child1 from './Conten3Child1';
import styles from '../css/LearnReact.module.css';
import Conten3Child2 from './Conten3Child2';
import Content31 from './Content31';
import Content32 from './Content32';

function Content3() {

  return (
    <div className={styles.title} >
      ●&nbsp;&nbsp;Ref
       <p style={{ fontSize: 20 }}>有些时候,我们需要操作DOM元素,例如官方所列举的这几个场景:</p>
       <li className={styles.li}>管理焦点，文本选择或媒体播放</li>
       <li className={styles.li}>触发强制动画</li>
       <li className={styles.li}>集成第三方DOM库</li>
      <p style={{fontSize: 20}}>在最最早期的时候,React中Ref的用法非常简单,类似于Vue,给一个字符串类型的值,
      之后在方法中通过<code>this.refs.xxx</code>就能够引用到。</p>
     <Conten3Child1/>
     <br/>

     ●&nbsp;&nbsp;CreateRef
     <Conten3Child2/>
     <br/>

     ●&nbsp;&nbsp;触发子组件的方法
     <Content31/>
     <br/>
     ●&nbsp;&nbsp;Ref转发
     <p>如果没有Ref转发,在高阶组件中使用Ref会遇到什么问题:</p>
     <Content32/>
     <p className={styles.p}>我们使用了 withLog2这个高阶组件来包裹 Conten32Child1 子组件，从而添加日志功能。在使用由高阶组件返回的增强组件时，</p>
     <p className={styles.p2}>我们传递了一个Ref,我们的本意是想要这个Ref关联原本的子组件,从而可以触发子组件里面的方法。</p>
     <p className={styles.p3}>要解决这个问题就会涉及到Ref的转发。说直白一点就是Ref的向下传递给子组件。</p>
     <p className={styles.p4}>这里React官方为我们提供了一个React.forwardRef API。我们需要修改的仅仅是高阶组件:</p>


     </div>
  );
}

export default Content3;
