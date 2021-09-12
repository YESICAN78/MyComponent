// eslint-disable-next-line import/no-anonymous-default-export
export default (val = "") => {
  let result = "";
  try {
    let valStr = val.toString();
    result = (valStr || "").replace(/^\s*|\s*$/g, "");
  } catch (err) {
    console.error(val, err);
  }
  return result;
};
