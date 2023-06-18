<!-- =========================================================================================
File Name: RegisterJWT.vue
Description: Register Page for JWT
----------------------------------------------------------------------------------------
Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="clearfix">
    <form-wizard
      color="rgba(var(--vs-primary), 1)"
      :title="null"
      :subtitle="null"
    >
      <!-- tab 1 content -->
      <tab-content
        :title="$t('CompanyInfo')"
        class="mb-2"
        :before-change="validateStep1"
      >
        <form data-vv-scope="step-1">
          <!-- CompanyName -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("CompanyName") }}</label>
            <vs-input
              v-validate="'required|min:3'"
              name="CompanyName"
              v-model="Model.CompanyName"
              class="w-full"
            />
            <span class="text-danger">{{
              errors.first("step-1.CompanyName")
            }}</span>
          </div>
          <!-- TaxID -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("TaxID") }}</label>
            <vs-input
              name="TaxID"
              v-validate="'required|min:3'"
              v-model="Model.TaxID"
              class="w-full"
            />
            <span class="text-danger">{{ errors.first("step-1.TaxID") }}</span>
          </div>
          <!-- CommercialRegistrationID -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">
              {{ $t("CommercialRegistrationID") }}</label
            >
            <vs-input
              name="CommercialRegistrationID"
              v-validate="'required|min:3'"
              v-model="Model.CommercialRegistrationID"
              class="w-full"
            />
            <span class="text-danger">{{
              errors.first("step-1.CommercialRegistrationID")
            }}</span>
          </div>
          <!-- Address -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("Address") }}</label>
            <vs-input
              name="Address"
              v-validate="'required|min:3'"
              v-model="Model.Address"
              class="w-full"
            />
            <span class="text-danger">{{
              errors.first("step-1.Address")
            }}</span>
          </div>

          <!-- StateCity -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("StateCity") }}</label>
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
            <!-- <vs-input
              name="State"
              v-validate="'required|min:3'"
              v-model="Model.State"
              class=" w-full"
            />
            <span class="text-danger">{{ errors.first("step-1.State") }}</span> -->
          </div>
          <!-- City -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75"> {{ $t("City") }}</label>
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
            <!-- <vs-input
              name="City"
              v-validate="'required|min:3'"
              v-model="Model.City"
              class=" w-full"
            />
            <span class="text-danger">{{ errors.first("step-1.City") }}</span> -->
          </div>

          <!-- ZipCode -->
          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("ZipCode") }}</label>
            <vs-input name="ZipCode" v-model="Model.ZibCode" class=" w-full" />
          </div>
          <!-- Country -->

          <div class="vx-row mb-2">
            <label class="text-sm opacity-75">{{ $t("Country") }}</label>
            <v-select
              name="Country"
              v-validate="'required'"
              style="padding-bottom: 0 !important"
              :dir="$vs.rtl ? 'rtl' : 'ltr'"
              :options="this.$options.countryJson"
              @input="CheckEmailExist"
              label="name"
              class="w-full"
              v-model="CountryModel"
              :reduce="CountryCode => CountryCode"
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

            <span class="text-danger">{{
              errors.first("step-1.Country")
            }}</span>
          </div>
        </form>
      </tab-content>

      <!-- tab 2 content -->
      <tab-content :title="$t('UserInfo')" class="mb-2">
        <div class="vx-row mb-2">
          <!-- FirstName -->
          <div class="vx-col md:w-1/2 w-full">
            <div class="vx-row mb-2">
              <label class="text-sm opacity-75">{{ $t("FirstName") }}</label>
              <vs-input
                v-validate="'required|alpha_dash|min:3'"
                name="FirstName"
                v-model="Model.FirstName"
                class="w-full mr-2"
              />
              <span class="text-danger text-sm">{{
                errors.first("FirstName")
              }}</span>
            </div>
          </div>
          <!-- LastName -->
          <div class="vx-col md:w-1/2 w-full">
            <div class="vx-row mb-2">
              <label class="text-sm opacity-75">{{ $t("LastName") }}</label>
              <vs-input
                v-validate="'required|alpha_dash|min:3'"
                name="LastName"
                v-model="Model.LastName"
                class="w-full"
              />
              <span class="text-danger text-sm">{{
                errors.first("LastName")
              }}</span>
            </div>
          </div>
        </div>
        <!-- PhoneNumber -->
        <div class="vx-row mb-2">
          <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
          <vue-tel-input
            :dir="$vs.rtl ? 'ltr' : 'ltr'"
            v-validate="'required'"
            @change="onChange($event)"
            @onInput="onInput"
            v-bind="bindProps"
            name="PhoneNo"
            class="w-full"
            v-model="Model.PhoneNo"
          >
          </vue-tel-input>
          <span class="text-danger text-sm">{{ errors.first("PhoneNo") }}</span>
          <span v-if="!isValid" class="text-danger text-sm">{{
            $t("PhoneNumberNotValid")
          }}</span>
        </div>
        <!-- Email -->
        <div class="vx-row mb-2">
          <label class="text-sm opacity-75">{{ $t("Email") }}</label>
          <vs-input
            v-validate="'required|email'"
            name="Email"
            type="email"
            @click="CheckEmailExist"
            @input="CheckEmailExist"
            v-model="Model.Email"
            class="w-full"
          />
          <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
          <span v-if="ExistEmail" class="text-danger text-sm">{{
            $t("EmailExistError")
          }}</span>
        </div>
        <!-- Password -->
        <div class="vx-row mb-2">
          <label class="text-sm opacity-75">{{ $t("Password") }}</label>
          <vs-input
            ref="password"
            type="password"
            v-validate.continues="'min:8|max:100'"
            name="password"
            v-model="Model.Password"
            class="w-full"
          />
          <ul>
            <li
              class="text-danger text-sm"
              v-for="error in errors.collect('password')"
              :key="error"
            >
              {{ error }}
            </li>
          </ul>
        </div>
        <!-- ConfirmPassword -->
        <div class="vx-row mb-2">
          <label class="text-sm opacity-75">{{ $t("ConfirmPassword") }}</label>
          <vs-input
            type="password"
            v-validate="'required|min:8|max:100|confirmed:password'"
            data-vv-as="password"
            name="confirm_password"
            v-model="confirm_password"
            class="w-full"
          />
          <span class="text-danger text-sm">{{
            errors.first("confirm_password")
          }}</span>
        </div>
      </tab-content>
      <!-- Back / Next -->
      <vs-button slot="prev" class="px-4 w-full md:w-auto ">{{
        $t("Back")
      }}</vs-button>
      <vs-button slot="next" class="px-4 w-full md:w-auto">{{
        $t("Next")
      }}</vs-button>
      <!-- Create  -->
      <vs-button
        slot="finish"
        class="px-4 w-full md:w-auto float-right "
        @click="registerCompanyJWT"
        :disabled="!validateForm"
        >{{ $t("Create") }}</vs-button
      >
    </form-wizard>
  </div>
