/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Tag } from 'antd';
import { getTypeList } from '../redux/typeSlice';
import styles from '../css/IssueItem.module.css';
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tool';

function IssueItem(props) {
  const propsdata = props;
  const navigate = useNavigate();
  // 从仓库获取类型列表
  const { typeList } = useSelector((state) => state.type);
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState(null);
  const colorArr = ['#108ee9', '#2db7f5', '#f50', 'green', '#87d068', 'blue', 'red', 'purple'];
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    async function fetchUserData() {
      const { data } = await getUserById(propsdata.issueInfo.userId);
      setUserInfo(data);
    }
    fetchUserData();
  }, []);

  const type = typeList.find((item) => item._id === propsdata.issueInfo.typeId);
  return (
    <div className={styles.container}>
      {/* 回答数 */}
      <div className={styles.issueNum}>
        <div>{propsdata.issueInfo.commentNumber}</div>
        <div>回答</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.issueNum}>
        <div>{propsdata.issueInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 问题内容 */}
      <div className={styles.issueContainer}>
        <div className={styles.top} onClick={() => navigate(`/issues/${propsdata.issueInfo._id}`)}>{propsdata.issueInfo.issueTitle}</div>
        <div className={styles.bottom}>
          <div className={styles.left}>
            <Tag color={colorArr[typeList.indexOf(type) % colorArr.length]}>{type.typeName}</Tag>
          </div>
          <div className={styles.right}>
            <Tag color="volcano">{userInfo?.nickname}</Tag>
            <span>{formatDate(propsdata.issueInfo.issueDate, 'year')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueItem;
