import React, { useState, useEffect } from 'react';
import { Card, Input, Layout, Menu, theme } from 'antd';
import axios from 'axios';
import '../css/movies.css';
import _ from 'lodash';

function Movies() {
  const [movies, setMovies] = useState([]);
  const [data, setData] = useState([]);
  const [resultList, setresultList] = useState([]);
  const { Sider } = Layout;

  const { Search } = Input;
  const handleChange = (value, _e) => {
    // let obj = movies.find((v)=> v.title = value);
    // let arr = [];
    // arr.push(obj);
    // setresultList(arr);
  };
  const onSearch = (value, _e) => {
    console.log(movies);
    if (value == '') {
      setresultList([]);
    } else {
      let arr = _.filter(movies,function(v){
        return v.title == value;
      })
      console.log('arr',arr);
      setresultList(arr);
    }
  };
  let num = 1;
  const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=' + num + '&sort_by=popularity.desc';
  const header = {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWUwNzhiMmQ5Mjg4YWMzMWE2NThkNzAzNmQzNzJmYSIsInN1YiI6IjY0Y2U1YzA1NGQ2NzkxMDEzOWVlMDIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Wx-Ezz67V6JInCIDSOCnkA9H0seIBhpOupm_Amj4Co',
  };
  axios.get(url, { headers: header }).then(function (response) {
    setMovies(response.data.results);
    setData(response.data.results);
  });
  movies.forEach((item) => {
    item.poster_path = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
  });

  useEffect(() => {
    if (resultList.length == 0) {
    }
  }, []);
  return (
    <Layout style={{ minHeight: '150vh' }}>
      <Sider className='sider'>
        <Search
          className='siderIpt'
          placeholder='input search text'
          allowClear
          enterButton='🔍'
          size='large'
          onSearch={onSearch}
          onChange={handleChange}
        />
      </Sider>
      <div className='container'>
        {resultList.length == 0 &&
          movies.map((item) => (
            <div className='space'>
              <Card className='card'>
                <img src={item.poster_path} />
                <h4
                  key={item.id}
                  className='h4'>
                  {item.title}
                </h4>
              </Card>
            </div>
          ))}

        {resultList.length != 0 &&
          resultList.map((item) => (
            <div className='space'>
              <Card className='card'>
                <img src={item.poster_path} />
                <h4
                  key={item.id}
                  className='h4'>
                  {item.title}
                </h4>
              </Card>
            </div>
          ))}
      </div>
    </Layout>
  );
}
export default Movies;
