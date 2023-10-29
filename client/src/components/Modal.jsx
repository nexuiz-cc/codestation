import React from 'react';
import { createPortal } from 'react-dom';
import '../css/LearnReact.css';
function Modal() {
  // 之前是直接返回的一段 JSX
  // 那么现在我们就通过 Portals 来指定这段 JSX 渲染到哪里
  return createPortal(
    <div className='modal'>
      模态框
    </div>,document.getElementById('modal')
  );
}

export default Modal;
