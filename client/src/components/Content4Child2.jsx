import React from 'react';
import { MyContext1, MyContext2 } from '../context';
import styles from '../css/LearnReact.module.css'
function Content4Child2(props) {
  return (
    <MyContext1.Consumer>
      {(context1) => {
        return (
          <MyContext2.Consumer>
            {(context2) => (
              <div className={styles.border3}>
                <p className={styles.child}>Child2</p>
                <div className={styles.cont}>
                  <div>a:{context1.a}</div>
                  <div>b:{context1.b}</div>
                  <div>c:{context1.c}</div>
                  <div>a:{context2.a}</div>
                  <div>b:{context2.b}</div>
                  <div>c:{context2.c}</div>
                </div>

              </div>
            )}
          </MyContext2.Consumer>
        );
      }}
    </MyContext1.Consumer>
  );
}

export default Content4Child2;
