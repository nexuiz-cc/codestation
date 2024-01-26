import React from 'react';
function getData() {
  // return ["HTML", "CSS", "JS"];
}
function Content7Child4(props) {
  const arr = getData();
  const lis = arr.map((it, index) => <li key={index}>{it}</li>);
  return (
    <div>
      <ul
        style={{
          border: '1px solid',
        }}>
        {lis}
      </ul>
    </div>
  );
}

export default Content7Child4;
