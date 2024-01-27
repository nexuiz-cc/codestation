import { useState } from 'react';
import LoginAvatar from './LoginAvatar';

import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Input, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { Button, Dropdown, Space } from 'antd';

const { Search } = Input;
const { Option } = Select;
function NavHeader(props) {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [searchOptions, setSearchOption] = useState('issue');
  const items = [
    {
      key: '1',
      label: (
        <li onClick={() => i18n.changeLanguage('en')}>
         {t('navHeader.langoptions.en')}
        </li>
      ),
    },
    {
      key: '2',
      label: (
        <li onClick={() => i18n.changeLanguage('zh')}>
         {t('navHeader.langoptions.zh')}
        </li>
      ),
    },{
      key: '3',
      label: (
        <li onClick={() => i18n.changeLanguage('ja')}>
         {t('navHeader.langoptions.ja')}
        </li>
      ),
    }
  ];
  function onChange(value) {
    setSearchOption(value);
  }

  function onSearch(value) {
    if (value) {
      // 跳转到搜索页，将搜索内容传递过去
      navigate('/searchPage', {
        state: {
          value,
          searchOptions,
        },
      });
    } else {
      navigate('/issues');
    }
  }

  return (
    <div className='headerContainer'>
      {/* 头部 logo */}
      <div
        className='logoContainer'
        onClick={() => navigate('/')}>
        <div className='logo'></div>
      </div>
      {/* 头部导航 */}
      <div className='navContainer'>
        <span>
          <NavLink
            to='/'
            className='navgation'>
            {t('navHeader.qa')}
          </NavLink>
        </span>
        <span>
          <NavLink
            to='/books'
            className='navgation'>
            {t('navHeader.book')}
          </NavLink>
        </span>
        <span>
          {' '}
          <NavLink
            to='/movies'
            className='navgation'>
            {t('navHeader.movies')}
          </NavLink>
        </span>
        <span>
          <NavLink
            to='/interviews'
            className='navgation'>
            {t('navHeader.interview')}
          </NavLink>
        </span>
        <span>
          {' '}
          <a
            href='https://duyi.ke.qq.com/'
            target='_blank'
            className='navgation'>
            {t('navHeader.videos')}
          </a>
        </span>
      </div>
      {/* 搜索框 */}
      <div className='searchContainer'>
        <Input.Group compact>
          <Select
            defaultValue='issue'
            size='large'
            style={{ width: '20%' }}
            onChange={onChange}>
            <Option value='issue'>问答</Option>
            <Option value='book'>书籍</Option>
            {/* <Option value="jobs">招聘</Option> */}
          </Select>
          <Search
            placeholder='请输入要搜索的内容'
            allowClear
            enterButton='搜索'
            size='large'
            onSearch={onSearch}
            style={{
              width: '80%',
            }}
          />
        </Input.Group>
      </div>
   
      {/* 登录按钮 */}
      <div className='loginBtnContainer'>
        <LoginAvatar loginHandle={props.loginHandle} />
      </div>
      <Dropdown
      className='dropdown'
      overlayClassName='overlay'
        menu={{
          items
        }}
        placement="bottom"
      >
        <Button className='langbtn'> {t('navHeader.lang')}</Button>
      </Dropdown>
    </div>
  );
}

export default NavHeader;
