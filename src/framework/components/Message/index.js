import { message } from "antd";
// eslint-disable-next-line import/no-anonymous-default-export
message.config({
  top: 100,
  duration: 2,
  maxCount: 3,
});
const success = (msg) => {
  message.success(msg);
};
const error = (msg, duration = 2) => {
  if (typeof msg === "object" && msg.message) {
    message.error(msg.message, duration);
  } else {
    message.error(msg, duration);
  }
};
const warning = (msg) => {
  message.warning(msg);
};
const info = (msg) => {
  message.info(msg);
};
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  success,
  error,
  warning,
  info,
};
