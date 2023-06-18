/*=========================================================================================
  File Name: moduleCalendarMutations.js
  Description: Calendar Module Mutations
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

export default {
  SET_DRIVERS(state, driver) {
    state.driver = driver;
  },
  SET_DOCUMENTS(state, Documents) {
    state.Documents = Documents;
  },
  UPDATE_DOCUMENTS(state, Documents) {
    state.Documents = Documents;
  },
  SET_NODRIVERS(state, noDriver) {
    state.noDriver = noDriver;
  },
  SET_WaitingForVerificationDrivers(state, WaitingForVerificationDrivers) {
    state.WaitingForVerificationDrivers = WaitingForVerificationDrivers;
  },
  SET_DriverBiadjosHistory(state, DriverBiadjosHistory) {
    state.DriverBiadjosHistory = DriverBiadjosHistory;
  },
  SET_DriverSheduledBiadjos(state, DriverSheduledBiadjos) {
    state.DriverSheduledBiadjos = DriverSheduledBiadjos;
  },
  SET_DriverUnpaidBiadjo(state, DriverUnpaidBiadjos) {
    state.DriverUnpaidBiadjos = DriverUnpaidBiadjos;
  }
};