</template>

<script>
import { FormWizard, TabContent } from "vue-form-wizard";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import Servers from "@/http/axios/Servers.json";
import country_JSON from "@/views/user/json/country.json";
import moduleGeneral from "@/store/General/moduleGeneral.js";

import axios from "@/axios.js";
export default {
  countryJson: country_JSON,
  data() {
    return {
      EmailObj: {
        Email: ""
      },
      confirm_password: "",
      CountryModel: null,
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        Password: "",
        CompanyName: "",
        TaxID: "",
        CommercialRegistrationID: "",
        Address: "",
        City: "",
        State: "",
        ZibCode: ""
      },
      isValid: true,
      ExistEmail: false,
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
    validateForm() {
      return (
        !this.errors.any() &&
        this.Model.FirstName !== "" &&
        this.Model.LastName !== "" &&
        this.Model.Email !== "" &&
        this.Model.PhoneNo !== "" &&
        this.Model.TaxID !== "" &&
        this.Model.CommercialRegistrationID !== "" &&
        this.Model.Address !== "" &&
        this.Model.City !== "" &&
        this.Model.State !== "" &&
        this.Model.Password == this.confirm_password &&
        this.Model.Password !== "" &&
        this.Model.CompanyName !== "" &&
        this.ExistEmail == false
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

    validateStep1() {
      if (axios.defaults.baseURL) {
        return new Promise((resolve, reject) => {
          this.$validator.validateAll("step-1").then(result => {
            if (result) {
              resolve(true);
            } else {
              reject("correct all values");
            }
          });
        });
      } else {
        window.showNotSupportThisCountry();
      }
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    checkLogin() {
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });

        return false;
      }
      return true;
    },
    CheckEmailExist() {
      if (this.CountryModel.isoCode) {
        axios.defaults.baseURL = Servers[this.CountryModel.isoCode];
        if (axios.defaults.baseURL) {
          this.EmailObj.Email = this.Model.Email;
          this.$store
            .dispatch("auth/CheckEmailExist", this.EmailObj)
            .then(res => {
              if (res.status == 200) {
                if (res.data.result == "false") {
                  this.ExistEmail = false;
                }
                if (res.data.result == "true") {
                  this.ExistEmail = true;
                }
              }
            })
            .catch(() => {
              this.ExistEmail = true;
            });
        } else {
          this.ExistEmail = true;
          window.showNotSupportThisCountry();
        }
      }
    },
    registerCompanyJWT() {
      if (this.ExistEmail == true) {
        return;
      }
      this.Model.CountryCode = this.CountryModel.isoCode;
      this.Model.Country = this.CountryModel.name;

      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");

      if (!this.validateForm || !this.checkLogin()) {
        return;
      }

      axios.defaults.baseURL = Servers[this.CountryModel.isoCode];
      if (axios.defaults.baseURL) {
        this.$vs.loading();

        this.$store
          .dispatch("auth/registerCompanyJWT", this.Model)
          .then(response => {
            if (response.status == 200) {
              this.$vs.loading.close();
              window.showSuccessfulregistration();
              this.$router.push("/user/login/login");
            }
          })
          .catch(Error => {
            if (Error.response.status == 400) {
              if (Error.response.data.error == "Email Exist") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("EmailExistError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
            } else {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("GeneralError"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warn"
              });
            }
            this.$vs.loading.close();
          });
      } else {
        window.showNotSupportThisCountry();
      }
    }
  },

  components: {
    FormWizard,
    TabContent
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    let item = {};
    item.CountryCode = "EG";
    this.$store.dispatch("General/GetStateList", item);
  }
};
</script>
