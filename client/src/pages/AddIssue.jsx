import { Form, Button, Input, message, Select } from 'antd';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/AddIssue.module.css';
import '../css/AddIssue.css';
import { useSelector, useDispatch } from 'react-redux';
import { addIssue } from '../api/issue';
import { typeOptionCreator } from '../utils/tool';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { getTypeList } from '../redux/typeSlice';
import { useTranslation } from 'react-i18next';

function AddIssue() {
  const formRef = useRef();
  const msg1Ref = useRef();
  const msg2Ref = useRef();
  const msg3Ref = useRef();
  const editorRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const { t } = useTranslation();
  // editor 实例
  const [addIssueEditor, setAddIssueEditor] = useState(null);
  const toolbarConfig = {};
  const addIssueEditorConfig = {
    placeholder: '请输入内容...',
  };
  const [HTML, setHTML] = useState('');
  const [issueInfo, setIssueInfo] = useState({
    issueTitle: '', // 问题标题
    issueContent: '', // 问题描述
    typeId: '未选择', // 问题分类
  });
  const warn1 = (value) => {
    messageApi.open({
      type: 'error',
      content: value,
      className: 'errMsg1',
    });
  };
  // 从仓库获取类型列表
  const { typeList } = useSelector((state) => state.type);
  // 从仓库获取用户信息
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList());
    }
  }, []);

  // 用户填写内容时更新表单控件内容
  function updateInfo(newInfo, key) {
    const newIssueInfo = { ...issueInfo };
    if (typeof newInfo === 'string') {
      newIssueInfo[key] = newInfo.trim();
    } else {
      newIssueInfo[key] = newInfo;
    }
    setIssueInfo(newIssueInfo);
  }


  const onChangeIssue1 = (v) => {
    updateInfo(v.target.value, 'issueTitle');
    if (issueInfo.issueTitle != '') {
      msg1Ref.current.style.visibility = 'hidden';
    }
    
  };

  const onChangeIssue2 = (v) => {
    if (v != '未选择') {
      msg2Ref.current.style.visibility = 'hidden';
    }
    updateInfo(v, 'typeId');
  };

  const onChangeIssue3 = (v) => {
    if (HTML != '<p><br></p>') {
      msg3Ref.current.style.visibility = 'hidden';
    }
    setHTML(v.getHtml());
    updateInfo(HTML, 'issueContent');
  };

 
  /**
   * 首先获取 md 编辑器中的内容，然后再手动触发 submitHandle
   */
  function addHandle() {
    if(issueInfo.issueTitle == ''){
      msg1Ref.current.style.visibility = 'visible';
    }else {
      msg1Ref.current.style.visibility = 'hidden';
    };
    
    if(issueInfo.typeId == '未选择'){
      msg2Ref.current.style.visibility = 'visible';
    }else{
      msg2Ref.current.style.visibility = 'hidden';
    };
    
    if(HTML == '<p><br></p>'){
      msg3Ref.current.style.visibility = 'visible';
    }else{
      msg3Ref.current.style.visibility = 'hidden';
      addIssue({
        issueTitle: issueInfo.issueTitle, // 问题标题
        issueContent: HTML, // 问题描述
        userId: userInfo._id, // 用户 id
        typeId: issueInfo.typeId,
      });
      // 跳转回首页
      navigate('/issues');
      message.success('你的问题已提交，审核通过后将会进行展示');
    }
    
  }


  return (
    <div className={styles.container}>
      {contextHolder}
      <Form
        name='basic'
        initialValues={issueInfo}
        autoComplete='off'
        ref={formRef}
        onFinish={addHandle}>
        {/* 问答标题 */}
        <Form.Item
          label='标题'
          className={styles.formItem1}
          name='issueTitle'>
          <Input
            placeholder='请输入标题'
            size='large'
            value={issueInfo.issueTitle}
            onChange={(e) => onChangeIssue1(e)}
          />
          <p
            className={styles.errMsg1}
            ref={msg1Ref}>
            {t('addissue.msg1')}
          </p>
        </Form.Item>

        {/* 问题类型 */}
        <Form.Item
          label='问题分类'
          className={styles.formItem2}
          name='typeId'>
          <Select
            style={{ width: 200 }}
            defaultValue = "未选择"
            onChange={(e)=>onChangeIssue2(e)}>
            {typeOptionCreator(Select, typeList)}
          </Select>
          <p
            className={styles.errMsg2}
            ref={msg2Ref}>
            {t('addissue.msg2')}
          </p>
        </Form.Item>

        {/* 问答内容 */}
        <Form.Item
          label='问题描述'
          className={styles.formItem3}
          name='issueContent'>
          <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
              editor={addIssueEditor}
              defaultConfig={toolbarConfig}
              mode='default'
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={addIssueEditorConfig}
              value={HTML}
              onCreated={setAddIssueEditor}
              onChange={(addIssueEditor) => onChangeIssue3(addIssueEditor)}
              mode='default'
              style={{ height: '300px', overflowY: 'hidden' }}
            />
            <p
              className={styles.errMsg3}
              ref={msg3Ref}>
              {t('addissue.msg3')}
            </p>
          </div>
        </Form.Item>

        {/* 确认修改按钮 */}
        <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
          <Button
            type='primary'
            htmlType='submit'>
            确认新增
          </Button>

          <Button
            type='link'
            htmlType='submit'
            className='resetBtn'>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddIssue;
