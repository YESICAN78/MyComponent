import React, {
  memo,
  forwardRef,
  useCallback,
  useRef,
  useImperativeHandle,
} from "react";
import { Input } from "element-react";
import trim from "../../../utils/trim";
export default forwardRef((props, ref) => {
  const inputRef = useRef(null);
  const { onChange, notTrim, onBlur, onFocus } = props;
  const finalProps = { ...props };
  // 失去焦点触发
  const handleTrim = useCallback(
    (e) => {
      onChange && !notTrim && onChange(trim(e.target.value));
      onBlur && onBlur(e);
    },
    [onChange, notTrim, onBlur]
  );
  // 获取焦点触发
  const handleFocus = useCallback(
    (e) => {
      onFocus && onFocus(e);
    },
    [onFocus]
  );
  useImperativeHandle(ref, () => ({
    handleTrim,
    handleFocus,
    ...inputRef.current,
  }));
  return (
    <>
      <Input
        ref={inputRef}
        {...finalProps}
        onBlur={handleTrim}
        onFocus={handleFocus}
      />
    </>
  );
});
