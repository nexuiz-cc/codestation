import React from 'react';
import Content7Child1 from './Content7Child1';
import Content7Child2 from './Content7Child2';
function Content71(props) {
    return (
        <div style={{
          padding: "10px",
          border: "1px solid"
        }}>
          根组件
          <Content7Child1 />
          <Content7Child2 />
        </div>
      );
}

export default Content71;