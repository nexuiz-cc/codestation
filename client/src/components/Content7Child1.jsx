import React from 'react';
import '../css/LearnReact.css';
import Content7Child3 from './Content7Child3';
function Content7Child1(props) {
  return (
    <div style={{ width: '300px', height: '300px', border: '1px solid' }}>
      Content7Child1
      <Content7Child3 />
    </div>
  );
}

export default Content7Child1;
