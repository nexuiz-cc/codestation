import React, { useState } from 'react';
import Conten3Child1 from './Conten3Child1';
import styles from '../css/LearnReact.module.css';
import Conten3Child2 from './Conten3Child2';
import Content31 from './Content31';
import Content32 from './Content32';
import Content33 from './Content33';
import Content34 from './Content34';
import Content35 from './Content35';
import Content36 from './Content36';

function Content3() {

  return (
    <div className={styles.title} >
      ●&nbsp;&nbsp;Ref
      <p style={{ fontSize: 20 }}>有些时候,我们需要操作DOM元素,例如官方所列举的这几个场景:</p>
      <li className={styles.li}>管理焦点，文本选择或媒体播放</li>
      <li className={styles.li}>触发强制动画</li>
      <li className={styles.li}>集成第三方DOM库</li>
      <p style={{ fontSize: 20 }}>在最最早期的时候,React中Ref的用法非常简单,类似于Vue,给一个字符串类型的值,
        之后在方法中通过<code>this.refs.xxx</code>就能够引用到。</p>
      <Conten3Child1/>
      <br />
      ●&nbsp;&nbsp;CreateRef
      <Conten3Child2/>
      <br />
      ●&nbsp;&nbsp;触发子组件的方法
      <Content31 />
      <br />
      ●&nbsp;&nbsp;Ref转发
      <p>如果没有Ref转发,在高阶组件中使用Ref会遇到什么问题:</p>
      <Content32 />
      <p className={styles.p}>我们使用了 withLog2这个高阶组件来包裹 Conten32Child1 子组件，从而添加日志功能。在使用由高阶组件返回的增强组件时，</p>
      <p className={styles.p}>我们传递了一个Ref,我们的本意是想要这个Ref关联原本的子组件,从而可以触发子组件里面的方法。</p>
      <p className={styles.p}>要解决这个问题就会涉及到Ref的转发。说直白一点就是Ref的向下传递给子组件。</p>
      <p className={styles.p}>这里React官方为我们提供了一个React.forwardRef API。我们需要修改的仅仅是高阶组件:</p>
      <Content33 />
      <h4 className={styles.h4}> ●&nbsp;&nbsp;<code>useRef</code><code>与useImperativeHandle</code></h4>
      <p className={styles.p}>遇到函数组件下如何进行Ref的关联？</p>
      <p className={styles.p}>在函数组件中,官方为我们提供了新的useRef这个Hook来进行关联,但是也可以使用createRef API.</p>
      <Content34 />
      <p className={styles.p}>虽然createRef和useRef都是创建Ref的,但是还是有一些区别,主要体现在下面的点：</p>
      <li className={styles.p} style={{ lineHeight: 1.5 }}>useRef是hooks的一种,一般用于function组件,而
        <code className={styles.code}>createRef</code>
          一般用于class组件
      </li>
      <li className={styles.p} style={{ lineHeight: 1.5, paddingBottom:'15px' }}>
        由<code className={styles.code}>useRef</code>
          创建的ref对象在组件的整个生命周期内都不会改变,但是由
        <code className={styles.code}>createRef</code>
          创建的ref对象,组件每更新一次,ref对象就会被重新创建</li>
      <p className={styles.p}>实际上就是因为在函数式组件中使用
        <code className={styles.code}>createRef</code>
        创建ref时存在弊端,组件每次更新ref对象就会被重新创建,所以出现了
        <code className={styles.code}>useRef</code>来解决这个问题。
      </p>
      <p>此时根据<strong><code>useRef</code></strong>在组件的整个生命周期内都不会改变的特性,我们可以将定时器变量存储到<strong><code>useRef</code></strong>所创建的对象上面,示例如下:</p>
      <Content35/>
      <p className={styles.p} style={{ lineHeight: 1.2, paddingTop:'15px' }}>上面的写法存在一个问题,如果这个组件里有state变化或者他的父组件重新render等原因导致这个App组件重新render的时候,我们会发现,</p>
      <p className={styles.p}>点击停止按钮,定时器依然会不断的在控制台打印,定时器清除事件无效了。因为组件重新渲染之后,</p>
      <p className={styles.p}>这里的
        <code className={styles.code}>timer</code>
        以及
        <code className={styles.code}>clearTimer</code>
        方法都会重新创建,
        <code className={styles.code}>timer</code>
        已经不是存储的之前的定时器的变量了。
      </p>
      <p className={styles.p}>
        <code className={styles.code} >useRef</code>
        还接受一个初始值,
        这在用作关联DOM元素时通常没什么用,但是在作为存储不需要变化的全局变量时则非常方便。来看下面的例子：
      </p>
      <Content36/>
    </div>
  );
}

export default Content3;
