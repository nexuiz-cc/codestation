import React, { Component } from "react";
import { formatDate } from "../utils/tool";

// 高阶组件是一个函数，接收一个组件作为参数
// 返回一个新的组件
function withLog3(Com) {
  // 返回的新组件
  class WithLogCom extends Component {
    constructor(props) {
      super(props);
      this.state = { n: 1 };
    }
    componentDidMount() {
      console.log(
        `日志：组件${Com.name}已经创建，创建时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    componentWillUnmount() {
      console.log(
        `日志：组件${Com.name}已经销毁，销毁时间${formatDate(
          Date.now(),
          "year-time"
        )}`
      );
    }
    render() {
      // 通过 this.props 能够拿到传递下来的 ref
      // 然后和子组件进行关联
      const {forwardedRef, ...rest} = this.props;
      return <Com ref={forwardedRef} {...rest} />;
    }
  }

  return React.forwardRef((props, ref) => {
    // 这里是关键，渲染函数会自动传入 ref，然后我们将 ref 继续往下传递
    return <WithLogCom {...props} forwardedRef={ref} />;
  });
}

export default withLog3;