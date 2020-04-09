import axios from "axios";
import * as service from "./serviceHelpers";

const url = `${service.API_NODE_HOST_PREFIX}/api/skill/`;

const getByCatagory = (page, catagory) => {
  const config = {
    method: "GET",
    url: `${url}catagory/${page}/${catagory}`,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config)
    .then(service.onGlobalSuccess)
    .catch(service.onGlobalError);
};

export { getByCatagory };
