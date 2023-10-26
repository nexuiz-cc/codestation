import React, { useState } from 'react';
import { Layout, Menu, Button } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import styles from '../css/LearnReact.module.css';

function LearnReact(props) {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const items = [getItem('Content 1', '1', <FormOutlined />), getItem('Content 2', '2', <FormOutlined />)];

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const handleClick = (info) => {
    console.log('click >>> ', info);
    if (info.keyPath[0] == '1') {
      navigate('/learnReact/content1');
    } else if (info.keyPath[0] == '2') {
      navigate('/learnReact/content2');
    }
  };
  return (
    <Layout
      style={{
        minHeight: '100%',
      }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}>
        <Menu
          theme='dark'
          mode='inline'
          onClick={handleClick}
          defaultSelectedKeys={['1']}
          items={items}
          className={styles.menu}
        />
      </Sider>

      <Layout>
        <Content
          style={{
            margin: '0 16px',
          }}>
            <Outlet></Outlet>
        </Content>
      </Layout>
    </Layout>
  );
}

export default LearnReact;
