import React from 'react';
import PropTypes from 'prop-types';

function ChlidContent1(props) {
  return (
    <div>
      这是子组件ChlidContent1
      <span>
        姓名:{props.name} 年龄：{props.age}
      </span>
      <div>{props.children}</div>
    </div>
  );
}
// 书写关于 props 类型的验证
ChlidContent1.propTypes = {
  /**
   *
   * @param {*} props 整体的 props 对象 {name:... , age :...}
   * @param {*} propName 当前验证的 props 属性 name
   * @param {*} componentName 组件名
   */
  name: function (props, propName, componentName) {
    if (!/-stu/.test(props[propName])) {
      // 进入此 if， 说明验证没有通过
      console.error(componentName + ' 组件的 ' + propName + ' 的属性未通过验证，应为含stu。');
      return null;
    }
  },
  age: function (props, propName, componentName) {
    if (PropTypes !== 'number') {
      // 进入此 if， 说明验证没有通过
      console.error(componentName + ' 组件的 ' + propName + ' 的属性未通过验证，年龄应为数字。');
      return null;
    }
  },
  score: PropTypes.arrayOf(function (propValue, key, componentName, propName) {
    if (typeof propValue[key] !== 'number') {
      console.error(componentName + ' 组件的 ' + propName + ' 的属性未通过验证，score应全为数字。');
      return null;
    }
  }),
  children: PropTypes.element.isRequired,
};

// 书写默认值
ChlidContent1.defaultProps = {
  name: 'ChlidContent1',
};
export default ChlidContent1;
