<!-- =========================================================================================
	File Name: App.vue
	Description: Main vue file - APP
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
	Author: Pixinvent
	Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import themeConfig from "@/../themeConfig.js";
import jwt from "@/http/requests/auth/jwt/index.js";
import firebase from "firebase/app";
import "firebase/messaging";

/* eslint-disable */
export default {
  data() {
    return {
      CurrentStatus: null
    };
  },
  watch: {
    "$store.state.theme"(val) {
      this.toggleClassInBody(val);
    },
    "$vs.rtl"(val) {
      document.documentElement.setAttribute("dir", val ? "rtl" : "ltr");
    }
  },
  // components: {BaseTimer},
  methods: {
    FcmStart() {
      var config = {
        apiKey: "AIzaSyDVxcAS9EWP-Pc8Pu0Bi84WtHFZu7PePVk",
        authDomain: "biadjo-1546341863949.firebaseapp.com",
        databaseURL: "https://biadjo-1546341863949.firebaseio.com",
        projectId: "biadjo-1546341863949",
        storageBucket: "biadjo-1546341863949.appspot.com",
        messagingSenderId: "1058566822933",
        appId: "1:1058566822933:web:d0cc8695c063c7363d421c",
        measurementId: "G-9B0EZQSYLT"
      };
      firebase.initializeApp(config);

      var messaging = firebase.messaging();

      messaging.usePublicVapidKey(
        "BHifL1PykXA3YBKzKJQERNau4OdyXP2Xj1Sarqqs2Kl5q4z9lcUK7n0EsTxknRkx8gtylQqKAJFGQIrv4PD_jK4"
      );

      messaging
        .requestPermission()
        .then(() => {
          messaging.getToken().then(token => {
            messaging.onMessage(
              payload => {
                switch (payload.data.controller) {
                  case "logout":
                    this.$store.dispatch("auth/logout");

                    break;
                  case "reset":
                    location.reload("/");

                    break;

                  //   case "changeCountry":
                  //     break;
                  case "GoTo":
                    this.$router.push({ name: payload.data.routeName });

                    break;
                }
                if (!payload.data.controller) {
                  this.$store.commit("UPDATE_NotificationList", payload);
                }
              },
              e => {
                console.log(e);
              }
            );
            this.saveNotificationToken(token);
          });
        })
        .catch(err => {
          console.log("Unable to get permission to notify.", err);
        });
    },

    saveNotificationToken(token) {
      var Obj = {};
      Obj.NewToken = token;
      Obj.UserId = this.$store.state.AppActiveUser.Id;
      this.$store.dispatch("auth/UpdateFCMToken", Obj).then(() => {
        this.$store.dispatch("auth/refreshCurrentUser");
      });
    },
    checkAndAttachMapScript() {
      let initialized = !!window.google;
      return new Promise((resolve, reject) => {
        if (initialized) {
          return resolve(window.google);
        }

        initialized = true;
        window.mapApiInitialized = () => resolve(window.google);
        const script = document.createElement("script");
        script.async = true;
        script.defer = true;
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAoTlXgH1pKuHPcbZsrIijQV0T_Tr926UE&libraries=places,geometry&language=${this.$i18n.locale}&callback=mapApiInitialized`;
        script.onload = () => {
          resolve(window.google);
        };
        script.onerror = () => reject(new Error("Script load error: " + src));
        document.querySelector("head").appendChild(script);
      });
    },
    showSuccessfulregistration() {
      this.$vs.notify({
        position: "top-center",
        text: this.$t("SuccessfulRegistration"),
        color: "primary"
      });
    },
    IBANError() {
      this.$vs.notify({
        color: "danger",
        position: "right-bottom",
        text: this.$t("IBANErrorMsg")
      });
    },
    showNotSupportThisCountry() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        text: this.$t("NotSupportThisCountry")
      });
    },
    showNoRightAccessToLogin() {
      this.$vs.notify({
        color: "danger",
        position: "top-center",
        text: this.$t("AccessDenied")
      });
    },
    showFillData() {
      this.$vs.notify({
        color: "danger",
        position: "right-bottom",
        text: this.$t("PleaseFillAllRequiredData")
      });
    },
    showError() {
      this.$vs.notify({
        color: "danger",
        position: "right-bottom",
        text: this.$t("showError")
      });
    },
    showSuccessCreate() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("RegisterCreatedSuccessfuly")
      });
    },
    showSuccessContactUs() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("ContactUsMessageSentSuccessfully")
      });
    },
    showDriverAddeddSuccessfuly() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("DriverAddeddSuccessfuly")
      });
    },
    showSuccessRemoveUser() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("OperationDoneSuccessfuly")
      });
    },
    DriverNotFound() {
      this.$vs.notify({
        color: "warning",
        position: "top-center",
        text: this.$t("ThisDriverNotFound")
      });
    },
    IncorrectCode() {
      this.$vs.notify({
        color: "danger",
        position: "top-center",
        text: this.$t("IncorrectCode")
      });
    },
    showAlreadyExistInAnotherCompany() {
      this.$vs.notify({
        color: "danger",
        position: "bottom-center",
        text: this.$t("showAlreadyExistInAnotherCompany")
      });
    },
    showAlreadyExist() {
      this.$vs.notify({
        color: "danger",
        position: "bottom-center",
        text: this.$t("ThisUserAlreadyExist")
      });
    },
    showAddDriverToBiadjoSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("Assign")
      });
    },
    showSuccessfulyAssignedToDriver() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("Assign")
      });
    },
    showSuccess() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("showUpdate")
      });
    },
    showNoDrivers() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        text: this.$t("showNoDrivers")
      });
    },
    showNoRecords() {
      this.$vs.notify({
        color: "warning",
        position: "bottom-center",
        text: this.$t("showNoDataAvailable")
      });
    },
    showCheckEmail() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("showCheckEmail")
      });
    },
    showPasswordChanged() {
      this.$vs.notify({
        color: "primary",
        position: "top-center",
        text: this.$t("showPasswordChanged")
      });
    },
    userTypeNotAllowedToAccessCurrentPage(UserType) {
      if (UserType == "FAT2") {
        this.$router.go(-1);
      }
    },

    validCompanyUser(CompanyId) {
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (CompanyId != userInfo.CompaneyId) {
        this.$router.push("/").catch(() => {});
      }
    },
    AllowToAccessCurrentBiadjo(FleetCompanyID) {
      if (
        FleetCompanyID != 0 &&
        FleetCompanyID !=
          JSON.parse(localStorage.getItem("userInfo")).CompaneyId
      ) {
        this.$router.push("/pages/Error404");
      }
    },

    toggleClassInBody(className) {
      if (className == "dark") {
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
        document.body.classList.add("theme-dark");
      } else if (className == "semi-dark") {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        document.body.classList.add("theme-semi-dark");
      } else {
        if (document.body.className.match("theme-dark")) {
          document.body.classList.remove("theme-dark");
        }
        if (document.body.className.match("theme-semi-dark")) {
          document.body.classList.remove("theme-semi-dark");
        }
      }
    },
    handleWindowResize() {
      this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    },
    handleScroll() {
      this.$store.commit("UPDATE_WINDOW_SCROLL_Y", window.scrollY);
    }
  },
  mounted() {
    this.toggleClassInBody(themeConfig.theme);
    this.$store.commit("UPDATE_WINDOW_WIDTH", window.innerWidth);
    if (this.$store.state.auth.isUserLoggedIn()) {
      if (Notification.permission === "granted") {
        this.FcmStart();
      }
      if (Notification.permission === "default") {
        // If it's okay let's create a notification
        this.$vs.dialog({
          type: "confirm",
          color: "primary",
          title: this.$t("Notification"),
          text: this.$t("PleaseAllowNotification"),
          accept: this.FcmStart,
          cancel: this.FcmStart,
          cancelText: this.$t("Cancel"),
          acceptText: this.$t("Save")
        });
      }
      // if (Notification.permission === "denied") {
      //   // If it's okay let's create a notification
      //   this.$vs.notify({
      //     title: this.$t("Notification"),
      //     text: this.$t("PleaseAllowNotification"),
      //     color: "warning",
      //     position: "top-center",
      //     iconPack: "feather",
      //     icon: "icon-bell"
      //   });
      // }
    }
    // var db;
    // var request = indexedDB.open("MyTestDatabase");
    // request.onerror = function(event) {
    //   console.log("Why didn't you allow my web app to use IndexedDB?!");
    // };
    // request.onsuccess = function(event) {
    //   db = event.target.result;
    //   console.log(db);
    // };
  },
  async created() {
    jwt.init();
    if (this.$store.state.auth.isUserLoggedIn()) {
      this.$store
        .dispatch("auth/refreshCurrentUser")
        .then(response => {
          if (response.data.AccountStatus == "AS1") {
            this.$acl.change(response.data.AccountType);
          }
          if (response.data.AccountStatus != "AS1") {
            this.$store.commit("CLEAR_USER_INFO", null, { root: true });
            this.$store.commit("REMOVE_USER_STORE", null, { root: true });
            this.$store.dispatch("auth/logout");
          }
        })
        .catch(() => {
          this.$store.commit("CLEAR_USER_INFO", null, { root: true });
          this.$store.commit("REMOVE_USER_STORE", null, { root: true });
          this.$store.dispatch("auth/logout");
        });
    }

    if (localStorage.getItem("SaveLang") === "ar") {
      this.$vs.rtl = true;
    }

    window.showError = this.showError;
    window.AllowToAccessCurrentBiadjo = this.AllowToAccessCurrentBiadjo;
    window.showFillData = this.showFillData;
    window.showSuccess = this.showSuccess;
    window.showAddDriverToBiadjoSuccess = this.showAddDriverToBiadjoSuccess;
    window.showNoRecords = this.showNoRecords;
    window.showCheckEmail = this.showCheckEmail;
    window.showPasswordChanged = this.showPasswordChanged;
    window.userTypeNotAllowedToAccessCurrentPage = this.userTypeNotAllowedToAccessCurrentPage;
    window.showSuccessCreate = this.showSuccessCreate;
    window.showAlreadyExist = this.showAlreadyExist;
    window.showAlreadyExistInAnotherCompany = this.showAlreadyExistInAnotherCompany;
    window.DriverNotFound = this.DriverNotFound;
    window.showSuccessRemoveUser = this.showSuccessRemoveUser;
    window.IncorrectCode = this.IncorrectCode;
    window.showSuccessfuly = this.showSuccessfuly;
    window.showNoRightAccessToLogin = this.showNoRightAccessToLogin;
    window.showSuccessfulregistration = this.showSuccessfulregistration;
    window.showSuccessfulyAssignedToDriver = this.showSuccessfulyAssignedToDriver;
    window.showDriverAddeddSuccessfuly = this.showDriverAddeddSuccessfuly;
    window.checkAndAttachMapScript = this.checkAndAttachMapScript;
    window.showSuccessContactUs = this.showSuccessContactUs;
    window.showNoDrivers = this.showNoDrivers;
    window.IBANError = this.IBANError;
    window.showNotSupportThisCountry = this.showNotSupportThisCountry;
    window.validCompanyUser = this.validCompanyUser;

    let dir = this.$vs.rtl ? "rtl" : "ltr";
    document.documentElement.setAttribute("dir", dir);

    window.addEventListener("resize", this.handleWindowResize);
    window.addEventListener("scroll", this.handleScroll);
    try {
      await this.$auth.renewTokens();
    } catch (e) {
      console.error(e);
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.handleWindowResize);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style scoped>
#loading-bg {
  width: 100%;
  height: 100%;
  background: #fff;
  display: block;
  position: absolute;
}

.loading-logo {
  position: absolute;
  left: calc(50% - 45px);
  top: 35%;
}

.loading {
  position: absolute;
  left: calc(50% - 35px);
  top: 50%;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 3px solid transparent;
}

.loading .effect-1,
.loading .effect-2 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effect-1 {
  animation: rotate 1s ease infinite;
}

.loading .effect-2 {
  animation: rotateOpacity 1s ease infinite 0.1s;
}

.loading .effect-3 {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-left: 3px solid rgba(121, 97, 249, 1);
  -webkit-animation: rotateOpacity 1s ease infinite 0.2s;
  animation: rotateOpacity 1s ease infinite 0.2s;
  border-radius: 50%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.loading .effects {
  transition: all 0.3s ease;
}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
  }
}

@keyframes rotateOpacity {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
    opacity: 0.1;
  }
  100% {
    -webkit-transform: rotate(1turn);
    transform: rotate(1turn);
    opacity: 1;
  }
}
</style>
