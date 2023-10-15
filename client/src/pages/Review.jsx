import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, Space, Button } from 'antd';
import { getIssueByPage, updateIssue } from '../api/issue';

function Review(props) {
  const [issues, setIssues] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      return <Button type='text'>已审核</Button>;
    } else {
      return <Button type='text'>未审核</Button>;
    }
  };

  const setText = (param) => {
    if (param.length > 10) {
      param = param.substring(0, 11);
      param = param + '...';
      return <Button type='text'>{param}</Button>;
    } else {
      return <Button type='text'>{param}</Button>;
    }
  };
  const pass = () => {
    updateIssue();
  };
  const columns = [
    {
      title: 'Title',
      dataIndex: 'issueTitle',
      key: 'issueTitle',
      width: '10%',
      render: (text) => <Button type='text'>{text}</Button>,
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
      key: 'issueStatus',
      render: (text) => setStatus(text),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size='middle'>
          <Button
            type='text'
            id='pass'>
            Pass
          </Button>
          <Button
            type='text'
            id='del'>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

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
        data.data[5].type = 'aa';
        data.data[6].type = 'aa';
      }
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
        },
      });
      setTableData(data.data);
      setLoading(false);
    }
    fetchData();
  }, [issueTypeId, tableParams.pagination.current, tableParams.pagination.pageSize]);

  const handleTableChange = (pagination, filters, sorter) => {
    console.log('filters', filters);
    let arr = [];

    for (let i = 0; i < filters.type.length; i++) {
      let str = tableData.find(function(item){
        return item.type ==filters.type[i]
      });
      arr.push(str);
      console.log('arr:',arr);
    }
    setTableData(arr);
  };

  return (
    <div>
      <h3>审核</h3>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Review;
