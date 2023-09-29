import React, { useState, useEffect } from 'react';
import { Tree, BackTop, Button ,Modal} from 'antd';
import { PlusOutlined  }from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviewTitleList } from '../redux/interviewSlice';
import { getTypeList } from '../redux/typeSlice';
import { getInterviewById } from '../api/interview';
import PageHeader from '../components/PageHeader';
import styles from '../css/Interview.module.css';

function Interviews(props) {
  const dispatch = useDispatch();
  const { typeList } = useSelector((state) => state.type);
  const { interviewTitleList } = useSelector((state) => state.interview);
  const [treeData, setTreeData] = useState([]);
  const [interviewInfo, setInterviewInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState('Content of the modal');

  const showModal = () => {
    setOpen(true);
  };
  
  const handleOk = () => {
    setModalText('The modal will be closed after two seconds');
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };
  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch(getInterviewTitleList());
    }
    if (!typeList.length) {
      dispatch(getTypeList());
    }
    if (typeList.length && interviewTitleList.length) {
      // 开始组装 treeData
      const arr = [];
      for (let i = 0; i < typeList.length; i++) {
        arr.push({
          title: (
            <h3
              style={{
                fontWeight: '200',
              }}>
              {typeList[i].typeName}
            </h3>
          ),
          key: i,
        });
      }
      for (let i = 0; i < interviewTitleList.length; i++) {
        const childrenArr = [];
        for (let j = 0; j < interviewTitleList[i].length; j++) {
          childrenArr.push({
            title: (
              <h4
                onClick={() => clickHandle(interviewTitleList[i][j]._id)}
                style={{
                  fontWeight: '200',
                }}>
                {interviewTitleList[i][j].interviewTitle}
              </h4>
            ),
            key: `${i}-${j}`,
          });
        }
        arr[i].children = childrenArr;
      }
      setTreeData(arr);
    }
  }, [typeList, interviewTitleList]);

  async function clickHandle(interviewId) {
    const { data } = await getInterviewById(interviewId);
    setInterviewInfo(data);
  }

  let interviewRightSide = null;
  if (interviewInfo) {
    interviewRightSide = (
      <div className={styles.content}>
        <h1 className={styles.interviewRightTitle}>{interviewInfo?.interviewTitle}</h1>
        <div className={styles.contentContainer}>
          <div dangerouslySetInnerHTML={{ __html: interviewInfo?.interviewContent }} />
        </div>
      </div>
    );
  } else {
    interviewRightSide = (
      <div
        style={{
          textAlign: 'center',
          fontSize: '40px',
          fontWeight: '100',
          marginTop: '150px',
        }}>
        请在左侧选择面试题
      </div>
    );
  }

  return (
      <div className={styles.container}>
        <PageHeader title='面试题大全' />
        <div className={styles.interviewContainer}>
          <div className={styles.leftSide}>
          <Button className={styles.plusBtn} onClick={ showModal }><PlusOutlined /></Button>
            <Tree treeData={treeData} />
          </div>
          <div className={styles.rightSide}>{interviewRightSide}</div>
        </div>
        <BackTop />
        <Modal
        open={open}
        width='800'
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className={styles.modalContent}>
          title:<input name='title' className={styles.ipt}></input>
          <br />
          content:<textarea  className={styles.textArea}name='content'></textarea>
        </div>
      </Modal>
      </div>
  );
}

export default Interviews;
