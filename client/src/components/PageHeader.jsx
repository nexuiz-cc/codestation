/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Button, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import styles from '../css/PageHeader.module.css';

function PageHeader(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className={styles.row}>
      <div className={styles.pageHeader}>
        {props.title}
      </div>
      {props.children}
      <Button onClick={showModal}><PlusOutlined /></Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>

  );
}

export default PageHeader;
