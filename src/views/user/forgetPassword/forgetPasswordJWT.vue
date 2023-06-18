<template>
  <div>
    <div class="vx-row">
      <!-- Country -->
      <div class="vx-col w-full mt-6">
        <label class="text-sm opacity-75">{{ $t("Country") }}</label>
        <v-select
          @input="CheckCountry"
          style="padding-bottom: 0 !important"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          :options="this.$options.countryJson"
          label="name"
          v-model="ForgetPasswordModel.CountryCode"
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
      <div class="vx-col w-full mt-6">
        <label class="text-sm opacity-75">{{ $t("Email") }}</label>
        <vs-input
          v-validate="'required|email'"
          name="Email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          v-model="ForgetPasswordModel.Email"
          class="w-full "
        />
        <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
      </div>
    </div>
    <div>
      <!-- ResetPassword -->
      <vs-button
        :disabled="!validateForm"
        @click="ForgetPasswordJWT"
        class="px-4 w-full md:w-auto mt-5 flex float-right"
        >{{ $t("ResetPassword") }}</vs-button
      >
    </div>
  </div>
</template>

<script>
import axios from "@/axios.js";
import Servers from "@/http/axios/Servers.json";
import country_JSON from "@/views/user/json/country.json";

export default {
  countryJson: country_JSON,
  data() {
    return {
      ForgetPasswordModel: {
        Email: "",
        CountryCode: ""
      },
      CountryErrorMessage: "",
      IsEmpty: false
    };
  },
  computed: {
    validateForm() {
      return !this.errors.any() && this.ForgetPasswordModel.Email != "";
    }
  },

  methods: {
    CheckCountry() {
      if (
        this.ForgetPasswordModel.CountryCode == "" ||
        this.ForgetPasswordModel.CountryCode == null
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
    ForgetPasswordJWT() {
      if (!this.checkLogin()) {
        return;
      }
      if (!this.CheckCountry()) {
        return;
      }
      axios.defaults.baseURL = Servers[this.ForgetPasswordModel.CountryCode];
      localStorage.setItem("URL", axios.defaults.baseURL);
      if (axios.defaults.baseURL) {
        this.$vs.loading();
        this.$store
          .dispatch("auth/ForgotPasswordJWT", this.ForgetPasswordModel)
          .then(() => {
            this.$vs.loading.close();
            this.$vs.notify({
              title: this.$t("Success"),
              text: this.$t("EmailsentSuccessfully"),
              iconPack: "feather",
              icon: "icon-alert-circle",
              color: "#27ABBE"
            });
            this.$router.push(
              this.$router.currentRoute.query.to || "/user/user/login"
            );
          })
          .catch(Error => {
            if (Error.status == 400) {
              if (Error.data.error == "Email Address not Foud") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("EmailError"),
                  iconPack: "feather",
                  icon: "icon-alert-circle",
                  color: "danger"
                });
              }
              if (Error.data.error == "Wrong Contry") {
                this.$vs.notify({
                  title: this.$t("Error"),
                  text: this.$t("CountryError"),
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
  }
};
</script>
