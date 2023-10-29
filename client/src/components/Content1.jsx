import React, { useContext } from 'react';
import ChlidContent1 from './ChlidContent1';
import { MyContext } from '../context';

MyContext;
function Content1() {
  const text = useContext(MyContext).text
  return (
    <MyContext.Consumer>
      {(context) => {
        return (
          <div
            style={{
              position: 'relative',
              fontFamily: '冬青黑体简体中文',
              fontSize: 20,
              left: '30px',
            }}>
            Hello React
            <p>============================================</p>
            <ChlidContent1  name='xiejie' age={'19'} score={[98, '97', 100]}>
              <div>ChlidContent1</div>
            </ChlidContent1>
            <br />
            <h4>{context.text}</h4>
            <h4>{text}</h4>
          </div>
        )
      }}
    </MyContext.Consumer>
  );
}

export default Content1;
