import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import { useParams } from 'react-router-dom';
import movieDetailStyle from '../css/movieDetail.module.css';
import _ from 'lodash';
function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [date, setDate] = useState('');
  const [year, setYear] = useState('');
  const [actors, setActors] = useState([]);
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
  }, []);

  return (
    <div className={movieDetailStyle.box}>
      <img
        src={'https://image.tmdb.org/t/p/original/' + data.backdrop_path}
        className={movieDetailStyle.backdrop}
      />
      <div className={movieDetailStyle.photo}>
        <img src={data.poster_path} />
        <h4 className={movieDetailStyle.h4}>
          {' '}
          {data.title} ( {year} ){' '}
        </h4>
        <p className={movieDetailStyle.text}>{date}</p>
        <p className={movieDetailStyle.overview}>{data.overview}</p>
       
      </div>
      <p className={movieDetailStyle.title}>Top Billed Cast :</p>
      <div className={movieDetailStyle.box2}>
        { actors.map((item) => item.profile_path !== null && (
          <div className={movieDetailStyle.space}>
            <Card className={movieDetailStyle.card} size='small'>
              <img src={item.profile_path} />
                <h4 className={movieDetailStyle.actorsName}>{item.name}</h4>
                <p className={movieDetailStyle.character}>{item.character}</p>
            </Card>
          </div>
        ),)}
      </div>
    </div>
  );
}

export default MovieDetail;
