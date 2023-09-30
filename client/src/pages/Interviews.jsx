import React, { useState, useEffect, useRef } from 'react';
import { Tree, BackTop, Button ,Modal,Form,Input,Select} from 'antd';
import { PlusOutlined  }from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { getInterviewTitleList } from '../redux/interviewSlice';
import { getTypeList } from '../redux/typeSlice';
import { getInterviewById ,addInterview} from '../api/interview';
import PageHeader from '../components/PageHeader';
import styles from '../css/Interview.module.css';
import { typeOptionCreator } from "../utils/tool"

function Interviews(props) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const { TextArea } = Input;
  const { typeList } = useSelector((state) => state.type);
  const { interviewTitleList } = useSelector((state) => state.interview);
  const [treeData, setTreeData] = useState([]);
  const [interviewInfo, setInterviewInfo] = useState(null);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { userInfo } = useSelector(state => state.user);
  const [addinterviewInfo, setaddIssueInfo] = useState({
    newTitle: "", // 问题标题
    newContent: "", // 问题描述
    typeId: "", // 问题分类
});
  const showModal = () => {
    setOpen(true);
  };
  const handleChange = (value) => {
    updateInfo(value, 'typeId')
};
  function addHandle() {
    addInterview({
        interviewTitle: addinterviewInfo.newTitle, // 问题标题
        interviewContent: addinterviewInfo.newContent, // 问题描述
        userId: userInfo._id, // 用户 id
        typeId : addinterviewInfo.typeId,
    });
    handleOk();
}
function updateInfo(newInfo, key) {
  const newInterviewInfo = { ...addinterviewInfo };
  if (typeof newInfo === 'string') {
    newInterviewInfo[key] = newInfo.trim();
  } else {
    newInterviewInfo[key] = newInfo;
  }
  setaddIssueInfo(newInterviewInfo);
}

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 1500);
    location.reload();
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
        <PageHeader title='面接質問集' />
        <div className={styles.interviewContainer}>
          <div className={styles.leftSide}>
          <Button className={styles.plusBtn} onClick={ showModal }><PlusOutlined /></Button>
            <Tree treeData={treeData} />
          </div>
          <div className={styles.rightSide}>{interviewRightSide}</div>
        </div>
        <BackTop />
        <Modal
        title="Title"
        open={open}
        onOk={addHandle}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <div className={styles.modalContent}>
            <Form name="basic" initialValues={addinterviewInfo} autoComplete="off" ref={formRef}   onFinish={addHandle}>
               <Form.Item label="标题" name="interviewTitle"  rules={[{ required: true, message: '请输入标题' }]} >
                  <Input placeholder="interviewTitle"   size="large"   value={addinterviewInfo.newTitle} 
                         onChange={(e) => updateInfo(e.target.value, 'newTitle')}/>
               </Form.Item>

               <Form.Item label="内容" name="interviewContent"  rules={[{ required: true, message: '请输入内容' }]} >
                  <TextArea showCount height='300' placeholder="interviewContent"   
                  size="large"   value={addinterviewInfo.newContent} 
                  onChange={(e) => updateInfo(e.target.value, 'newContent')}/>
               </Form.Item>

      

               <Form.Item
                    label="分类"
                    name="typeId"
                    rules={[{ required: true, message: '请选择问题所属分类' }]}
                >
                    <Select
                        style={{ width: 200 }}
                        onChange={handleChange}>
                        {typeOptionCreator(Select, typeList)}
                    </Select>
                </Form.Item>

             </Form>
          </div>
      </Modal>
         
    
      </div>
  );
}

export default Interviews;
