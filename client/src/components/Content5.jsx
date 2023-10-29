import React from 'react';
import styles from '../css/LearnReact.module.css';
import Content51 from './Content51';

function Content5(props) {
  return (
    <div className={styles.root} style={{fontSize:'16px'}}>
      <p className={styles.p}>在React中,代码复用的最基本单位就是组件,但是如果组件中也出现了重复的代码,该怎么做呢？</p>
      <p className={styles.p}>那么我们需要通过某种方式将代码中公共的部分抽取出来,这些公共的部分就被称之为横切关注点（Cross-Cutting Concerns）</p>
      <p className={styles.p}>在React中,常见有两种方式来进行横切关注点的抽离： </p>
      <li>高阶组件(HOC)</li>
      <li>Render Props</li>
      <Content51/>
    </div>
  );
}

export default Content5;
