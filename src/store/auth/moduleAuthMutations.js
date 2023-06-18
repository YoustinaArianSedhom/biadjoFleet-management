/*=========================================================================================
  File Name: moduleAuthMutations.js
  Description: Auth Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "../../http/axios/index.js";

export default {
  UPDATE_USER_INFO(state, user) {
    state.user = user;
  },
  SET_BEARER(state, AccessToken) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + AccessToken;
  },
  REMOVE_BEARER() {
    delete axios.defaults.headers.common["Authorization"];
  },
  SET_USERS(state, user) {
    state.User = user;
  },
  SET_IS_Email_EXIST(state, result) {
    state.isEmailExist = result;
  },
  SET_IS_REGISTERED_COMPANY_SSUCCESSFUL(state, result) {
    state.isRegisteredCompany = result;
  },
  SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL(state, result) {
    state.isForgetPasswordSent = result;
  }
};
