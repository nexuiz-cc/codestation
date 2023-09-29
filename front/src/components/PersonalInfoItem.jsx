import React from 'react';

import styles from '../css/PersonalInfoItem.module.css';

function PersonalInfoItem(props) {
  const data = props;
  return (
    <div className={styles.infoContainer}>
      <div className={styles.left}>
        <div>
          {data.info.itemName}
          ：
        </div>
        <div>{data.info.itemValue}</div>
      </div>
    </div>
  );
}

export default PersonalInfoItem;
