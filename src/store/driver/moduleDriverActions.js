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
  fetchDriversList({ commit }) {
    var Jsonvalue = {};

    Jsonvalue.CountryCode = "EG";
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetAll", Jsonvalue)
        .then(response => {
          if (response.status == 200) {
            commit("SET_DRIVERS", response.data);
          }
          // resolve(response)
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  search({ commit }, item) {
    if (item.VehicleOption == undefined) {
      item.VehicleOption = "";
    }
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/GetDriversListForCompany", item)
        .then(response => {
          if (response.status == 200) {
            commit("SET_DRIVERS", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  NoDriverFound({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjos/Search", item)
        .then(response => {
          if (response.status == 200) {
            commit("SET_NODRIVERS", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  WaitingForVerificationDrivers({ commit }, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/WaitingForVerificationDrivers", Model)
        .then(response => {
          if (response.status == 200) {
            commit("SET_WaitingForVerificationDrivers", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  // GetBiadjoByid(context, Biadjo) {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post("/FleetBiadjo/BiadjoDetails", Biadjo)
  //       .then(response => {
  //         if (response.status == 200) {
  //           resolve(response);
  //         }
  //       })
  //       .catch(error => {
  //         reject(error);
  //       });
  //   });
  // },
  getDriverUnpaidBiadjos({ commit }, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/GetDriverUnpaiddBiadjo", Model)
        .then(response => {
          if (response.status == 200) {
            commit("SET_DriverUnpaidBiadjo", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  GetTransactionsDrivers(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/TransactionsHistoryDrivers", driver)
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
  getDriverBiadjosHistory({ commit }, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/BiadjoHistoryDriver", Model)
        .then(response => {
          if (response.status == 200) {
            commit("SET_DriverBiadjosHistory", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  getScheduledBiadjos({ commit }, Model) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/ScheduledBiadjosDriver", Model)
        .then(response => {
          if (response.status == 200) {
            commit("SET_DriverSheduledBiadjos", response.data);
          }
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  update({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/Update", item)
        .then(response => {
          if (response.status == 200) {
            commit("UPDATE_PRODUCT", response.data);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  UpdateDriverById(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/Update", user)
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
  GitDocList() {
    return new Promise((resolve, reject) => {
      axios
        .get("/Drivers/GetDocList")
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
  GetDocTypeStatus(context, DriverId) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/GetDocTypeStatus", DriverId)
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
  bankAccountInfoData(context, DriverId) {
    return new Promise((resolve, reject) => {
      let user = {};
      user.DriverId = DriverId;
      axios
        .post("/FleetDrivers/GetDriverBankAccountInfo", user)
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
  updateBankAccountInfoData(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/UpdateDriverBankAccountInformation", item)
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
  UpdateDriverStatus(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/UpdateDriverStatus", user)
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
  GetDriverById(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/GetDriverDetails", driver)
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
  RegisterDriver(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/RegisterDriver", item)
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
  GetDriverNameById(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/GetDriverDetails", driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response.data);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  CheckIfDriverExist(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/CheckIfDriverExist", driver)
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
  SendOTPToDriver(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/SendOTPToDriver", driver)
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
  AddDriverToCompany(context, driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/AddDriverToCompany", driver)
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

  GetDocumentById(context, driver) {
    if (driver.DriverId == undefined) {
      driver.DriverId = "";
    }
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/Documents", driver)
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
  updateDocumentStatusByID(commit, Documents) {
    // if (Documents.DriverId == undefined) { Documents.DriverId = "" }
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UpdateDocumentStatus", Documents)
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
  UploadDoc(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", JSON.stringify(image[Object.keys(image)[0]]));
    formData.append("file", image.params.file, image.params.file.name);
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UploadDoc", formData, {
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
  UpdateDriverAccountStatus(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Drivers/UpdateDriverAccountStatus", Driver)
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
  SubmitOfferToBiadjo(context, Biadjo) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetBiadjo/SendOfferByFleet", Biadjo)
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
  RemoveDriverFromCompany(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/RemoveDriverFromCompany", Driver)
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

  ViewSubmitedOrders(commit, Documents) {
    // if (Documents.DriverId == undefined) { Documents.DriverId = "" }
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetDrivers/ViewSubmitedOrdersAndOffers", Documents)
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
  getDriverLocation(context, Driver) {
    return new Promise((resolve, reject) => {
      axios
        .post("/Biadjo/GetDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  }
};
