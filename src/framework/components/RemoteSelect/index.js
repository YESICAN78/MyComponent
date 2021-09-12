import React, { memo, useState, forwardRef, useEffect } from "react";
import Select from "../Select";
import Option from "../Option";
export default forwardRef((props, ref) => {
  const { remoteUrl, mode, ajaxMethod = "get", params = {} } = props;
  const [loading, setLoading] = useState(true);
  //  结构参数
  const getAjaxParams = () => {
    const defaultParams = { pageSize: 50, current: 1 };
    const _params = { ...defaultParams, ...params };
    return _params;
  };
 
  const handleSelect = () => {
    const params = getAjaxParams();

  };
  useEffect(() => {
    console.log(remoteUrl);
  }, []);
  return (
    <>
      <Select loading={loading}></Select>
    </>
  );
});
