import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/movieDetail.css';
import { Layout, Card, Tag, Button,Avatar ,Comment} from 'antd';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
import { useSelector } from "react-redux";
import { UserOutlined } from '@ant-design/icons';
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor';
const { Footer, Content } = Layout;
import _ from 'lodash';

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState([]);
  const [editor, setEditor] = useState(null);
  const [html, setHtml] = useState('<p></p>');
  const [keywords, setKeywords] = useState([]);
  const { userInfo, isLogin } = useSelector(state => state.user);
  const [commentInfo, setCommentInfo] = useState(null);
  const toolbarConfig = {};
  const editorConfig = {
    placeholder: '请输入内容...',
  };
  let avatar = null;
  if (isLogin) {
    avatar = (<Avatar src={userInfo.avatar} alt="用户头像" />);
} else {
    avatar = (<Avatar icon={<UserOutlined />} />);
}
  const [colors, setColors] = useState([
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'blue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'blue',
    'purple',
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'blue',
    'purple',
  ]);
  useEffect(() => {
    let detailURL = 'https://api.themoviedb.org/3/movie/';
    const header = {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWUwNzhiMmQ5Mjg4YWMzMWE2NThkNzAzNmQzNzJmYSIsInN1YiI6IjY0Y2U1YzA1NGQ2NzkxMDEzOWVlMDIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Wx-Ezz67V6JInCIDSOCnkA9H0seIBhpOupm_Amj4Co',
    };
    axios.get(detailURL + id + '?language=en-US', { headers: header }).then(function (response) {
      response.data.poster_path = 'https://image.tmdb.org/t/p/w185' + response.data.poster_path;
      setData(response.data);
      console.log('data', data);
    });

    axios.get(detailURL + id + '/release_dates', { headers: header }).then(function (response) {
      let str = response.data.results[0].release_dates[0].release_date;
      setDate(_.replace(str, 'T00:00:00.000Z', ''));
      setYear(str.substring(0, 4));
    });

    axios.get(detailURL + id + '/credits', { headers: header }).then(function (response) {
      for (let item of response.data.cast) {
        if (item.profile_path !== null) {
          item.profile_path = 'https://image.tmdb.org/t/p/w185' + item.profile_path;
        }
      }
      setActors(response.data.cast);
    });

    axios.get(detailURL + id + '/keywords', { headers: header }).then(function (response) {
      for (let i = 0; i < response.data.keywords.length; i++) {
        response.data.keywords[i].color = '';
        for (let j = 0; j < colors.length; j++) {
          response.data.keywords[i].color = colors[i];
        }
      }

      setKeywords(response.data.keywords);
      console.log('keywords:', response.data.keywords);
    });
  }, []);

  return (
    <Layout>
      <Content className='box'>
        <img
          src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
          className='backdrop'
        />
        <div className='photo'>
          <img src={data.poster_path} />
          <h4 className='h4'>
            {' '}
            {data.title} ( {year} ){' '}
          </h4>
          <p className='text'>{date}</p>
          <p className='overview'>{data.overview}</p>
        </div>
        <p className='title'>Top Billed Cast :</p>
        <div className='box2'>
          {actors.map(
            (item) =>
              item.profile_path !== null && (
                <div className='space'>
                  <Card
                    className='card'
                    size='small'>
                    <img
                      src={item.profile_path}
                      width='150'
                    />
                    <h4 className='actorsName'>{item.name}</h4>
                    <p className='character'>{item.character}</p>
                  </Card>
                </div>
              ),
          )}
        </div>
        <div className='rSider'>
          {data.title !== null && (
            <div className='tcbox'>
              <p className='title2'>Original Title</p>
              <p className='content2'>{data.title}</p>
            </div>
          )}
          {data.status !== null && (
            <div className='tcbox'>
              <p className='title2'>Status</p>
              <p className='content2'>{data.status}</p>
            </div>
          )}
          {data.budget != 0 && (
            <div className='tcbox'>
              <p className='title2'>Budget</p>
              <p className='content2'>{'$' + data.budget * 2}</p>
            </div>
          )}
          {data.budget != 0 && (
            <div className='tcbox'>
              <p className='title2'>Revenue</p>
              <p className='content2'>{'$' + data.revenue}</p>
            </div>
          )}
          <div className='tcbox'>
            <p className='title2'>Keywords</p>
            {keywords.map((item) => (
              <Tag
                color={item.color}
                className='tag'>
                {item.name}
              </Tag>
            ))}
          </div>
        </div>
        <div className='editor'>
          <img src={userInfo.avatar} width='50' className='avatar'/>
          <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode='default'
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={html}
              onCreated={setEditor}
              onChange={(editor) => setHtml(editor.getHtml())}
              mode='default'
              style={{ height: '500px', overflowY: 'hidden' }}
            />
          </div>
          <Button className='submit'>Submit</Button>

        </div>
      </Content>
      <Footer className='Footer'>Footer</Footer>
    </Layout>
  );
}

export default MovieDetail;
