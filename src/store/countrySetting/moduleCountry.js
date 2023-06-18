/*=========================================================================================
  File Name: moduleCountry.js
  Description: Country Module
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import state from "./moduleCountryState.js";
import mutations from "./moduleCountryMutations.js";
import actions from "./moduleCountryActions.js";
import getters from "./moduleCountryGetters.js";

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters
};
