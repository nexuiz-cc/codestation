import React ,{ useState, useEffect } from 'react';

function Content36(props) {
    let timer;
    const [counter, setCounter] = useState(1);
  
    useEffect(() => {
      timer = setInterval(() => {
        console.log('触发了');
      }, 100000);
    },[]);
  
    const clearTimer = () => {
      clearInterval(timer);
    }
  
    function clickHandle(){
      console.log(timer);
      setCounter(counter + 1);
    }
  
    return (
      <>
        <div>{counter}</div>
        <button onClick={clickHandle}>+1</button>
        <button onClick={clearTimer}>停止</button>
      </>)
}

export default Content36;