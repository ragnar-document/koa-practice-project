const PREFIX = "/api";
export default {
  manager: PREFIX + "/manager",
  managerInfo: id => `${PREFIX}/manager/${id}`
};
