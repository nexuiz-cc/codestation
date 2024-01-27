import React from 'react';
import styles from "../css/PersonalInfoItem.module.css"
import { Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
function PersonalInfoItem(props) {
    return (
        <div className={styles.infoContainer}>
            <div className={styles.left}>
                <Text className={styles.text}>{props.info.itemName}：</Text>
                <Text className={styles.text}>{props.info.itemValue}</Text>
            </div>
        </div>
    );
}

export default PersonalInfoItem;