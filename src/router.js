import Vue from "vue";
import Router from "vue-router";
import store from "@/store/store.js";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      // =============================================================================
      // MAIN LAYOUT ROUTES
      // =============================================================================
      path: "",
      component: () => import("./layouts/main/Main.vue"),
      children: [
        // =============================================================================
        // Theme Routes
        // =============================================================================
        {
          path: "/",
          name: "home",
          component: () => import("./views/Home.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/ScheduledBiadjosForCompany",
          name: "ScheduledBiadjosForCompany",
          component: () =>
            import("@/views/biadjo/ScheduledBiadjosForCompany.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ScheduledBiadjosForCompany", active: true }
            ],
            pageTitle: "ScheduledBiadjosForCompany",
            rule: "Anonymous"
          }
        },
        {
          path: "/BiadjoDetails/:Id?",
          name: "BiadjoDetails",
          component: () => import("@/views/biadjo/BiadjoDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "BiadjoDetails", active: true }
            ],
            pageTitle: "BiadjoDetails",
            rule: "Anonymous"
          }
        },
        {
          path: "/RegisterDriver",
          name: "RegisterDriver",
          component: () => import("@/views/driver/RegisterDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "RegisterDriver", active: true }
            ],
            pageTitle: "RegisterDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/UploadDocuments/:Id",
          name: "UploadDocuments",
          component: () => import("@/views/driver/UploadDocuments.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UploadDocuments", active: true }
            ],
            pageTitle: "UploadDocuments",
            rule: "Anonymous"
          }
        },
        {
          path: "/ViewDrivers",
          name: "ViewDrivers",
          component: () => import("@/views/driver/ViewDrivers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", active: true }
            ],
            pageTitle: "Drivers",
            rule: "Anonymous"
          }
        },
        {
          path: "/AddDriver",
          name: "AddDriver",
          component: () => import("@/views/driver/AddDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "AddDriver", active: true }
            ],
            pageTitle: "AddDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/DriverUnpaidBiadjos/:Id",
          name: "DriverUnpaidBiadjos",
          component: () => import("@/views/driver/DriverUnpaidBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverUnpaidBiadjos", active: true }
            ],
            pageTitle: "DriverUnpaidBiadjos",
            rule: "Anonymous"
          }
        },
        {
          path: "/Setting/TransactionsHistoryOfDriver/:Id",
          name: "TransactionsHistoryOfDriver",
          component: () =>
            import("@/views/driver/TransactionsHistoryOfDriver.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "TransactionsHistoryOfDriver", active: true }
            ],
            pageTitle: "TransactionsHistoryOfDriver",
            rule: "Anonymous"
          }
        },
        {
          path: "/FollowDriverOnMap/:Id",
          name: "FollowDriverOnMap",
          component: () => import("@/views/driver/FollowDriverOnMap.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverLocation", active: true }
            ],
            pageTitle: "DriverLocation",
            rule: "Anonymous"
          }
        },
        {
          path: "/DriverBiadjosHistory/:Id",
          name: "DriverBiadjosHistory",
          component: () => import("@/views/driver/DriverBiadjosHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverBiadjosHistory", active: true }
            ],
            pageTitle: "DriverBiadjosHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/DriverScheduledBiadjos/:Id",
          name: "DriverScheduledBiadjos",
          component: () => import("@/views/driver/DriverScheduledBiadjos.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverScheduledBiadjos", active: true }
            ],
            pageTitle: "DriverScheduledBiadjos",
            rule: "Anonymous"
          }
        },

        {
          path: "/Setting/BankAccountEdit/:Id",
          name: "BankAccountEdit",
          component: () => import("@/views/driver/BankAccountEdit.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "BankAccountEdit", active: true }
            ],
            pageTitle: "BankAccountEdit",
            rule: "Owner"
          }
        },
        {
          path: "/Setting/DriverProfile/:Id",
          name: "DriverProfile",
          component: () => import("@/views/driver/DriverProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverProfile", active: true }
            ],
            pageTitle: "DriverProfile",
            rule: "Anonymous"
          }
        },

        {
          path: "/user/UserPersonalDetails",
          name: "UserPersonalDetails",
          component: () => import("@/views/user/UserPersonalDetails.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "UserPersonalDetails", active: true }
            ],
            rule: "Anonymous",
            pageTitle: "UserPersonalDetails"
          }
        },
        {
          path: "/general/ContactUs",
          name: "ContactUs",
          component: () => import("@/views/generalForms/ContactUs.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "ContactUs", active: true }
            ],
            rule: "Anonymous",
            pageTitle: "ContactUs"
          }
        },

        {
          path: "/company/CompanyProfile",
          name: "CompanyProfile",
          component: () => import("@/views/company/CompanyProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyProfile", active: true }
            ],
            pageTitle: "CompanyProfile",
            rule: "Owner"
          }
        },
        {
          path: "/company/CompanyUsers",
          name: "CompanyUsers",
          component: () => import("@/views/company/CompanyUsers.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUsers", active: true }
            ],
            pageTitle: "CompanyUsers",
            rule: "Owner"
          }
        },
        {
          path: "/company/CompanyUserProfile/:Id",
          name: "CompanyUserProfile",
          component: () => import("@/views/company/CompanyUserProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUsers", url: "/company/CompanyUsers" },
              { title: "CompanyUserProfile", active: true }
            ],
            pageTitle: "CompanyUserProfile",
            rule: "Owner"
          }
        },
        {
          path: "/company/CompanyUserRegister",
          name: "CompanyProfile",
          component: () => import("@/views/company/CompanyUserRegister.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUsers", url: "/company/CompanyUsers" },
              { title: "CompanyUserRegister", active: true }
            ],
            pageTitle: "CompanyUserRegister",
            rule: "Owner"
          }
        },
        {
          path: "/company/EditCompanyProfile/:Id",
          name: "EditCompanyProfile",
          component: () => import("@/views/company/EditCompanyProfile.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "EditCompanyProfile", active: true }
            ],
            pageTitle: "EditCompanyProfile",
            rule: "Owner"
          }
        },
        {
          path: "/company/EditCompanyUser/:Id",
          name: "EditCompanyUser",
          component: () => import("@/views/company/EditCompanyUser.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyUsers", url: "/company/CompanyUsers" },
              { title: "EditCompanyUser", active: true }
            ],
            pageTitle: "EditCompanyUser",
            rule: "Owner"
          }
        },
        {
          path: "/driverSubmittedOrders/:Id",
          name: "driverSubmittedOrders",
          component: () => import("@/views/driver/DriverSubmittedOrders.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "Drivers", url: "/ViewDrivers" },
              { title: "DriverSubmittedOrders", active: true }
            ],

            rule: "Anonymous"
          }
        },
        {
          path: "/CompanySubmittedOrder",
          name: "CompanySubmittedOrder",
          component: () => import("@/views/biadjo/CompanySubmittedOrder.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanySubmittedOrder", active: true }
            ],
            pageTitle: "CompanySubmittedOrder",
            rule: "Anonymous"
          }
        },
        {
          path: "/FollowBiadjoOnMap/:Id",
          name: "FollowBiadjoOnMap",
          component: () => import("@/views/biadjo/FollowBiadjoOnMap.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "FollowBiadjoOnMap", active: true }
            ],
            pageTitle: "FollowBiadjoOnMap",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyBiadjosHistory",
          name: "CompanyBiadjosHistory",
          component: () => import("@/views/biadjo/CompanyBiadjosHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyBiadjosHistory", active: true }
            ],
            pageTitle: "CompanyBiadjosHistory",
            rule: "Anonymous"
          }
        },
        {
          path: "/CompanyWallet",
          name: "CompanyWallet",
          component: () => import("@/views/company/CompanyWallet.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyWallet", active: true }
            ],
            pageTitle: "CompanyWallet",
            rule: "Owner"
          }
        },
        {
          path: "/CompanyTransactionHistory/:Id",
          name: "CompanyTransactionHistory",
          component: () =>
            import("@/views/company/CompanyTransactionHistory.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyTransactionHistory", active: true }
            ],
            pageTitle: "CompanyTransactionHistory",
            rule: "Owner"
          }
        },
        {
          path: "/EditCompanyBankAccountInformation/:Id",
          name: "EditCompanyBankAccountInformation",
          component: () =>
            import("@/views/company/EditCompanyBankAccountInformation.vue"),
          meta: {
            breadcrumb: [
              { title: "Home", url: "/" },
              { title: "CompanyWallet", url: "/CompanyWallet" },
              { title: "EditCompanyBankAccountInformation", active: true }
            ],
            pageTitle: "EditCompanyBankAccountInformation",
            rule: "Owner"
          }
        }
      ]
    },

    // =============================================================================
    // FULL PAGE LAYOUTS
    // =============================================================================
    {
      path: "",
      component: () => import("@/layouts/full-page/FullPage.vue"),
      children: [
        // =============================================================================
        // PAGES
        // =============================================================================

        {
          path: "/user/ResetPasswordByAdmin",
          name: "ResetPasswordByAdmin",
          component: () => import("@/views/user/ResetPasswordByAdmin.vue"),
          meta: {
            rule: "Owner"
          }
        },
        {
          path: "/user/ResetPasswordByUser",
          name: "ResetPasswordByUser",
          component: () => import("@/views/user/ResetPasswordByUser.vue"),
          meta: {
            rule: "Anonymous"
          }
        },

        {
          path: "/user/IdleSessionLogout",
          name: "SessionExpired",
          component: () => import("@/views/user/IdleSessionLogout.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "IdleSessionLogout"
          }
        },
        {
          path: "/user/login/login",
          name: "userLogin",
          component: () => import("@/views/user/login/Login.vue"),
          meta: {
            rule: "Anonymous",
            pageTitle: "Login"
          }
        },
        {
          path: "/user/register/register",
          name: "userRegister",
          component: () => import("@/views/user/register/Register.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/Error404",
          name: "Error404",
          component: () => import("@/views/pages/Error404.vue"),
          meta: {
            rule: "Anonymous"
          }
        },
        {
          path: "/pages/NotAuthorized",
          name: "NotAuthorized",
          component: () => import("@/views/pages/NotAuthorized.vue"),
          meta: {
            rule: "Anonymous"
          }
        },

        {
          path: "/user/forgetpassword/forgetpassword",
          name: "userForgetPassword",
          component: () =>
            import("@/views/user/forgetPassword/forgetPassword.vue"),
          meta: {
            rule: "Anonymous"
          }
        }
      ]
    },
    // Redirect to 404 page, if no match found
    {
      path: "*",
      redirect: "/pages/Error404"
    }
  ]
});

router.afterEach(() => {
  // Remove initial loading
  const appLoading = document.getElementById("loading-bg");
  if (appLoading) {
    appLoading.style.display = "none";
  }
});
router.beforeEach((to, from, next) => {
  const publicPages = [
    "/user/login/login",
    "/user/register/register",
    "/user/forgetPassword/forgetPassword"
  ];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("userInfo");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    store.commit("REMOVE_USER_STORE", null, { root: true });
    next("/user/login/login");
  } else {
    next();
  }
});

// });

export default router;
