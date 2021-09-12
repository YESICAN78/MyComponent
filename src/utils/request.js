import { ajaxSync } from "./ajax";
import { isObject, isArray } from "lodash";
import { Message } from "../framework";
const { error } = Message;

async function request({ url, data, method = "get", options = {} }) {
  const { err, ...rest } = await ajaxSync[method](url, data, options);
  const res = rest.res || {};
  if (err) {
    error(res.msg);
    return err;
  } else if (res) {
    const { results, ...rest } = res || {};
    // replaceNull(results);
    return { results, ...rest };
  }
}

export default request;
