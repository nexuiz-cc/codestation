import React ,{useContext}from 'react';
import { MyContext1 } from '../context';
import styles from '../css/LearnReact.module.css';
function Content4Child4(props) {
  const { a, b, c } = useContext(MyContext1);
  return (
    <div className={styles.border3}>
      Child4
      <div>a:{a}</div>
      <div>b:{b}</div>
      <div>c:{c}</div>
    </div>
  );
}

export default Content4Child4;
