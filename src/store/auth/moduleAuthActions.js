/*=========================================================================================
  File Name: moduleAuthActions.js
  Description: Auth Module Actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/

import jwt from "../../http/requests/auth/jwt/index.js";
import axios from "@/axios.js";
import router from "@/router";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";

export default {
  ChangePassword(context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post("/ChangePassword", payload)
        .then(response => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  // JWT
  loginJWT({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/Login", user)
        .then(response => {
          // If the   re's user data in response
          if (response.status == 200) {
            // Navigate User to homepage

            //window.location="/"

            // Set AccessToken
            localStorage.setItem(
              "TokenExpiration",
              response.data.TokenExpiration
            );
            localStorage.setItem("AccessToken", response.data.AccessToken);
            localStorage.setItem("RefreshToken", response.data.RefreshToken);

            // Update user details
            commit("UPDATE_USER_INFO", response.data, { root: true });

            // Set bearer token in axios
            commit("SET_BEARER", response.data.AccessToken);
            //router.push(router.currentRoute.query.to || '/')
            resolve(response);
          } else {
            reject({ message: "Wrong Email or Password" });
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerUserJWT({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/RegisterUser", user)
        .then(response => {
          // Redirect User
          router.push(router.currentRoute.query.to || "/");

          // Update data in localStorage
          localStorage.setItem("AccessToken", response.data.AccessToken);
          localStorage.setItem("RefreshToken", response.data.RefreshToken);

          commit("UPDATE_USER_INFO", response.data, { root: true });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  search({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/AdminAccount/GetUsers", user)
        .then(response => {
          // If there's user data in response
          if (response.status == 200) {
            if (response.data.length > 0) {
              commit("SET_USERS", response.data);
              resolve(response);
            } else {
              commit("SET_USERS", response.data);
              resolve(response);
              window.ShowNoRecords();
            }
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchAccessToken() {
    return new Promise(resolve => {
      jwt
        .RefreshToken()
        .then(response => {
          resolve(response);
        })
        .catch(function() {
          router.push("/pages/login");
        });
    });
  },
  logout({ commit }) {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("RefreshToken");
    localStorage.removeItem("TokenExpiration");
    localStorage.removeItem("userInfo");
    commit("CLEAR_USER_INFO", null, { root: true });
    commit("REMOVE_USER_STORE", null, { root: true });
    // Set bearer token in axios
    commit("REMOVE_BEARER");
    router.push("/user/login/login");
  },

  CheckEmailExist({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/CheckEmailExist", item)
        .then(response => {
          if (response.status == 200) {
            commit("SET_IS_Email_EXIST", response.data.result);
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  registerCompanyJWT({ commit }, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/RegisterCompany", user)
        .then(response => {
          if (response.status == 200) {
            response.data;
            commit(
              "SET_IS_REGISTERED_COMPANY_SSUCCESSFUL",
              response.data.result
            );
            resolve(response);
          }
          // Redirect User
          //router.push(router.currentRoute.query.to || '/')
        })
        .catch(error => {
          commit("SET_IS_REGISTERED_COMPANY_SSUCCESSFUL", "false");
          reject(error);
        });
    });
  },

  ForgotPasswordJWT({ commit }, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/ForgotPassword", item)
        .then(response => {
          if (response.status == 200) {
            response.data;
            commit(
              "SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL",
              response.data.result
            );
            resolve(response);
          }
          // Redirect User
          //router.push(router.currentRoute.query.to || '/')
        })
        .catch(error => {
          commit("SET_IS_FORGETPASSWORD_EMAILSENT_SSUCCESSFUL", "false");

          reject(error);
        });
    });
  },

  fetchUserDetails({ commit }, user) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      JsonValue.Email = user;

      axios
        .post("/FleetUser/GetUserDetails", JsonValue)
        .then(response => {
          if (response.data.ProfilePicture) {
            let Base64ProfilePic = FileEncryptionHandler.decrypt(
              JSON.parse(response.data.ProfilePicture)
            );
            response.data.ProfilePicture = Base64ProfilePic;
          }
          commit("UPDATE_USER_INFO", response.data, { root: true });

          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  fetchUserDetailsList(context, user) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/GetUserDetails", user)
        .then(response => {
          if (response.status == 200) {
            if (response.data.ProfilePicture) {
              let Base64ProfilePic = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePicture)
              );
              response.data.ProfilePicture = Base64ProfilePic;
            }

            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  refreshCurrentUser({ commit }) {
    return new Promise((resolve, reject) => {
      var JsonValue = {};
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      JsonValue.Email = userInfo.Email;
      axios
        .post("/FleetUser/GetUserDetails", JsonValue)
        .then(response => {
          if (response.status == 200) {
            if (response.data.ProfilePicture) {
              let Base64ProfilePic = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePicture)
              );
              response.data.ProfilePicture = Base64ProfilePic;
            }

            commit("UPDATE_USER_INFO", response.data, { root: true });
            resolve(response);
          }
        })
        .catch(function(error) {
          reject(error);
        });
    });
  },
  resetPasswordByUser(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/ChangePassword", user)
        .then(response => {
          if (response.data.result == "Success") {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  UploadProfilePic(context, image) {
    const formData = new FormData();
    // var jsonObject = image.params.Id;
    formData.append("jsonObject", JSON.stringify(image[Object.keys(image)[0]]));
    formData.append("file", image.params.file, image.params.file.name);
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/UploadProfilePic", formData, {
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

  resetPasswordByAdmin(context, user) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/ResetPasswordByAdmin", user)
        .then(response => {
          if (response.data.result == "Success") {
            resolve(response);
          }
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  editUserDetails(context, item) {
    return new Promise((resolve, reject) => {
      //
      axios
        .post("/FleetUser/EditUserDetails", item)
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
  },
  UpdateFCMToken(context, item) {
    return new Promise((resolve, reject) => {
      axios
        .post("/FleetUser/UpdateFCMToken", item)
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
