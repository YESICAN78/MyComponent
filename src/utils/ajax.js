import axios from "./axiosCustomer";
import eventBus from "./eventBus";
const formatParams = function (params) {
  return { ...params };
};
// 处理地址
function urlFix(url) {
  return url.indexOf("sunInterfact")
    ? `/sunapiInterface/sunapi${url}`
    : `/sunapiInterface/sunapi${url}`;
}
export const ajax = {
  get(url, params, options) {
    options = options || {};
    // options = setEncryptionParameter(options);
    let formatResult = formatParams(params);
    formatResult._r_ = Math.floor(Math.random() * 10000000 + 10000000); // 增加一个随机数参数，禁止IE的缓存
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .get(resUrl, {params:formatResult})//get传参必须{params：{需要传的参数}}
        .then((res) => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
  post(url, params, options) {
    options = setEncryptionParameter(options);
    // 需要对复杂对象进行JSON序列化
    return new Promise((resolve, reject) => {
      const resUrl = urlFix(url);
      axios
        .post(resUrl, options)
        .then((res) => {
          if (res) {
            resolve(res.data);
          }
        })
        .catch(reject);
    });
  },
};

function setEncryptionParameter(opt) {
  return window.setEncryptionParameter(opt);
}
function ajaxComplateHandler(result) {
  eventBus.emit("ajaxComplate", result);
  return result;
}
// 异步请求
export const ajaxSync = {
  headers: {},
  setHeaders(headers = {}) {
    ajaxSync.headers = { ...ajaxSync.headers, ...headers };
    return ajaxSync;
  },
  async get(url, params, setOptions) {
    let err = null;
    let res = null;
    const resUrl = urlFix(url);
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    try {
      res = await ajax.get(resUrl, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
  async post(url, params, setOptions) {
    let err = null;
    let res = null;
    let options = { headers: { ...ajaxSync.headers }, ...setOptions };
    try {
      res = await ajax.post(url, params, options);
      if (res.state != 200) {
        err = new Error(res.msg);
      }
    } catch (error) {
      err = error;
    }
    return ajaxComplateHandler({ url, res, err });
  },
};
