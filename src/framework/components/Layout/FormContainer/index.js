import React from 'react';
export default ({ children, horizontal, maxWidth }) => <div style={{ flexDirection: horizontal ? 'Row' : undefined, maxWidth }}>{children}</div>;
