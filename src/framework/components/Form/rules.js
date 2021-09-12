/**
 * 表单验证规则
 * @module utils/rules
 */
//
function trim(str) {
  return str.replace(/^\s*|\s*$/g, "");
}

// function sleep(times) {
//   return new Promise(resolve => setTimeout(resolve, times));
// }
//
export const rules = {
  // 必填
  required: (() => {
    const timeoutMap = {};
    const clearTimesMap = {};
    return {
      validator: (rule, value, callback, cancel) => {
        clearTimesMap[rule.fullField] = clearTimesMap[rule.fullField]
          ? clearTimesMap[rule.fullField] + 1
          : 1;
        if (clearTimesMap[rule.fullField] > 10) {
          clearTimesMap[rule.fullField] = 0;
        } else {
          clearTimeout(timeoutMap[rule.fullField] || null);
          typeof cancel === "function" && cancel();
        }

        timeoutMap[rule.fullField] = setTimeout(() => {
          const err = new Error("该项为必填项");
          if (typeof value === "string" && trim(value) === "") {
            callback(err);
          }
          if (value === "" || value === null || value === undefined) {
            callback(err);
          }
          if (
            Object.prototype.toString.call(value) === "[object Array]" &&
            value.length === 0
          ) {
            callback(err);
          }
          callback();
        }, 50);
      },
      required: true,
      trigger: "change,blur",
    };
  })(),
  //同步校验require
  syncRequire: {
    validator: (rule, value, callback) => {
      const err = new Error("该项为必填项");
      // console.log(value);
      if (typeof value === "string" && trim(value) === "") {
        callback(err);
        return;
      }
      if (value === "" || value === null || value === undefined) {
        callback(err);
        return;
      }
      if (
        Object.prototype.toString.call(value) === "[object Array]" &&
        value.length === 0
      ) {
        callback(err);
        return;
      }
      callback();
    },
    required: true,
    trigger: "change,blur",
  },
  //富文本最大长度
  richTextMaxLength(length) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          callback();
        } else if (typeof value === "string") {
          const div = document.createElement("div");
          div.innerHTML = value;
          const text = trim(div.innerText);
          if (text.length > length) {
            callback(`最多输入${length}个字符`);
          } else {
            callback();
          }
        }
      },
      trigger: "change,blur",
    };
  },
  //只有英文字母
  onlyLetter: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      //
      const reg = /^[A-Za-z\d]*$/;
      if (!reg.test(value)) {
        return callback(new Error("只能输入英文字母,数字"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  // 手机号
  mobile: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的手机号"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  // 固定电话
  telephone: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg =
        /(^(0\d{2})-(\d{8})$)|(^(0\d{3})-(\d{7})$)|(^(0\d{3})-(\d{8})$)|(^(0\d{2})-(\d{8})-(\d+)$)|(^(0\d{3})-(\d{7})-(\d+)$)|(^(\d{7})$)|(^(\d{8})$)/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的电话号码"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 手机号或者固定电话
  phoneOrMobile: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg0 = /^0\d{2,3}\d{7,8}$/;
      const reg1 = /^0\d{2,3}-\d{7,8}$/;
      const reg2 = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!reg0.test(value) && !reg1.test(value) && !reg2.test(value)) {
        return callback(new Error("请输入正确的手机号或电话号码"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 最小长度
  minLength(length) {
    return {
      min: length,
      message: `至少输入${length}个字符`,
      trigger: "change,blur",
    };
  },
  // 最大长度
  maxLength(length) {
    return {
      max: length,
      message: `最多输入${length}个字符`,
      trigger: "change,blur",
    };
  },
  maxLengthCompatible(length) {
    return {
      validator: (rule, value, callback) => {
        if (typeof value === "string" && value.length > length) {
          return callback(new Error(`最多输入${length}个字符`));
        } else if (typeof value === "number" && (value + "").length > length) {
          return callback(new Error(`最多输入${length}个字符`));
        }
        return callback();
      },
      trigger: "change,blur",
    };
  },
  // maxLengthCompatible(length) {
  //   return {
  //     validator: (rule, value, callback) => {
  //       if (typeof value === "string" && value.length > length) {
  //         return callback(new Error(`最多输入${length}个字符`));
  //       } else if (typeof value === "number" && (value + "").length > length) {
  //         return callback(new Error(`最多输入${length}个字符`));
  //       }
  //       return callback();
  //     },
  //     trigger: "change,blur"
  //   };
  // },
  // 整数
  int: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^\-?\d+?$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入整数"));
      }
      if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        return callback(new Error("您输入的数字太大啦"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  // 范围内的整数
  intRange(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+?$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入整数"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于等于${min}的整数`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于等于${max}的整数`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error("您输入的数字太大啦"));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // 范围内的长整型（64位）
  longRange(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+?$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入整数"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的整数`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的整数`));
        }
        if (value > Math.pow(2, 63) || value < -Math.pow(2, 63)) {
          return callback(new Error("您输入的数字太大啦"));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // 数字
  number: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^\-?\d+(\.\d+)?$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入数字"));
      }
      if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        return callback(new Error("您输入的数字太大啦"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  //只能输入的数字
  onlyNumber: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^\d+?$/;
      if (!reg.test(value)) {
        return callback(new Error("只能输入数字"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  // 范围内的数字
  numberRange(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        // const text = /^(\d+|\d+\.\d{1,2})$/;
        // if (!text.test(value)) {
        //   return callback(new Error("请两位数字"));
        // }
        if (!reg.test(value)) {
          return callback(new Error("请输入数字"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的数字`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error("您输入的数字太大啦"));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // 范围内的小数支持后四位
  numberDecimal(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        const text = /^(\d+|\d+\.\d{1,4})$/;
        if (!text.test(value)) {
          return callback(new Error("最多保留小数点后4位"));
        }
        if (!reg.test(value)) {
          return callback(new Error("请输入数字"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的数字`));
        }
        if (max !== undefined && max !== null && value > max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        // if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
        //   return callback(new Error('您输入的数字太大啦'));
        // }
        return callback();
      },
      trigger: "blur",
    };
  },

  // 平安猪使用量
  usageTwo(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        const text = /^(\d+|\d+\.\d{1,2})$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入数字"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于${min}的数字`));
        }
        if (!text.test(value)) {
          return callback(new Error("最多保留小数点后2位"));
        }
        if (max !== undefined && max !== null && value >= max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // 范围内的小数支持后俩位
  numberTwo(min, max) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        const reg = /^\-?\d+(\.\d+)?$/;
        const text = /^(\d+|\d+\.\d{1,2})$/;
        if (!reg.test(value)) {
          return callback(new Error("请输入数字"));
        }
        if (min !== undefined && min !== null && value < min) {
          return callback(new Error(`请输入大于等于${min}的数字`));
        }
        if (!text.test(value)) {
          return callback(new Error("最多保留小数点后2位"));
        }
        if (max !== undefined && max !== null && value >= max) {
          return callback(new Error(`请输入小于${max}的数字`));
        }
        if (value > Math.pow(2, 31) || value < -Math.pow(2, 31)) {
          return callback(new Error("您输入的数字太大啦"));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // ip地址
  ip: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg =
        /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的IP地址"));
      }
      return callback();
    },
    trigger: "blur",
  },
  email: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg =
        /^(([^()[\]\\.,;:\s@\"]+(\.[^()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的E-mail"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // URL地址
  url: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的URL地址"));
      }
      return callback();
    },
    trigger: "blur",
  },
  easyUrl: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg =
        /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (!reg.test(value) && !reg.test(`http://${value}`)) {
        return callback(new Error("请输入正确的URL地址"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 防伪码
  antifakeCode: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^(\d{20}|\d{21}|\d{22}|\d{36})$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入20位到22位或36位防伪码"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 物流码
  logisticsCode: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^(\d{16}|\d{17}|\d{18}|\d{32})$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入16位到18位或32位物流码"));
      }
      return callback();
    },
    trigger: "blur",
  },
  logisticsCodeButcher: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /^(\d{16}|\d{20})$/;
      if (!reg.test(value)) {
        return callback(new Error("请输入16位或20位物流码"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 身份证号
  idCardNo: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(value)) {
        return callback(new Error("请输入正确的身份证号"));
      }
      return callback();
    },
    trigger: "blur",
  },
  // 指定长度
  length(length) {
    return {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        if (value.length != length) {
          return callback(new Error(`请输入${length}位字符`));
        }
        return callback();
      },
      trigger: "blur",
    };
  },
  // 统一信用代码（18位数字与大写字母组合）
  socUnifiedCreditCode: {
    validator: async (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      const reg = /[0-9A-Z]{18}/;
      if (!reg.test(value) || value.length > 18) {
        return callback(
          new Error("请输入正确的统一信用代码（18位数字与大写字母组合）")
        );
      }
      return callback();
    },
    trigger: "blur",
  },
  chinese: {
    validator: (rule, value, callback) => {
      if (value === "" || value === null || value === undefined) {
        return callback();
      }
      //
      if (value.replace(/[\u4e00-\u9fa5]/g, "").length > 0) {
        return callback(new Error("请输入中文"));
      }
      return callback();
    },
    trigger: "change,blur",
  },
  // 要求不包含某些字符
  unInclude: {
    // 空格
    space: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        const reg = /\s/;
        if (reg.test(value)) {
          return callback(new Error("不能包含空格"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
    // 中文
    chinese: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        const reg = /[\u4e00-\u9fa5]/;
        if (reg.test(value)) {
          return callback(new Error("不能包含中文"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
    // 英文字母
    letter: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        const reg = /[A-z]/;
        if (reg.test(value)) {
          return callback(new Error("不能包含英文字母"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
    // 小写英文字母
    lowerLetter: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        const reg = /[a-z]/;
        if (reg.test(value)) {
          return callback(new Error("不能包含小写英文字母"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
    // 数字
    number: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        const reg = /\d/;
        if (reg.test(value)) {
          return callback(new Error("不能包含数字"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
    // 特殊字符  除了中文英文数字空格都算特殊字符
    special: {
      validator: (rule, value, callback) => {
        if (value === "" || value === null || value === undefined) {
          return callback();
        }
        //
        if (
          value
            .replace(/[\u4e00-\u9fa5]/g, "")
            .replace(/[A-z]/g, "")
            .replace(/\d/g, "")
            .replace(/\s/g, "").length > 0
        ) {
          return callback(new Error("不能包含特殊字符"));
        }
        return callback();
      },
      trigger: "change,blur",
    },
  },
};
export default rules;
