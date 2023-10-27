import React from 'react';

function Conten2Child1(props) {
  return (
    <div
      style={{
        position: 'relative',
        fontFamily: '冬青黑体简体中文',
        fontSize: 20,
        left: '30px',
      }}>
      子组件1 姓名：{props.name}
    </div>
  );
}

export default Conten2Child1;
