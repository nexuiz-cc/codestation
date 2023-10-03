import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../css/movieDetail.css';
import _ from 'lodash';
function MovieDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [date,setDate]= useState('');
  const [year,setYear] = useState('');
  useEffect(() => {
    let detailURL = 'https://api.themoviedb.org/3/movie/';    
    const header = {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWUwNzhiMmQ5Mjg4YWMzMWE2NThkNzAzNmQzNzJmYSIsInN1YiI6IjY0Y2U1YzA1NGQ2NzkxMDEzOWVlMDIyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.4Wx-Ezz67V6JInCIDSOCnkA9H0seIBhpOupm_Amj4Co',
    };
    axios.get(detailURL + id+'?language=en-US', { headers: header }).then(function (response) {
      response.data.poster_path = 'https://image.tmdb.org/t/p/w185' + response.data.poster_path;
      setData(response.data);
      console.log('data:',response.data);
      
    });

    axios.get(detailURL + id+'/release_dates', { headers: header }).then(function (response) {
        let str = response.data.results[0].release_dates[0].release_date;
        console.log(response.data.results[0].release_dates[0].release_date);
        setDate(_.replace(str,'T00:00:00.000Z',''));
        setYear(str.substring(0,4));
        console.log('date:',date,year);
      });
    
  }, []);

  return (
    <div className='box'>
      <img
        src={'https://image.tmdb.org/t/p/original' + data.backdrop_path}
        className='backdrop'
      />
      <div className='photo'>
        <img src={data.poster_path} />
        <h4 className='h4'>  {data.title} ( {year} )  </h4>
        <p className='text'>{date}</p>
        <p className='overview'>{data.overview}</p>
      </div>
    </div>
  );
}

export default MovieDetail;
