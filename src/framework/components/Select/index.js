import React from "react";
import { Select } from "element-react";
import globalEventBus from "../../../utils/eventBus";
// eslint-disable-next-line import/no-anonymous-default-export
export default class extends React.Component {
  componentDidMount() {}
  render() {
    const { children } = this.props;
    const value = this.props.value === "" ? undefined : this.props.value;
    const finalProps = { ...this.props, value };
    return (
      <Select {...finalProps} style={{ width: "100%" }}>
        {children}
      </Select>
    );
  }
}
