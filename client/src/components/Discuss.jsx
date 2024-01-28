import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Comment, Avatar, Button, Input, Form, message, List, Tooltip, Pagination } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { addComment, getIssueCommentById, getBookCommentById } from '../api/comment';
import { getUserById, editUser } from '../api/user';
import { formatDate } from '../utils/tool';
import { updateIssue } from '../api/issue';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
import { useTranslation } from 'react-i18next';
import styles from '../css/Discuss.module.css';
import '@wangeditor/editor/dist/css/style.css';

/**
 * 评论组件
 * @param {*} props
 * @returns
 */
function Discuss(props) {
  // 获取用户信息
  const { userInfo, isLogin } = useSelector((state) => state.user);
  const [value, setValue] = useState('');
  const [commentList, setCommentList] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const { t } = useTranslation();
  const [pageInfo, setPageInfo] = useState({});
  // editor 实例
  const [issueEditor, setIssueEditor] = useState(null);
  const [bookEditor, setBookEditor] = useState(null);
  // 编辑器内容
  const [issueHTML, setIssueHTML] = useState('');
  const [bookHTML, setBookHTML] = useState('');
  // 工具栏配置
  const issueToolbarConfig = {};
  // 编辑器配置
  const issuEditorConfig = {
    placeholder: t('issue.placeholder'),
    scroll: true
  };
  const bookToolbarConfig = {};
  // 编辑器配置
  const bookEditorConfig = {
    placeholder: 'bookEditorConfig...',
    scroll: true
  };

  useEffect(() => {
    async function fetchCommentList() {
      let data = null;
      // 根据该问答或者书籍 id 获取对应的评论
      if (props.commentType === 1) {
        // 传递过来的是问答 id
        const result = await getIssueCommentById(props.targetId, {
          current: 1,
          pageSize: 10,
        });
        data = result.data;
      } else if (props.commentType === 2) {
        // 传递过来的是书籍 id
        const result = await getBookCommentById(props.targetId, {
          current: 1,
          pageSize: 10,
        });
        data = result.data;
      }

      // 获取每条评论对应的用户信息
      for (let i = 0; i < data.data.length; i++) {
        const result = await getUserById(data.data[i].userId);
        data.data[i].userInfo = result.data;
      }
      setCommentList(data.data);
      setPageInfo({
        currentPage: data.currentPage,
        eachPage: data.eachPage,
        count: data.count,
        totalPage: data.totalPage,
      });
    }
    if (props.targetId) {
      fetchCommentList();
    }
    return () => {
      if (issueEditor == null) return;
      issueEditor.destroy();
      setIssueEditor(null);
      if (bookEditor == null) return;
      bookEditor.destroy();
      setBookEditor(null);
    };
  }, [props.targetId, refresh.issueEditor,refresh.bookEditor]);

  // 头像
  let avatar = null;
  if (isLogin) {
    avatar = (
      <Avatar
        src={userInfo.avatar}
        alt='用户头像'
      />
    );
  } else {
    avatar = <Avatar icon={<UserOutlined />} />;
  }

  function onSubmit() {
    let newComment = null;
    if (props.commentType === 1) {
      // 新增问答评论
      newComment = html;
    } else if (props.commentType === 2) {
      // 新增书籍评论
      newComment = value;
    }
    if (!newComment) {
      message.warning('请输入评论内容');
      return;
    } else {
      // 用户提交评论
      addComment({
        userId: userInfo._id,
        bookId: props.bookInfo?._id,
        issueId: props.issueInfo?._id,
        typeId: props.issueInfo ? props.issueInfo.typeId : props.bookInfo.typeId,
        commentContent: newComment,
        commentType: props.commentType,
      });

      // 该条问答或者书籍的评论数量加一
      if (props.commentType === 1) {
        // 问答评论数 +1
        updateIssue(props.issueInfo._id, {
          commentNumber: ++props.issueInfo.commentNumber,
        });
        // 增加对应用户的积分
        editUser(userInfo._id, {
          points: userInfo.points + 4,
        });
        message.success('评论添加成功，积分+4');
        setHtml('<p></p>');
        location.reload();
      } else if (props.commentType === 2) {
        // 书籍评论数 + 1
        updateBook(props.bookInfo._id, {
          commentNumber: ++props.bookInfo.commentNumber,
        });
        // 增加对应用户的积分
        editUser(userInfo._id, {
          points: userInfo.points + 2,
        });
        message.success('评论添加成功，积分+2');
        setValue('');
      } else if (props.commentType === 3) {
      }

      setRefresh(!refresh);
    }
  }

  return (
    <div>
      {/* 评论框 */}
      <Comment
        avatar={avatar}
        content={
          <>
            <Form.Item>
              {props?.commentType === 1 ? (
                  <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                    <Toolbar
                      editor={issueEditor}
                      defaultConfig={issueToolbarConfig}
                      mode='default'
                      style={{ borderBottom: '1px solid #ccc' }}
                    />
                    <Editor
                      defaultConfig={issuEditorConfig}
                      value={issueHTML}
                      onCreated={setIssueEditor}
                      onChange={(issueEditor) => setIssueHTML(issueEditor.getHtml())}
                      mode='default'
                      style={{ height: '300px', overflowY: 'hidden' }}
                    />
                  </div>
              ) : (
                <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
                <Toolbar
                  editor={bookEditor}
                  defaultConfig={bookToolbarConfig}
                  mode='default'
                  style={{ borderBottom: '1px solid #ccc' }}
                />
                <Editor
                  defaultConfig={bookEditorConfig}
                  value={bookHTML}
                  onCreated={setBookEditor}
                  onChange={(bookEditor) => setBookHTML(bookEditor.getHtml())}
                  mode='default'
                  style={{  height:'300px',overflowY: 'hidden'}}
                />
              </div>
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type='primary'
                disabled={isLogin ? false : true}
                onClick={onSubmit}>
                添加评论
              </Button>
            </Form.Item>
          </>
        }
      />
      {/* 评论列表 */}
      {commentList?.length > 0 && (
        <List
          dataSource={commentList}
          header='当前评论'
          itemLayout='horizontal'
          renderItem={function (props) {
            return (
              <Comment
                avatar={<Avatar src={props.userInfo.avatar} />}
                content={<div dangerouslySetInnerHTML={{ __html: props.commentContent }}></div>}
                datetime={
                  <Tooltip title={formatDate(props.commentDate)}>
                    <span>{formatDate(props.commentDate, 'year')}</span>
                  </Tooltip>
                }
              />
            );
          }}
        />
      )}

      {/* 分页 */}
      {commentList?.length > 0 ? (
        <div className={styles.paginationContainer}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            total={pageInfo.totalPage}
          />
        </div>
      ) : (
        <div
          style={{
            fontWeight: '200',
            textAlign: 'center',
            margin: '50px',
          }}>
          暂无评论
        </div>
      )}
    </div>
  );
}

export default Discuss;
