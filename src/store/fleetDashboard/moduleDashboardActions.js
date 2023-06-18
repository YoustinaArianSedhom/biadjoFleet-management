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
  IncomePerDayforWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/IncomePerDayforWeek", item)
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
  IncomeForYear(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/IncomeForYear", item)
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

  BiadjoSchedualeForWeek(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/BiadjoSchedualeForWeek", item)
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

  DriversPerTruckType(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/DriversPerTruckType", item)
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

  BiadjoSchedualePerStatusForToday(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/BiadjoSchedualePerStatusForToday", item)
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
  UnPaideBiadjosOutstandingBalance(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDashboard/UnPaideBiadjosOutstandingBalance", item)
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
