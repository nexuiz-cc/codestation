import React from 'react';
import Content4Child1 from './Content4Child1';
import { MyContext1, MyContext2 } from "../context";
import styles from '../css/LearnReact.module.css';
function Content4(props) {
  return (
    <MyContext1.Provider value={{ a: 1, b: 2, c: 3 }}>
      <MyContext2.Provider value={{ a: 100, b: 200, c: 300 }}>
        <div className={styles.border}>
          <Content4Child1 />
        </div>
      </MyContext2.Provider>
    </MyContext1.Provider>
  );
}

export default Content4;
