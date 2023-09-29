import React from 'react';
import styles from '../css/RecommendItem.module.css';

function RecommendItem(props) {
  const data = props;
  return (
    <a className={styles.container} href={data.recommendInfo.href} target="_blank" rel="noreferrer">
      <div className={styles.leftSide}>{data.recommendInfo.num}</div>
      <div className={styles.rightSide}>{data.recommendInfo.title}</div>
    </a>
  );
}

export default RecommendItem;
