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
  addCountry({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("CountrySettings/Add", item)
        .then(response => {
          commit("ADD_COUNTRY", Object.assign(item, { ID: response.data.ID }));
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAllCountries({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          "https://restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag",
          {
            headers: null
          }
        )
        .then(response => {
          commit("SET_ALLCOUNTRY", response.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // https: //restcountries.eu/rest/v2/all?fields=name;alpha2Code;flag
  fetchAllCountriesList({ commit }) {
    return new Promise((resolve, reject) => {
      axios
        .get("/CountrySettings/GetListOfCountries")
        .then(response => {
          commit("SET_COUNTRY", response.data);

          // resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchCountrysByID({ commit }) {
    var Jsonvalue = {};
    Jsonvalue.CountryCode = "All";

    return new Promise((resolve, reject) => {
      axios
        .post("/CountrySettings/Get", Jsonvalue)
        .then(response => {
          if (response.status == 200) {
            commit("SET_COUNTRY", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  updateCountry({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/CountrySettings/Update?Id=" + item.Id, item)
        .then(response => {
          commit("UPDATE_COUNTRY", item);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetCountryById(context, country) {
    if (country.Id == undefined) {
      country.Id = "";
    }
    if (country.CountryCode == undefined) {
      country.CountryCode = " ";
    }
    return new Promise((resolve, reject) => {
      axios
        .post("/CountrySettings/Get", country)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
