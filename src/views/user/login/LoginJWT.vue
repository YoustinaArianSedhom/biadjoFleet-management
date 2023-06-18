<template>
  <div>
    <div class="vx-row">
      <!-- User Country -->
      <div class="vx-col w-full mt-6">
        <label class="text-sm opacity-75">{{ $t("Country") }}</label>

        <v-select
          style="padding-bottom: 0 !important"
          :dir="$vs.rtl ? 'ltr' : 'rtl'"
          :options="this.$options.countryJson"
          label="name"
          :searchable="true"
          v-model="UserModel.CountryCode"
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

        <span v-if="IsEmpty" class="text-danger text-sm">{{
          this.CountryErrorMessage
        }}</span>
      </div>
      <!-- User Email -->
      <div class="vx-col w-full mt-4 mb-4">
        <label class="text-sm opacity-75">{{ $t("Email") }}</label>
        <vs-input
          v-validate="'required|email'"
          name="Email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          v-model="UserModel.Email"
          class="w-full "
          v-on:keyup.enter="loginJWT"
        />
        <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
      </div>
      <!-- User Password -->
      <div class="vx-col w-full">
        <label class="text-sm opacity-75">{{ $t("Password") }}</label>
        <vs-input
          v-validate="'required|min:8|max:100'"
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          v-model="UserModel.Password"
          v-on:keyup.enter="loginJWT"
          class="w-full "
        />
        <span class="text-danger text-sm">{{ errors.first("password") }}</span>
      </div>
    </div>
    <!-- RememberMe / ForgotPassword -->
    <div class="flex flex-wrap justify-between ">
      <vs-checkbox v-model="checkbox_remember_me" class="mb-3">{{
        $t("RememberMe")
      }}</vs-checkbox>
      <router-link to="/user/forgetPassword/forgetPassword">{{
        $t("ForgotPassword")
      }}</router-link>
    </div>
    <!-- Register / Login -->
    <div class="vx-row justify-center items-center pt-1">
      <div class="vx-col ">
        <vs-button
          :disabled="!validateForm"
          @click="loginJWT"
          class="px-4 w-full md:w-auto  pl-10 pr-10"
          >{{ $t("Login") }}</vs-button
        >
      </div>
      <!-- </div> -->
      <vs-divider />

      <div class="vx-col ">
        <vs-button
          type="border"
          @click="registerUser"
          class="px-4 w-full md:w-auto  pl-10 pr-10"
          >{{ $t("Register") }}</vs-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import country_JSON from "@/views/user/json/country.json";
import axios from "@/axios.js";
import Servers from "@/http/axios/Servers.json";

export default {
  countryJson: country_JSON,
  data() {
    return {
      UserModel: {
        CountryCode: "",
        Email: "",
        Password: ""
      },
      checkbox_remember_me: false,
      CountryErrorMessage: "",
      IsEmpty: false
    };
  },
  computed: {
    validateForm() {
      return (
        !this.errors.any() &&
        this.UserModel.Email != "" &&
        this.UserModel.Password != "" &&
        this.UserModel.CountryCode != "" &&
        this.UserModel.CountryCode != null
      );
    }
  },

  methods: {
    CheckCountry() {
      if (
        this.UserModel.CountryCode == "" ||
        this.UserModel.CountryCode == null
      ) {
        this.CountryErrorMessage = "This country field is required";
        this.IsEmpty = true;
        return false;
      } else {
        this.IsEmpty = false;
      }
      return true;
    },
    checkLogin() {
      // If user is already logged in notify
      if (this.$store.state.auth.isUserLoggedIn()) {
        this.$vs.notify({
          title: "Login Attempt",
          text: "You are already logged in!",
          iconPack: "feather",
          icon: "icon-alert-circle",
          color: "warning"
        });
        this.$router.push("/");
        return false;
      }
      return true;
    },
    loginJWT() {
      if (!this.checkLogin()) {
        return;
      }
      if (!this.CheckCountry()) {
        return;
      }
      if (!this.validateForm) {
        window.showFillData();
        return;
      }

      axios.defaults.baseURL = Servers[this.UserModel.CountryCode];
      localStorage.setItem("URL", axios.defaults.baseURL);

      if (axios.defaults.baseURL) {
        this.$vs.loading();
        this.$store
          .dispatch("auth/loginJWT", this.UserModel)
          .then(() => {
            this.$store
              .dispatch("auth/fetchUserDetails", this.UserModel.Email)
              .then(() => {
                this.$vs.loading.close();
                if (this.$store.state.AppActiveUser.AccountStatus === "AS1") {
                  this.$acl.change(this.$store.state.AppActiveUser.AccountType);
                  this.$router
                    .push(this.$router.currentRoute.query.to || "/")
                    .then(() => location.reload("/"));
                } else {
                  this.$vs.loading.close();
                  window.showNoRightAccessToLogin();
                }
              })
              .catch(() => {
                this.$vs.loading.close();
                window.showError();
              });
          })
          .catch(error => {
            if (error.response.status == 400) {
              if (error.response.data.Error == "Password") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("PasswordError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == "Email") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("EmailError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == "Country") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("CountryError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == "Account is Not Active") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("SorryYouAccountisNotActive"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (error.response.data.Error == undefined) {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("GeneralError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "warning"
                });
              }
            } else {
              this.$vs.notify({
                title: this.$t("Error"),
                text: this.$t("GeneralError"),
                iconPack: "feather",
                icon: "icon-alert-circle",
                color: "warning"
              });
            }
            this.$vs.loading.close();
          });
      } else {
        window.showNotSupportThisCountry();
      }
    },
    registerUser() {
      this.$router.push("/user/register/register").catch(() => {});
    }
  }
};
</script>
