import React from 'react';

function Content34(props) {
   
  const [counter, setCounter] = React.useState(1);
  const inputRef1 = React.createRef();
  const inputRef2 = React.useRef();
  console.log("inputRef1:", inputRef1); // {current: null}
  console.log("inputRef2:", inputRef2); // {current: undefined}
  function clickHandle() {
    console.log("inputRef1:", inputRef1); // {current: input}
    console.log("inputRef2:", inputRef2); // {current: input}
    setCounter(counter + 1);
  }

  return (
    <div>
      <button onClick={clickHandle}>+1</button>
      <div>{counter}</div>
      <div>
        <input type="text" ref={inputRef1} style={{position:'relative',top:10}}/>
      </div>
      <div>
        <input type="text" ref={inputRef2} style={{position:'relative',top:15}} />
      </div>
      <div style={{height:40}}/> 
    </div>
  );
}

export default Content34;