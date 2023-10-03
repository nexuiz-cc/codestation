import React, { useState, useEffect } from 'react';
import { Card, Input, Layout, Select, Space, Avatar, Progress } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/movies.css';
import _ from 'lodash';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [resultList, setresultList] = useState([]);
  const { Sider } = Layout;
  const navigate = useNavigate();
  const { Search } = Input;
  const options = [
    {
      value: 'title',
      label: 'Title',
    },
    {
      value: 'title2',
      label: 'Title2',
    },
  ];
  const onSearch = (value, _e) => {
    let arr = [];
    if (value == '') {
      setresultList([]);
    } else {
      for (let i = 0; i < movies.length; i++) {
        let str = movies[i].title;
        if (str.includes(value)) {
          arr = arr.concat(movies[i]);
        }
      }
      setresultList(arr);
      console.log('arr', arr);
    }
  };
  let num = 1;

  const getColor = (param) => {
    let color = '';
    if (param < 49) {
      color = 'red';
    } else if (param > 50 && param < 79) {
      color = 'orange';
    } else if (param > 79 && param < 90) {
      color = 'yellow';
    } else if (param > 90) {
      color = 'green';
    }
    return color;
  };
  const detailURL = 'https://api.themoviedb.org/3/movie/'
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ja-US&page=' + num + '&sort_by=popularity.desc';
  const header = {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWUwNzhiMmQ5Mjg4YWMzMWE2NThkNzAzNmQzNzJmYSIsInN1YiI6IjY0Y2U1YzA1NGQ2NzkxMDEzOWVlMDIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Wx-Ezz67V6JInCIDSOCnkA9H0seIBhpOupm_Amj4Co',
  };

  movies.forEach((item) => {
    item.poster_path = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    item.vote_average = item.vote_average * 10;
    axios.get(detailURL+item.id, { headers: header }).then(function (response) {
     item.movieDetal=response.data;
    });
  });

  useEffect(() => {
    axios.get(url, { headers: header }).then(function (response) {
      setMovies(response.data.results);
    });
  }, []);

  console.log(movies);
  return (
    <Layout style={{ minHeight: '150vh' }}>
      <Sider className='sider'>
        <Space.Compact className='compact'>
          <Select defaultValue='title' options={ options } className='select' />
          <Search className='siderIpt' placeholder='input search text' allowClear enterButton='🔍' size='large' onSearch={onSearch} />
        </Space.Compact>
      </Sider>
      <div className='container'>
        {resultList.length == 0 && movies.map((item) => (
          <div className='space' key={item.id} >
            <Card 
              className='card' 
              onClick={()=>navigate(`/movie/${item.id}`)}>
                <img src={item.poster_path} />
                <h4 id={item.id} className='h4'>{ item.title }</h4>
                <p className='releaseDate'>{ item.release_date }</p>
            </Card>
          </div>
        ))}
        {resultList.length != 0 && resultList.map((item) => (
          <div className='space' key={item.id} onClick={()=>navigate(`/movie/${item.id}`)}>
            <Card className='card'>
              <img src={ item.poster_path } />
              <h4 key={ item.id } className='h4'>
                { item.title }
              </h4>
              <p>{ item.release_date }</p>
            </Card>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export default Movies;
