/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Clients/pixinvent
==========================================================================================*/
import axios from "@/axios.js";

export default {
  fetchClientsList({ commit }) {
    var Jsonvalue = {};

    Jsonvalue.CountryCode = "EG";
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetAll", Jsonvalue)
        .then(response => {
          if (response.status == 200) {
            commit("SET_CLIENTS", response.data);
          }
          // resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  search({ commit }, item) {
    if (item.CountryCode == undefined) {
      item.CountryCode = "EG";
    }
    if (item.PhoneNumber == undefined) {
      item.PhoneNumber = "";
    }
    if (item.UserBalance == undefined) {
      item.UserBalance = "";
    }
    if (item.AccountStatus == undefined) {
      item.AccountStatus = "";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/Search", item)
        .then(response => {
          if (response.status == 200) {
            commit("SET_CLIENTS", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetClientById(context, client) {
    if (client.Id == undefined) {
      client.Id = " ";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetUserDetails", client)
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
  GetScheduledBiadjo(context, client) {
    if (client.Id == undefined) {
      client.Id = " ";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/GetScheduledBiadjo", client)
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
  BiadjoHistory(context, client) {
    if (client.Id == undefined) {
      client.Id = " ";
    }

    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/BiadjoHistory", client)
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
  UpdateClientById(context, client) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Clients/Update", client)
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
