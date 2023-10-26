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
    return { key, icon,  children, label };
  }
  const items = [
    getItem('1. 属性默认值和类型验证', '1', <FormOutlined />),
    getItem('2. 高阶组件', '2', <FormOutlined />)
  ];



  const handleClick = (info) => {
    if (info.keyPath[0] == '1') {
      navigate('/learnReact/content1');
    } else if (info.keyPath[0] == '2') {
      navigate('/learnReact/content2');
    }
  };
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider collapsible  collapsed={collapsed}  width={250} onCollapse={(value) => setCollapsed(value)} className={styles.sider}>
        <Menu  theme='dark' mode='inline' onClick={handleClick} defaultSelectedKeys={['1']} items={items} className={styles.menu}/>
      </Sider>
      <Layout>
        <Content style={{ margin: '0 16px' }}>
            <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearnReact;
