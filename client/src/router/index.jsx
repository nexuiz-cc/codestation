// 路由配置

import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// 引入页面
import Issues from "../pages/Issues.jsx";
import Books from "../pages/Books.jsx";
// import Jobs from "../pages/Jobs.jsx";
import Interview from "../pages/Interviews.jsx";
import IssuesDetail from "../pages/IssueDetail.jsx";
import BookDetail from "../pages/BookDetail.jsx";
import Personal from "../pages/Personal.jsx";
import AddIssue from "../pages/AddIssue.jsx";
import SearchPage from "../pages/SearchPage.jsx";
import NotFound from "../pages/NotFound.jsx";
import Movies from "../pages/Moives.jsx";
import MovieDetail from "../pages/MovieDetail.jsx";
import Review from "../pages/Review.jsx";
import LearnReact from "../pages/LearnReact.jsx";
import Content1 from "../components/Content1.jsx";
import Content2 from "../components/Content2.jsx";
import Defalut from "../components/Defalut.jsx";
import Content3 from "../components/Content3.jsx";
import Content4 from "../components/Content4.jsx";
import Content5 from "../components/Content5.jsx";
import Content6 from "../components/Content6.jsx";
import Content7 from "../components/Content7.jsx";
import Content8 from "../components/Content8.jsx";
export const RouteConfig = () => {
  return (
    <Routes>
      <Route path="/issues" element={<Issues />} />
      <Route path="/issues/:id" element={<IssuesDetail />} />
      <Route path="/books" element={<Books />} />
      <Route path="/books/:id" element={<BookDetail />} />
      <Route path="/movie/:id" element={<MovieDetail />} />
      {/* <Route path="/jobs" element={<Jobs />} /> */}
      <Route path="/interviews" element={<Interview />} />
      <Route path="/personal" element={<Personal />} />
      <Route path="/addIssue" element={<AddIssue />} />
      <Route path="/searchPage" element={<SearchPage />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/" element={<Navigate replace to="/issues" />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/review" element={<Review />} />
      <Route path="/learnReact" element={<LearnReact />} >
        <Route index element={<Defalut />}/>
        <Route path="content1" element={<Content1/>}/>
        <Route path="content2" element={<Content2/>}/>
        <Route path="content3" element={<Content3/>}/>
        <Route path="content4" element={<Content4/>}/>
        <Route path="content5" element={<Content5/>}/>
        <Route path="content6" element={<Content6/>}/>
        <Route path="content7" element={<Content7/>}/>
        <Route path="content8" element={<Content8/>}/>
      </Route>
    </Routes>
  );
}


