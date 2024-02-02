import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Space, Button, Modal, Divider, Typography } from 'antd';
const { Title, Paragraph, Text, Link } = Typography;
import { getIssueByPage, updateIssue } from '../api/issue';
import styles from '../css/Review.module.css';

function Review(props) {
  const [issues, setIssues] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [resData, setResData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = (v) => {
    setIsModalOpen(true);
    setModalData(v);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
    },
  });

  const { issueTypeId } = useSelector((state) => state.type);
  const setStatus = (param) => {
    if (param) {
      return <Button type={styles.text}>已审核</Button>;
    } else {
      return <Button type={styles.text}>未审核</Button>;
    }
  };
  const setIsopen = (param) => {
    if (param) {
      return <Button type={styles.text}>未解决</Button>;
    } else {
      return <Button type={styles.text}>已解决</Button>;
    }
  };

  const setTitle = (param) => {
    if (param.length > 5) {
      param = param.substring(0, 6);
      param = param + '...';
      return (
        <h4
          type={styles.text}
          className={styles.title}>
          {param}
        </h4>
      );
    } else {
      return (
        <h4
          type={styles.text}
          className={styles.title}>
          {param}
        </h4>
      );
    }
  };
  const setText = (param) => {
    if (param.length > 10) {
      param = param.substring(0, 20);
      param = param + '...';
      return (
        <p
          type='text'
          className={styles.text}>
          {param}
        </p>
      );
    } else {
      return (
        <p
          type='text'
          className={styles.text}>
          {param}
        </p>
      );
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      width: '10%',
      render: (text) => setTitle(text),
    },
    {
      title: 'Content',
      dataIndex: 'issueContent',
      key: 'issueContent',
      width: '25%',
      render: (text) => setText(text),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '10%',
      filters: [
        {
          text: '问答',
          value: '问答',
        },
        {
          text: 'aa',
          value: 'aa',
        },
      ],
      render: (text) => <Button type='text'>{text}</Button>,
    },
    {
      title: 'Status',
      dataIndex: 'issueStatus',
      width: '120px',
      key: 'issueStatus',
      filters: [
        {
          text: '已审核',
          value: true,
        },
        {
          text: '未审核',
          value: false,
        },
      ],
      render: (text) => setStatus(text),
    },
    {
      title: 'isOpen',
      dataIndex: 'isOpen',
      width: '170px',
      key: 'isOpen',
      filters: [
        {
          text: '已解决',
          value: false,
        },
        {
          text: '未解决',
          value: true,
        },
      ],
      render: (text) => setIsopen(text),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='text'
            id='confirm'
            onClick={() => {
              updateRecord(record, 'issueStatus');
            }}>
            PASS
          </Button>
          <Button
            type='text'
            id='confirm'
            onClick={() => {
              openModal(record);
            }}>
            PASS WITH CONFIRM
          </Button>
          <Button
            type='text'
            id='confirm'
            onClick={() => {
              updateRecord(record, 'isOpen');
            }}>
            已解决
          </Button>
        </Space>
      ),
    },
  ];

  const updateRecord = (param, type) => {
    let id = param._id;
    switch (type) {
      case 'issueStatus':
        updateIssue(id, { issueStatus: true });
      case 'isOpen':
        updateIssue(id, { isOpen: false });
    }
    location.reload();
  };

  useEffect(() => {
    async function fetchData() {
      let searchParams = {
        current: tableParams.pagination.current,
        pageSize: tableParams.pagination.pageSize,
      };
      if (issueTypeId !== 'all') {
        searchParams.typeId = issueTypeId;
        // 如果按照分类进行查找，需要将当前页重新设置为第一页
        searchParams.current = 1;
      }
      const { data } = await getIssueByPage(searchParams);
      for (let i = 0; i < data.data.length; i++) {
        data.data[i].type = '问答';
      }
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      });
      setTableData(data.data);
      setResData(data.data);
      setLoading(false);
    }
    fetchData();
  }, [issueTypeId, tableParams.pagination.current, tableParams.pagination.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    let arr = [];
    if (filters.type == null || filters.issueStatus == null) {
      setTableData(resData);
    }

    if (filters.type != null) {
      for (let i = 0; i < filters.type.length; i++) {
        let temp = tableData.filter(function (item) {
          return item.type == filters.type[i];
        });
        arr = arr.concat(temp);
      }
      setTableData(arr);
    }

    if (filters.issueStatus != null) {
      for (let i = 0; i < filters.issueStatus.length; i++) {
        let temp = tableData.filter(function (item) {
          return item.issueStatus == filters.issueStatus[i];
        });
        arr = arr.concat(temp);
      }
      setTableData(arr);
    }
  };

  return (
    <div>
      <h3>审核</h3>
      <Table
        className={styles.table}
        key={tableData.id}
        columns={columns}
        dataSource={tableData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />

      <Modal
        title={modalData.issueTitle}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Paragraph>{modalData.issueContent}</Paragraph>
      </Modal>
    </div>
  );
}

export default Review;
