import React from 'react';
import { MyContext1, MyContext2 } from '../context';
import styles from '../css/LearnReact.module.css';
function Content4Child3(props) {
  return (
    <MyContext1.Consumer>
      {(context) => {
        return (
          <MyContext2.Consumer>
            {(context) => (
              <div className={styles.border3}>
               <p className={styles.child}>Child3</p>
               <div className={styles.cont}>
                <div>a:{context.a}</div>
                <div>b:{context.b}</div>
                <div>c:{context.c}</div>
                <div>a:{context.a}</div>
                <div>b:{context.b}</div>
                <div>c:{context.c}</div>
               </div>
     
              </div>
            )}
          </MyContext2.Consumer>
        );
      }}
    </MyContext1.Consumer>
  );
}

export default Content4Child3;
