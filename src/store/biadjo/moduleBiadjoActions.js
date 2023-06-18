import axios from "@/axios.js";

export default {
  ScheduledBiadjosForCompany({ commit }, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/ScheduledBiadjosForCompany", Biadjo)
        .then(response => {
          if (response.status == 200) {
            commit("SET_BiadjoS", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetBiadjoByid(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/BiadjoDetails", Biadjo)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UpdateBiadjoStatus(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/UpdateBiadjoStatus", Biadjo)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetDriversListForBiadjoinCompany(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/GetDriversListForBiadjoinCompany", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  AssignDriverToBiadjo(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/AssignDriverToBiadjo", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
