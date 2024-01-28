import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from '../css/LoginFirst.module.css';
import {
  ExclamationOutlined
} from '@ant-design/icons';
import { Space } from 'antd';
function LoginFirst(props) {
  const { t } = useTranslation();
  return (
    <div style={{backgroundColor:'white'}}>
      <p className={styles.text}><Space className={styles.icon}><ExclamationOutlined /></Space>&nbsp;{t('loginFirst.warn')}</p>
    </div>
  );
}

export default LoginFirst;
