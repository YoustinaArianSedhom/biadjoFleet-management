/*=========================================================================================
  File Name: moduleDataList.js
  Description: Calendar Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Client/pixinvent
==========================================================================================*/

import state from "./moduleClientState.js";
import mutations from "./moduleClientMutations.js";
import actions from "./moduleClientActions.js";
import getters from "./moduleClientGetters.js";

export default {
  isRegistered: false,
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
