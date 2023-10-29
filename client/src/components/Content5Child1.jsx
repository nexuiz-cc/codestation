import React from 'react';

function Content5Child1(props) {
  return (
    <div
      style={{ width: '400px', height: '400px', backgroundColor: 'red', color: 'white' }}
      onMouseMove={props.mouseMoveHandle}>
      <h1 style={{ color: 'white' }}>移动鼠标</h1>
      <p>
        当前鼠标的位置： {props.points.x} y {props.points.y}
      </p>
    </div>
  );
}
export default Content5Child1;
