/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import axios from "@/axios.js";
// import firebase from 'firebase/app'
// import 'firebase/auth'
//import router from "@/router";

export default {
  fetchCompanyDetails(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/GetComapneyDetails", item)
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
  UploadCompanyLogo(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", JSON.stringify(image[Object.keys(image)[0]]));
    formData.append("file", image.params.file, image.params.file.name);
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/UploadCompanyLogo", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
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
  fetchCompanyUsers(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/GetUserListForCompany", item)
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
  registCompanyUser(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/AddUserToCompany", item)
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
  editCompanyDetails(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/EditCompanyDetails", item)
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
  ViewSubmitedOrders(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/ViewSubmitedOrdersAndOffersForCompany", Company)
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

  ViewBiadjoHistory(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/BiadjoHistoryForCompany", Company)
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
  fetchCompanyWalletBalance(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/CompanyWalletBalance", Company)
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
  fetchCompanyTransactionHistory(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/TransactionsHistoryCompany", Company)
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
  fetchCompanyBankAccountInfo(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/GetCompanyBankAccountInfo", Company)
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
  updateCompanyBankAccountInformation(commit, BankInfo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/UpdateCompanyBankAccountInformation", BankInfo)
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
  applyBankInfoToAllDrivers(commit, Company) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/ApplyBankInfoToAllDrivers", Company)
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
