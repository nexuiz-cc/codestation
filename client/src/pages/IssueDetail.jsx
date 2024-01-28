import React , { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import ScoreRank from '../components/ScoreRank';
import Recommend from '../components/Recommend';
import Discuss from '../components/Discuss';
import { useParams } from 'react-router-dom';
import { Avatar } from 'antd';
import { getIssueById } from '../api/issue';
import { getUserById } from '../api/user';
import { formatDate } from '../utils/tool';
import { updateIssue } from '../api/issue';
import { useTranslation } from 'react-i18next';
import styles from '../css/IssueDetail.module.css';

function IssueDetail(props) {
  const { id } = useParams(); // 获取可能传递过来的 id
  const [issueInfo, setIssueInfo] = useState(null);
  const { t } = useTranslation();
  const [issueUser, setIssueUserName] = useState(null);

  // 根据传递过来的 id 获取面试题详情
  useEffect(() => {
    async function fetchData() {
      const { data } = await getIssueById(id);
      setIssueInfo(data);
      const result = await getUserById(data.userId);
      setIssueUserName(result.data);
      updateIssue(data._id, {
        scanNumber: ++data.scanNumber,
      });
    }
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <PageHeader title={t('issue.issueDetail')} />
      <div className={styles.detailContainer}>
        <div className={styles.leftSide}>
          <div className={styles.question}>
            <h1>{issueInfo?.issueTitle}</h1>
            <div className={styles.questioner}>
              <Avatar  size='small'  src={issueUser?.avatar}/>
              <span className={styles.user}>{issueUser?.nickname}</span>
              <span>发布于：{formatDate(issueInfo?.issueDate)}</span>
            </div>
            <div className={styles.content}>
              <div dangerouslySetInnerHTML={{ __html: issueInfo?.issueContent }}></div>
            </div>
          </div>
          {/* 下方评论模块 */}
          <Discuss issueInfo={issueInfo}  commentType={1} targetId={issueInfo?._id} />
        </div>
        {/* 右侧 */}
        <div className={styles.rightSide}>
          <div style={{ marginBottom: 20 }}>
            <Recommend />
          </div>
          <div style={{ marginBottom: 20 }}>
            <ScoreRank />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IssueDetail;
