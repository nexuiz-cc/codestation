import React from 'react';
import Content7Child4 from './Content7Child4';
import ErrorBoundary from './ErrorBoundary';
function getData() {
  return ['苹果', '香蕉', '西瓜'];
}
function Content7Child3(props) {
  const arr = getData();
  const lis = arr.map((it, index) => <li key={index}>{it}</li>);
  return (
    <div
      style={{
        border: '1px solid',
      }}>
      <ul>{lis}</ul>
      <ErrorBoundary>
        <Content7Child4 />
      </ErrorBoundary>
    </div>
  );
}

export default Content7Child3;
