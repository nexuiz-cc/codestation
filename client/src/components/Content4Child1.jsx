import React from 'react';
import Content4Child2 from './Content4Child2';
import Content4Child3 from './Content4Child3';
import Content4Child4 from './Content4Child4';
import styles from '../css/LearnReact.module.css';

function Content4Child1(props) {
  return (
    <div className={styles.border2}>
      <p className={styles.child}>Child1</p>
      <Content4Child2 />
      <Content4Child3 />
      <Content4Child4 />
    </div>
  );
}

export default Content4Child1;
