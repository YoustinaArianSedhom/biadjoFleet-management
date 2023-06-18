/*=========================================================================================
  File Name: moduleCalendarActions.js
  Description: Calendar Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js";

export default {
  addItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Category/Save", item)
        .then(response => {
          commit("ADD_ITEM", Object.assign(item, { id: response.data.id }));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  fetchDataListItems({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/Category/GetAll")
        .then(response => {
          commit("SET_PRODUCTS", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  updateItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Category/Update", item)
        .then(response => {
          commit("UPDATE_PRODUCT", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  GetItemByID({ commit }, itemid) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Category/GetByID", itemid)
        .then(response => {
          commit("UPDATE_PRODUCT", response.data);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  removeItem({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Category/delete", item)
        .then(response => {
          commit("REMOVE_ITEM", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
