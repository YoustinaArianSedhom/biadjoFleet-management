/*=========================================================================================
  File Name: moduleCourseClassActions.js
  Description: CourseClass Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from "@/axios.js";

export default {
  fetchAllCountriesList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/General/GetCountryList")
        .then(response => {
          commit("SET_COUNTRY", response.data);
          // (response.status);
          // resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // fetchCountrysByID({ commit }) {
  //     var Jsonvalue = {};
  //     Jsonvalue.CountryCode = "All";

  //     return new Promise((resolve, reject) => {
  //         axios.post("/CountrySettings/Get", Jsonvalue)
  //             .then((response) => {
  //                 commit('SET_COUNTRY', response.data)
  //                     // (response.status);
  //                     // resolve(response)
  //             })
  //             .catch((error) => { reject(error) })
  //     })
  // },

  // updateCountry({ commit }, item) {

  //     return new Promise((resolve, reject) => {

  //         axios.post("/CountrySettings/Update?Id=" + item.Id, item)
  //             .then((response) => {

  //                 commit('UPDATE_COUNTRY', item)
  //                 resolve(response)
  //             })
  //             .catch((error) => { reject(error) })
  //     })
  // },
  // GetCountryById(context, country) {

  //     if (country.Id == undefined) { country.Id = "" }
  //     if (country.CountryCode == undefined) { country.CountryCode = " " }
  //     return new Promise((resolve, reject) => {
  //         axios.post("/CountrySettings/Get", country)
  //             .then((response) => {

  //                 resolve(response)
  //             })
  //             .catch((error) => { reject(error) })
  //     })
  // },

  ContactUs(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/General/ContactUs", item)
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
  GetStateList({ commit }, item) {
    debugger;
    // let item = {};
    // debugger;
    // item.CountryCode = "EG";
    return new Promise((resolve, reject) => {
      axios
        .post("/General/GetStateList", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
            commit("SET_State", response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetCityList({ commit }, item) {
    debugger;
    return new Promise((resolve, reject) => {
      axios
        .post("/General/GetCityList", item)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
            commit("SET_City", response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
