
import { Component } from "react";
import { formatDate } from '../utils/tool';

/**
 * 在接收的组件上面添加一些公共的逻辑
 * @param {*} Com 接收一个组件
 * @returns 返回一个新组件
 */
function withLog2(Com) {
  // 返回的新组件
  return class extends Component {
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
      return <Com {...this.props} />;
    }
  };
}

export default withLog2;