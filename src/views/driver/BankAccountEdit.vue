<!-- =========================================================================================
  File Name: driverView.vue
  Description: driver View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/driver/pixinvent
========================================================================================== -->

<template>
  <div id="page-driver-view">
    <vs-alert
      color="danger"
      title="driver Not Found"
      :active.sync="ID_Not_Found"
    >
      <span>bank info record with id: {{ $route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'DriverProfile' }"
          class="text-inherit underline"
          >driver</router-link
        >
      </span>
    </vs-alert>

    <div id="driver-data" v-if="accountBank_data != undefined">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }} :</td>

                <td style="width: 250px;">
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.FullName"
                    v-validate="'required'"
                    name="FullName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('FullName')"
                    >{{ errors.first("FullName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankName") }} :</td>

                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BankName"
                    v-validate="'required'"
                    name="BankName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BankName')"
                    >{{ errors.first("BankName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BranchName") }} :</td>
                <!-- <td>{{ accountBank_data.BranchName}}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BranchName"
                    v-validate="'required'"
                    name="BranchName"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BranchName')"
                    >{{ errors.first("BranchName") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("AccountNumber") }} :</td>
                <!-- <td>{{ accountBank_data.AccountNumber  }}</td> -->
                <td>
                  <vs-input
                    @keypress="isNumber($event)"
                    class="w-full mt-4"
                    v-model="accountBank_data.AccountNumber"
                    v-validate="'required'"
                    name="AccountNumber"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('AccountNumber')"
                    >{{ errors.first("AccountNumber") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }} :</td>
                <!-- <td>{{ accountBank_data.SWIFT }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.SWIFT"
                    v-validate="'required'"
                    name="SWIFT"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('SWIFT')"
                    >{{ errors.first("SWIFT") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }} :</td>
                <!-- <td>{{ accountBank_data.BankAddress  }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.ZipCode"
                    v-validate="'required'"
                    name="ZipCode"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('ZipCode')"
                    >{{ errors.first("ZipCode") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }} :</td>
                <!-- <td>{{ accountBank_data.BankAddress  }}</td> -->
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.BankAddress"
                    v-validate="'required'"
                    name="BankAddress"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('BankAddress')"
                    >{{ errors.first("BankAddress") }}</span
                  >
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("State") }} :</td>

                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required|min:3'"
                    name="State"
                    tabindex="3"
                    v-model="accountBank_data.State"
                    @input="GetCityList(accountBank_data.State)"
                    :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                    :options="State"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('State')"
                    >{{ errors.first("State") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }} :</td>

                <td>
                  <v-select
                    :get-option-label="option => $t(option[CityWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required|min:3'"
                    name="City"
                    v-model="accountBank_data.City"
                    :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                    :options="City"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('City')"
                    >{{ errors.first("City") }}</span
                  >
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }} :</td>

                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.Country"
                    v-validate="'required'"
                    name="Country"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Country')"
                    >{{ errors.first("Country") }}</span
                  >
                </td>
              </tr>
            </table>
          </div>
        </div>

        <div class="flex flex-wrap m-4">
          <div class="mr-4 ">
            <vs-button
              class="ml-auto mt-2"
              @click="confirmSave"
              :disabled="!validateForm"
            >
              {{ $t("SaveChanges") }}
            </vs-button>
          </div>
          <div class="mr-4">
            <vs-button
              class="ml-auto mt-2"
              type="border"
              color="warning"
              icon-pack="feather"
              @click="Back"
              >{{ $t("Back") }}</vs-button
            >
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import VehiclOptions1_JSON from "./json/vehiclesOptions1.json";
import VehiclOptions2_JSON from "./json/vehiclesOptions2.json";
import moduleGeneral from "@/store/General/moduleGeneral.js";

import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  VehiclOptionse1Json: VehiclOptions1_JSON,
  VehiclOptionse2Json: VehiclOptions2_JSON,

  Option: [],
  data() {
    return {
      format: "dd/MM/yyyy",
      ar: ar,
      en: en,
      driver_data: {},
      accountBank_data: {},
      ID_Not_Found: false
    };
  },
  components: {},
  computed: {
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    State() {
      return this.$store.state.General.State;
    },
    City() {
      return this.$store.state.General.City;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.accountBank_data.FullName !== "" &&
        this.accountBank_data.BankName !== "" &&
        this.accountBank_data.BranchName !== "" &&
        this.accountBank_data.AccountNumber !== "" &&
        this.accountBank_data.SWIFT !== "" &&
        this.accountBank_data.BankAddress !== "" &&
        this.accountBank_data.City !== "" &&
        this.accountBank_data.State !== "" &&
        this.accountBank_data.ZipCode !== "" &&
        this.accountBank_data.Country !== ""
      );
    },
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    }
  },

  methods: {
    GetCityList(State) {
      let model = {};
      model.StateName = State;
      this.$store.dispatch("General/GetCityList", model);
    },

    isNumber: function(evt) {
      evt = evt || window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    changeVehicleType() {
      if (
        this.driver_data.VehicleType == "TT4" ||
        this.driver_data.VehicleType == "TT5" ||
        this.driver_data.VehicleType == "TT3"
      ) {
        this.Option = this.VehiclOptionse1Json;
      } else if (this.driver_data.VehicleType == "TT8") {
        this.Option = this.VehiclOptionse2Json;
      } else {
        this.Option = [];
      }
    },
    Back() {
      this.$router.go(-1);
    },
    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      // this.accountBank_data.DriverID = this.$route.params.data.Id;
      this.$store
        .dispatch("DriverList/updateBankAccountInfoData", this.accountBank_data)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
        })
        .catch(err => {
          window.showError();
          this.$vs.loading.close();
          console.error(err);
        });
      this.$vs.loading.close();
    },

    confirmSave() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToUpdateBankInfo"),
        cancelText: this.$t("Cancel"),
        accept: this.save_changes,
        acceptText: this.$t("Update")
      });
    },
    fetchData() {
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/GetDriverById", {
          DriverId: this.$route.params.Id
        })
        .then(response => {
          if (response.status == 200) {
            window.validCompanyUser(response.data.CompanyId);
          }
          if (response.data.State) {
            this.GetCityList(response.data.State);
          }
        })
        .catch(() => {
          return;
        });
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      window.userTypeNotAllowedToAccessCurrentPage(userInfo.AccountType);
      var driver = {};
      driver.Id = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/bankAccountInfoData", driver.Id)
        .then(res => {
          this.accountBank_data = res.data[0];
          this.$vs.loading.close();
        })
        .catch(err => {
          // window.showError();
          this.$vs.loading.close();
          this.ID_Not_Found = true;
          console.error(err);
        });
    }
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    let item = {};
    item.CountryCode = "EG";
    this.$store.dispatch("General/GetStateList", item);

    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-driver-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>
