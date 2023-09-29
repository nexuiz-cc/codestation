/* eslint-disable react/jsx-filename-extension */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
import React from 'react';
import { Alert } from 'antd';
import RouteConfig from './index.jsx';
import RouteBeforeConfig from './RouteBeforeConfig';

function RouteBefore() {
  // 导航守卫
  const currentPath = RouteBeforeConfig.filter(
    (item) => item.path === location.pathname,
  )[0];

  function closeHandle() {
    location.pathname = '/issues';
  }

  if (currentPath) {
    if (currentPath.needLogin && !localStorage.getItem('userToken')) {
      return (
        <Alert
          message="请先登录"
          type="warning"
          closable
          onClose={closeHandle()}
        />
      );
    }
  }

  return <RouteConfig />;
}

export default RouteBefore;
