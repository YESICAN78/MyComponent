import request from "../../../utils/request";
import api from "../config/api";
export const getList = (data) =>
  request({
    url: api.getData.list,
    data,
    method: "get",
  });
