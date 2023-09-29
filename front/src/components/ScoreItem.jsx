import React, { useState } from 'react';
import { Avatar } from 'antd';
import classname from 'classnames';
import styles from '../css/ScoreItem.module.css';

function ScoreItem(props) {
  const data = props;
  const [classCollection] = useState({
    iconfont: true,
    'icon-jiangbei': true,
  });

  let rankNum = null;
  switch (data.rank) {
    case 1: {
      rankNum = (
        <div
          style={{
            color: '#ffda23',
            fontSize: '22px',
          }}
          className={classname(classCollection)}
        />
      );
      break;
    }
    case 2: {
      rankNum = (
        <div
          style={{
            color: '#c5c5c5',
            fontSize: '22px',
          }}
          className={classname(classCollection)}
        />
      );
      break;
    }
    case 3: {
      rankNum = (
        <div
          style={{
            color: '#cd9a62',
            fontSize: '22px',
          }}
          className={classname(classCollection)}
        />
      );
      break;
    }
    default: {
      rankNum = (
        <div className={styles.rank}>{data.rank}</div>
      );
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        {rankNum}
        <div className={styles.avatar}>
          <Avatar size="small" src={data.rankInfo.avatar} />
        </div>
        <div className={styles.nickname}>{data.rankInfo.nickname}</div>
      </div>
      <div className={styles.right}>{data.rankInfo.points}</div>
    </div>
  );
}

export default ScoreItem;
