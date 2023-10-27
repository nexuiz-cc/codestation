import React from 'react';

function Conten2Child2(props) {
  return (
    <div
      style={{
        position: 'relative',
        fontFamily: '冬青黑体简体中文',
        fontSize: 20,
        left: '30px',
      }}>
      子组件2 年龄：{props.age}
    </div>
  );
}

export default Conten2Child2;
