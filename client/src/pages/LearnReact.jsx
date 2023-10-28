import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from '../css/LearnReact.module.css';

function LearnReact() {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const getItem = (label, key, icon, children) => {
    return { key, icon, children, label };
  };
  const items = [
    getItem('1. 属性默认值和类型验证', '1', <FormOutlined />), 
    getItem('2. 高阶组件', '2', <FormOutlined />), 
    getItem('3. Ref', '3', <FormOutlined />),
    getItem('4. Context', '4', <FormOutlined />),
  ];

  const handleClick = (info) => {
    if (info.keyPath[0] == '1') {
      navigate('/learnReact/content1');
    } else if (info.keyPath[0] == '2') {
      navigate('/learnReact/content2');
    } else if (info.keyPath[0] == '3') {
      navigate('/learnReact/content3');
    }else if (info.keyPath[0] == '4') {
      navigate('/learnReact/content4');
    }
  };
  return (
    <Layout>
      <Sider
        width={250}
        className={styles.sider} >
        <Menu
          theme='dark'
          onClick={handleClick}
          defaultSelectedKeys={['1']}
          items={items}
          className={styles.menu}
          style={{
            fontSize: '15px',
            fontFamily: '冬青黑体简体中文',
            backgroundColor: '#001529',
            marginTop: '-2px',
            height: '2000px',
          }}
        />
      </Sider>
      <Outlet />
    </Layout>
  );
}

export default LearnReact;
