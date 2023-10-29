
import Content5Child1 from "./Content5Child1";
import Content5Child2 from "./Content5Child2";
import MouseMove from "../components/MouseMove";
import withMouseMove from "../HOC/withMouseMove";

const NewChildCom1 = withMouseMove(Content5Child1);
const NewChildCom2 = withMouseMove(Content5Child2);

function Content51() {

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: "850px"
      }}
    >

      {/* 改为使用 MouseMove */}
      {/* MouseMove 的 render 这个 props 属性对应的值是一个函数
      该函数表明了我要渲染的视图 */}
      <MouseMove>
        {(props) => <Content5Child1 {...props} />}
      </MouseMove>
      <MouseMove>
        {(props) => <Content5Child2 {...props} />}
      </MouseMove>

      {/* 下面是使用高阶组件的方式
      <NewChildCom1/>
      <NewChildCom2/> */}
    </div>
  )
}

export default Content51;