import axios from "axios";
import sleep from "./sleep";
//上一个请求是否正在进行中
let loading = false;
//防止执行resolve/reject报错
function funcCatch(func, args) {
  try {
    func(...args);
  } catch (err) {
    console.error(err);
  }
}
function request(args, method) {
  return new Promise(async (resulve, reject) => {
    // 上一个请求还在等待10秒
    while (loading) {
      await sleep(10);
    }
    loading = true;
    let complete = false;
    axios[method](...args)
      .then((...argsThen) => {
        funcCatch(resulve, argsThen);
      })
      .catch((...argsCatch) => {
        funcCatch(reject, argsCatch);
      });
    //-----请求如果5秒后还没完成,就取消下一个请求的拦截;
    setTimeout(() => {
      if (!complete) {
        complete = true;
        loading = false;
      }
    }, 5000);
  });
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get(...args) {
    return request(args, "get");
  },
  post(...args) {
    return request(args, "post");
  },
};
