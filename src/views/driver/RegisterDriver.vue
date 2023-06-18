<template>
  <div id="page-user-view">
    <form id="user-data">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-1"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("FirstName") }}</label>
              <vs-input
                tabindex="0"
                class="w-full"
                v-model="Model.FirstName"
                v-validate="'required'"
                name="FirstName"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('FirstName')"
                >{{ errors.first("FirstName") }}</span
              >
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
              <vue-tel-input
                class="w-full"
                v-model="Model.PhoneNo"
                v-validate="'required'"
                name="PhoneNumber"
                :dir="$vs.rtl ? 'ltr' : 'ltr'"
                v-bind="bindProps"
                @onInput="onInput"
              >
              </vue-tel-input>
              <span
                v-if="!isValid"
                class="text-danger text-sm"
                v-show="errors.has('PhoneNumber')"
                >{{ errors.first("PhoneNumber") }}</span
              >
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Password") }}</label>
              <vs-input
                tabindex="2"
                class="w-full"
                v-model="Model.Password"
                v-validate="'required'"
                name="Password"
                type="text"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Password')"
                >{{ errors.first("Password") }}</span
              >
            </div>
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("VehicleType") }}</label>
              <v-select
                style="padding:0px !important"
                v-validate="'required'"
                class=" w-full"
                :reduce="Code => Code.Code"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :options="this.$options.VehicleTypeJson"
                label="name"
                :searchable="true"
                v-model="Model.VehicleType"
                :get-option-label="option => $t(option.Code)"
              >
                <template slot="option" slot-scope="option">
                  <span class="vx-row">
                    <img
                      class="w-18 h-16"
                      :src="
                        require(`@/assets/images/ClientAssets/${option.CarImg}`)
                      "
                    />
                    <span class="align-buttom m-2">
                      {{ $t(option.Code) }}
                    </span>
                  </span>
                </template>
              </v-select>

              <!-- <v-select


                :reduce="Code => Code.Code"


                :get-option-label="option => $t(option.Code)"

                :ignoreAccent="true"
              ></v-select>
              <span
                class="text-danger text-sm"
                v-show="errors.has('VehicleType')"
                >{{ errors.first("VehicleType") }}</span
              > -->
            </div>

            <div
              class="vx-row m-4"
              v-if="
                this.Model.VehicleType == 'TT2' ||
                  this.Model.VehicleType == 'TT3' ||
                  this.Model.VehicleType == 'TT4'
              "
            >
              <label class="text-sm opacity-75">{{
                $t("VehicleOption")
              }}</label>
              <v-select
                :reduce="Code => Code.Code"
                class="w-full"
                :options="this.$options.VehiclOptionse1Json"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :get-option-label="option => $t(option.Code)"
                v-model="Model.VehicleOption"
              ></v-select>
              <span
                class="text-danger text-sm"
                v-show="errors.has('VehicleOption')"
                >{{ errors.first("VehicleOption") }}</span
              >
            </div>
            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>

              <vs-input
                class="w-full"
                tabindex="7"
                v-model="Model.ZibCode"
                v-validate="'required'"
                name="ZibCode"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('ZibCode')"
                >{{ errors.first("ZibCode") }}</span
              >
            </div> -->
          </div>

          <div
            class="vx-col sm:w-full md:w-1/2 lg:w-1/2 xl:w-1/2 sm:m-0"
            id="account-info-col-2"
          >
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("LastName") }}</label>
              <vs-input
                tabindex="3"
                class="w-full"
                v-model="Model.LastName"
                v-validate="'required'"
                name="LastName"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('LastName')"
                >{{ errors.first("LastName") }}</span
              >
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("State") }}</label>
              <v-select
                :get-option-label="option => $t(option[StateWithLocale])"
                class="mt-1 w-full p-0"
                v-validate="'required|min:3'"
                name="State"
                tabindex="3"
                v-model="Model.State"
                @input="GetCityList(Model.State)"
                :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                :options="State"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />
              <span class="text-danger text-sm" v-show="errors.has('State')">{{
                errors.first("State")
              }}</span>
            </div>

            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("City") }}</label>
              <v-select
                :get-option-label="option => $t(option[CityWithLocale])"
                class="mt-1 w-full p-0"
                v-validate="'required|min:3'"
                name="City"
                v-model="Model.City"
                :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                :options="City"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
              />

              <span class="text-danger text-sm" v-show="errors.has('City')">{{
                errors.first("City")
              }}</span>
            </div>

            <!-- <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Address") }}</label>
              <vs-input
                class="w-full"
                tabindex="6"
                v-model="Model.Address"
                v-validate="'required'"
                name="Address"
              />
              <span
                class="text-danger text-sm"
                v-show="errors.has('Address')"
                >{{ errors.first("Address") }}</span
              >
            </div> -->
            <div class="vx-row m-4">
              <label class="text-sm opacity-75">{{ $t("Country") }}</label>

              <v-select
                class="mt-1 w-full"
                @input="CheckCountry"
                style="padding-bottom: 0 !important"
                :dir="$vs.rtl ? 'rtl' : 'ltr'"
                :options="this.$options.CountryCodeJson"
                label="name"
                :searchable="true"
                v-model="Model.CountryCode"
                :reduce="CountryCode => CountryCode.isoCode"
              >
                <template slot="option" slot-scope="option">
                  <span class="vx-row">
                    <img
                      class="w-8 h-8"
                      :src="require(`@/assets/flags/${option.asset}`)"
                    />
                    <span class="align-buttom m-2"> {{ option.name }} </span>
                  </span>
                </template>
              </v-select>

              <!-- <span v-if="IsEmpty" class="text-danger text-sm">{{
                this.CountryErrorMessage
              }}</span> -->
            </div>
          </div>
          <div class="vx-row w-full m-2" id="account-manage-buttons">
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                @click="registerCompany"
                :disabled="!validateForm"
              >
                {{ $t("Create") }}
              </vs-button>
            </div>
            <div class="mb-2 mt-2 ">
              <vs-button
                class="mr-4"
                type="border"
                color="warning"
                icon-pack="feather"
                @click="Back"
                >{{ $t("Back") }}</vs-button
              >
            </div>
          </div>
        </div>
      </vx-card>
    </form>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";

