import React from 'react';
import ChlidContent1 from './ChlidContent1';
function Content1() {
  return (
      <div style={{
        position:'relative',
        fontFamily: '冬青黑体简体中文',
        fontSize: 20,
        left:'30px'
      }}>
        Hello React
       <p>============================================</p>
        <ChlidContent1
          name='xiejie'
          age={'19'}
          score={[98, '97', 100]}>
          <div>ChlidContent1</div>
        </ChlidContent1>
      </div> 
  );
}

export default Content1;
