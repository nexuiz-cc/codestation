import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import styles from '../css/LearnReact.module.css';
import '../css/LearnReact.css';
import { MyContext } from '../context';
function LearnReact() {
  const { Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const getItem = (label, key, icon, children) => {
    return { key, icon, children, label };
  };
  const items = [
    getItem('1. 属性默认值和类型验证', '1'), 
    getItem('2. 高阶组件', '2' ), 
    getItem('3. Ref', '3'),
    getItem('4. Context', '4' ),
    getItem('5. Render Props', '5'),
    getItem('6. Portals', '6'),
    getItem('7. 错误边界', '7'),
    getItem('8. 组件渲染性能优化','8'),
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
    } else if (info.keyPath[0] == '5') {
      navigate('/learnReact/content5');
    }else if (info.keyPath[0] == '6') {
      navigate('/learnReact/content6');
    }else if (info.keyPath[0] == '7') {
      navigate('/learnReact/content7');
    }else if (info.keyPath[0] == '8') {
      navigate('/learnReact/content8');
    }
  };
  return (
    <MyContext.Provider value={{text:'MyContext'}}>
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
    </MyContext.Provider>
  );
}

export default LearnReact;