import VehicleType_JSON from "./../driver/json/vehicles.json";
import vSelect from "vue-select";
import CountryCode_JSON from "@/views/user/json/country.json";

// import CountryCode_JSON from "./../driver/json/Countries";
// import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import VacationMode_JSON from "./json/vacationMode.json";
import VehiclOptions_JSON from "./json/vehiclesOptions.json";
import VehiclOptions1_JSON from "./json/vehiclesOptions1.json";
import VehiclOptions2_JSON from "./json/vehiclesOptions2.json";
import moduleGeneral from "@/store/General/moduleGeneral.js";

/* eslint-disable */
export default {
  VehicleTypeJson: VehicleType_JSON,
  CountryCodeJson: CountryCode_JSON,
  VehiclOptionseJson: VehiclOptions_JSON,
  VehiclOptionse1Json: VehiclOptions1_JSON,
  VehiclOptionse2Json: VehiclOptions2_JSON,
  VacationModeJson: VacationMode_JSON,
  Option: [],
  components: {
    vSelect
  },
  data() {
    return {
      isValid: true,
      CountryErrorMessage: "",
      ApiModel: {},
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US", "CZ", "LY", "GB"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      },
      Model: {
        FirstName: "",
        LastName: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        VehicleType: "",
        VehicleOption: "",
        Password: "",
        Email: "",
        City: "",
        State: ""
        // AdminUserId: "",
        // ZibCode: ""
      }
    };
  },
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
    // Country() {
    //   return this.$store.state.CountryList.Country;
    // },
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LastName !== "" &&
        this.Model.Password != "" &&
        this.Model.State != "" &&
        this.Model.VehicleType != "" &&
        this.Model.VehicleType != null &&
        this.Model.CountryCode != "" &&
        this.Model.CountryCode != null &&
        this.Model.City != ""
      );
    },
    State() {
      return this.$store.state.General.State;
    },
    City() {
      return this.$store.state.General.City;
    }
  },
  methods: {
    GetCityList(State) {
      let model = {};
      model.StateName = State;
      this.$store.dispatch("General/GetCityList", model);
    },

    // changeVehicleType() {
    //   if (
    //     this.FormData.VehicleType == "TT4" ||
    //     this.FormData.VehicleType == "TT5" ||
    //     this.FormData.VehicleType == "TT3"
    //   ) {
    //     this.Option = this.VehiclOptionse1Json;
    //   } else if (this.FormData.VehicleType == "TT8") {
    //     this.Option = this.VehiclOptionse2Json;
    //   } else {
    //     this.Option = [];
    //   }
    // },
    CheckCountry() {
      if (
        this.FormData.CountryCode == "" ||
        this.FormData.CountryCode == null
      ) {
        this.CountryErrorMessage = "This country field is required";
        this.IsEmpty = true;
        return false;
      } else {
        this.IsEmpty = false;
      }
      return true;
    },
    Back() {
      this.$router.go(-1);
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    AddDriverToCompany() {
      debugger;
      this.$vs.loading();
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let Company = {};
      Company.CompaneyId = userInfo.CompaneyId;
      Company.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.$store
        .dispatch("DriverList/AddDriverToCompany", Company)
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
          }
        })
        .catch(err => {
          if (err.response.status == 400) {
            if (err.response.data == 0) {
              window.showAlreadyExist();
              this.$vs.loading.close();
            }
            if (err.response.data == 2) {
              window.showAlreadyExistInAnotherCompany();
              this.$vs.loading.close();
            } else {
              window.showError();
              this.$vs.loading.close();
            }
          } else {
            window.showError();
            this.$vs.loading.close();
          }
        });
    },
    registerCompany() {
      if (!this.validateForm) {
        window.showFillData();

        return;
      }
      debugger;
      if (this.Model.VehicleOption == null) {
        this.Model.VehicleOption == "";
      }
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      this.ApiModel = this.$options.CountryCodeJson.find(
        Country => Country.isoCode === this.Model.CountryCode
      );
      this.Model.Country = this.ApiModel.name;
      this.Model.CountryCode = this.ApiModel.isoCode;
      // this.Model.AdminUserId = JSON.parse(localStorage.getItem("userInfo")).Id;
      debugger;
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/RegisterDriver", this.Model)
        .then(response => {
          if (response.status == 200) {
            this.AddDriverToCompany();
            this.$vs.loading.close();
            window.showDriverAddeddSuccessfuly();
            this.$router.push("/ViewDrivers");
          }
        })
        .catch(error => {
          debugger;
          this.$vs.loading.close();
          this.$vs.notify({
            title: this.$t("Error"),
            text: error.response.data,
            iconPack: "feather",
            icon: "icon-alert-circle",
            color: "danger"
          });
        });
    }
  },
  mounted() {},
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
    // if (!moduleCountry.isRegistered) {
    //   this.$store.registerModule("CountryList", moduleCountry);
    //   moduleCountry.isRegistered = true;
    // }
    // this.$store.dispatch("CountryList/fetchAllCountriesList").then(() => {
    //   debugger;
    //   this.Country.forEach(element => {
    //     if (
    //       element.CountryCode ==
    //       JSON.parse(localStorage.getItem("userInfo")).countrycode
    //     ) {
    //       this.Model.CountryCode = JSON.parse(
    //         localStorage.getItem("userInfo")
    //       ).countrycode;
    //     }
    //   });
    // });
  }
};
</script>

<style lang="scss">
.regist-tabs-container {
  min-height: 500px;
}
</style>
