/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { Image } from 'antd';

import styles from '../css/BookItem.module.css';

function BookItem(props) {
  const data = props;
  const reg = /<[^<>]+>/g;
  const bookIntro = data.bookInfo.bookIntro.replace(reg, '');

  return (
    <div className={styles.container}>
      {/* 评论数 */}
      <div className={styles.bookNum}>
        <div>{data.bookInfo.commentNumber}</div>
        <div>评论</div>
      </div>
      {/* 浏览数 */}
      <div className={styles.bookNum}>
        <div>{data.bookInfo.scanNumber}</div>
        <div>浏览</div>
      </div>
      {/* 书籍内容 */}
      <div className={styles.bookContainer}>
        {/* 左边图片 */}
        <div className={styles.left}>
          <Image className={styles.bookPic} src={data.bookInfo.bookPic} />
        </div>
        {/* 右侧分为上下 */}
        <div className={styles.right}>
          <div className={styles.top} onClick={() => navigate(`/book/${data.bookInfo._id}`)}>{data.bookInfo.bookTitle}</div>
          <div className={styles.bottom}>{`${bookIntro.slice(0, 55)}...`}</div>
        </div>
      </div>
    </div>
  );
}

export default BookItem;
