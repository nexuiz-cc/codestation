import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import  styles  from '../css/movieDetail.module.css';
import { Layout, Card, Tag, Button, Avatar, Comment } from 'antd';
import { useSelector } from 'react-redux';
import { UserOutlined } from '@ant-design/icons';
import '@wangeditor/editor/dist/css/style.css';
import { Editor, Toolbar } from '@wangeditor/editor-for-react';
const { Footer, Content } = Layout;
import _ from 'lodash';

function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState([]);
  const [keywords, setKeywords] = useState([]);
  const { userInfo, isLogin } = useSelector((state) => state.user);
  const [commentInfo, setCommentInfo] = useState(null);
  // editor 实例
  const [movieEditor, setMovieEditor] = useState(null);
  // 编辑器内容
  const [movieHTML, setMovieHTML] = useState('');
  // 工具栏配置
  const movieToolbarConfig = {};
  // 编辑器配置
  const movieEditorConfig = {
    placeholder: '请输入内容...',
  };
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
      <Content className={styles.box}>  
        <img
          className={styles.backdrop} src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
        />
       
     
        <div className={styles.photo}>
          <img src={data.poster_path} />
          <h4 className={styles.h4}>
            {data.title} ( {year} ){' '}
          </h4>
          <p className={styles.text}>{date}</p>
          <p className={styles.overview}>{data.overview}</p>
        </div>
        <p className={styles.title}>Top Billed Cast :</p>
        <div className={styles.box2}>
          {actors.map(
            (item) =>
              item.profile_path !== null && (
                <Card
                  key={item.name}
                  className={styles.card}
                  size='small'>
                  <img
                    src={item.profile_path}
                    width='150'
                  />
                  <h4 className={styles.actorsName}>{item.name}</h4>
                  <p className={styles.character}>{item.character}</p>
                </Card>
              ),
          )}
        </div>
        <div className={styles.rSider}>
          {data.title !== null && (
            <div className={styles.tcbox}>
              <p className={styles.title2}>Original Title</p>
              <p className={styles.content2}>{data.title}</p>
            </div>
          )}
          {data.status !== null && (
            <div className={styles.tcbox}>
              <p className={styles.title2}>Status</p>
              <p className={styles.content2}>{data.status}</p>
            </div>
          )}
          {data.budget != 0 && (
            <div className={styles.tcbox}>
              <p className={styles.title2}>Budget</p>
              <p className={styles.content2}>{'$' + data.budget * 2}</p>
            </div>
          )}
          {data.budget != 0 && (
            <div className={styles.tcbox}>
              <p className={styles.title2}>Revenue</p>
              <p className={styles.content2}>{'$' + data.revenue}</p>
            </div>
          )}
          <div className={styles.tcbox}>
            <p className={styles.title2}>Keywords</p>
            {keywords.map((item) => (
              <Tag
                color={item.color}
                className={styles.tag}>
                {item.name}
              </Tag>
            ))}
          </div>
        </div>
        <div className={styles.editor}>
          <img
            src={userInfo.avatar}
            width='50'
            className={styles.avatar}
          />
          <div style={{ border: '1px solid #ccc', zIndex: 100 }}>
            <Toolbar
              editor={movieEditor}
              defaultConfig={movieToolbarConfig}
              mode='default'
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={movieEditorConfig}
              value={movieHTML}
              onCreated={setMovieEditor}
              onChange={(movieEditor) => setMovieHTML(movieEditor.getHtml())}
              mode='default'
              style={{ height: '300px', overflowY: 'hidden' }}
            />
          </div>

          <Button className={styles.submit}>Submit</Button>
        </div>
      </Content>
      <Footer className={styles.Footer}>Footer</Footer>
    </Layout>
  );
}

export default MovieDetail;
