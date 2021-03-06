import request from "./../request/request.js";
import API from "./../request/api.js";

export default {
  list(params) {
    return request.get(API.manager, params);
  },
  single(id) {
    return request.get(API.managerInfo(id));
  },
  insert(params) {
    return request.post(API.manager, params);
  },
  updated(id, params) {
    return request.put(API.managerInfo(id), params);
  },
  delete(id) {
    return request.delete(API.managerInfo(id));
  }
};
