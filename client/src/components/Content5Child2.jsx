import React from 'react';

function Content5Child2(props) {
  return (
    <div
      style={{
        width: '400px',
        height: '400px',
        backgroundColor: 'grey',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseMove={props.mouseMoveHandle}>
      <h1>移动鼠标</h1>
      <div
        style={{
          width: '15px',
          height: '15px',
          borderRadius: '50%',
          backgroundColor: 'orange',
          position: 'absolute',
          left: props.points.x-748,
          top: props.points.y -262,
        }}></div>
    </div>
  );
}

export default Content5Child2;
