import React, { memo, useEffect, useState } from "react";
import Select from "../Select";
import Option from "../Option";
/**
 * multiple 是否多选
 * 
 * */ 
export default memo((props) => {
  const { enums } = props;
  const finalProps = { ...props };
  const [obj, setObj] = useState({});
  const [names, setNames] = useState([]);
  useEffect(() => {
    if (enums) {
      const enumsObj = enums.getData();
      const list = Object.keys(enumsObj);
      setNames(list);
      setObj(enumsObj);
    }
  }, [enums]);
  return (
    <Select {...finalProps}>
      {names.map((name, index) => (
        <Option key={index} value={obj[name]} label={name} />
      ))}
    </Select>
  );
});
