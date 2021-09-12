import React from "react";
import { Form } from "element-react";
import classNames from "classnames";
import rules from "./rules";
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  static Item = Form.Item;
  static rules = rules;
  // 提交获取表单的验证
  validate = () => {
    return new Promise((resolve) => this.refs.form.validate(resolve));
  };

  validateField = (field) => {
    return new Promise((resolve) =>
      this.refs.form.validateField(field, (error) => {
        resolve(!error);
      })
    );
  };

  handleSubmit = (event) => {
    const { onSubmit } = this.props;
    onSubmit && onSubmit(event);
    event.preventDefault();
  };
  render() {
    const {
      children,
      model,
      rules,
      labelPosition,
      labelWidth = "90px",
      className,
      style,
    } = this.props;
    console.log(rules);
    return (
      <Form
        onSubmit={this.handleSubmit}
        labelPosition={labelPosition}
        ref="form"
        model={model}
        labelWidth={labelWidth}
        rules={rules}
        style={style}
        className={classNames("sun-form", className)}
      >
        {children}
      </Form>
    );
  }
}
