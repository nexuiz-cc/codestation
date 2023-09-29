/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import React, { useState, useLayoutEffect } from 'react';
import { Layout, message } from 'antd';
import { useDispatch } from 'react-redux';
import RouterBefore from './src/router/RouteBefore';
import NavHeader from './src/components/NavHeader';
import PageFooter from './src/components/PageFooter';
import Login from './src/components/LoginForm';
import { changeLoginStatus, initUserInfo } from './src/redux/userSlice';
import { getInfo, getUserById } from './src/api/user';
import { getTypeList } from './src/redux/typeSlice';
import './src/css/App.css';

const { Header, Footer, Content } = Layout;

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    // 第一次进入应用，确认用户的登录状态
    async function whoami() {
      const result = await getInfo();
      if (result.data) {
        // token 验证成功

        // 根据 id 获取
        const { data } = await getUserById(result.data._id);
        dispatch(initUserInfo(data));
        dispatch(changeLoginStatus(true));
      } else {
        message.warning(result.msg);
        localStorage.removeItem('userToken');
      }
    }
    if (localStorage.getItem('userToken')) {
      whoami();
    }

    // 填充仓库的类型列表
    dispatch(getTypeList());
  }, []);

  /**
   * 打开登录模态框
   */
  function loginHandle() {
    setIsModalOpen(true);
  }

  /**
   * 关闭登录模态框
   */
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="App">
      <Layout>
        {/* 头部 */}
        <Header className="header">
          <NavHeader loginHandle={loginHandle()} />
        </Header>
        {/* 内容区域 */}
        <Content className="content">
          <RouterBefore />
        </Content>
        <Footer className="footer">
          <PageFooter />
        </Footer>
      </Layout>
      {/* 登录弹窗 */}
      <Login isShow={isModalOpen} closeModal={closeModal()} />
    </div>
  );
}

export default App;
