import React ,{useState}from 'react';
import Conten2Child1 from './Conten2Child1';
import Conten2Child2 from './Conten2Child2';
import withLog from '../HOC/withLog';
import withTimer from '../HOC/withTimer';

const WarpChild1 = withLog(Conten2Child1);
const WarpChild2 = withLog(Conten2Child2);
const NewChildCom1 = withTimer(withLog(Conten2Child1));
const NewChildCom2 = withTimer(withLog(Conten2Child2));

function Content2() {
const [toggle,setToggle] = useState(true);
const child = toggle ? <WarpChild1 name="xiejie" /> : <WarpChild2 age={18} />;
  return (
    <div
      style={{
        position: 'relative',
        fontFamily: '冬青黑体简体中文',
        fontSize: 30,
        left: '30px',
      }}>
      高阶组件
      <p style={{ fontSize: 15 }}>
       =======================================
      </p>
      <button onClick={() => setToggle(!toggle)}>show/hide</button>
     {child}
     <br/>
     嵌套的高阶组件
     {toggle ? <NewChildCom1 name="谢杰"/> : <NewChildCom2 age={18}/>}
    </div>
  );
}

export default Content2;
