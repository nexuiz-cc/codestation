/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import IssueItem from './IssueItem';
import BookItem from './BookItem';

/**
 * 该组件只是一个容器组件，如果搜索的是问答，则返回 IssueItem
 * 如果搜索的是书籍，则返回 BookItem
 * @param {*} props
 * @returns
 */
function SearchResultItem(props) {
  const data = props;
  return (
    <>
      {
data.info.issueTitle ? <IssueItem issueInfo={data.info} /> : <BookItem bookInfo={data.info} />
}
    </>
  );
}

export default SearchResultItem;
