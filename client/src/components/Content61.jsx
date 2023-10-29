import React, { useState } from 'react';
import Modal from './Modal';
import { Button } from 'antd';

function Content61(props) {
  const [isShow, setIsShow] = useState(false);
  function handleClick(e){
    e.stopPropagation();
    setIsShow(!isShow);
  }
  return (
    <div className='app' onClick={()=>console.log("App 组件被点击了")}>
      <h1>App 组件</h1>
      <Button  type="primary"  className='btn' onClick={handleClick} >显示/隐藏</Button>
      <div id='modal'>
        {isShow ? <Modal /> : null}
        <br />
      </div>
    </div>
  );
}

export default Content61;
