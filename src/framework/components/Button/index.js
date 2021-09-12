import React, { memo } from "react";
import { Button } from "element-react";
export default memo((props) => {
  const { children, btnType } = props;
  const finalProps = { ...props };
  return (
    <Button {...finalProps} nativeType={btnType}>
      {children}
    </Button>
  );
});
