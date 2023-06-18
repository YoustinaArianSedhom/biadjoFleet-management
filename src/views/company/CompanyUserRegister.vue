<template>
  <div
    class="h-screen flex w-full bg-img vx-row no-gutter justify-center mb-12"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <br />
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/Biadjo Vectors_Fleet Signup.png"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="px-8 pt-8 register-tabs-container">
                <div class="vx-row">
                  <div class="vx-card__title mb-4">
                    <h4 class="mb-4">{{ $t("CreateAccount") }}</h4>
                    <p>{{ $t("CreateAccountTitle") }}</p>
                  </div>
                  <!-- FirstName -->
                  <div class="vx-col md:w-1/2 w-full">
                    <div class="vx-row mt-4">
                      <label class="text-sm opacity-75">{{
                        $t("FirstName")
                      }}</label>
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
                    <div class="vx-row mt-4">
                      <label class="text-sm opacity-75">{{
                        $t("LastName")
                      }}</label>
                      <vs-input
                        v-validate="'required|alpha_dash|min:3'"
                        name="LastName"
                        v-model="Model.LastName"
                        class=" w-full"
                      />
                      <span class="text-danger text-sm">{{
                        errors.first("LastName")
                      }}</span>
                    </div>
                  </div>
                </div>
                <!-- Email -->
                <div class="vx-row mt-4">
                  <label class="text-sm opacity-75">{{ $t("Email") }}</label>
                  <vs-input
                    v-validate="'required|email'"
                    name="Email"
                    type="email"
                    v-model="Model.Email"
                    class=" w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Email")
                  }}</span>
                  <feather-icon
                    v-if="ExistEmail === 'true'"
                    icon="XCircleIcon"
                    svgClasses="text-danger h-4 w-4"
                    class="mb-2 text-md"
                  />
                  <span
                    v-if="ExistEmail === 'true'"
                    class="text-danger mb-2 text-md"
                    >{{ $t("EmailExistError") }}
                  </span>
                </div>
                <!-- PhoneNumber -->
                <div class="vx-row mt-4">
                  <label class="text-sm opacity-75">{{
                    $t("PhoneNumber")
                  }}</label>
                  <vue-tel-input
                    @change="onChange($event)"
                    @onInput="onInput"
                    v-bind="bindProps"
                    :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    name="PhoneNo"
                    class=" w-full "
                    v-model="Model.PhoneNo"
                  >
                  </vue-tel-input>
                  <span class="text-danger text-sm">{{
                    errors.first("PhoneNo")
                  }}</span>
                  <span v-if="!isValid" class="text-danger text-sm">{{
                    $t("PhoneNumberNotValid")
                  }}</span>
                </div>
                <!-- AccountType -->
                <div class="vx-row mt-4">
                  <label class="text-sm opacity-75">{{
                    $t("AccountType")
                  }}</label>
                  <v-select
                    v-validate="'required'"
                    class="w-full"
                    name="AccountType"
                    v-model="Model.AccountType"
                    :reduce="Code => Code.Code"
                    :options="this.$options.accountTypeJSON"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    style="padding-bottom: 0 !important"
                    :get-option-label="option => $t(option.Code)"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('AccountType')"
                  >
                    {{ errors.first("AccountType") }}</span
                  >
                </div>
                <!-- Create -->
                <vs-button
                  slot="finish"
                  class="px-4 w-full mb-4 md:w-auto float-right mt-5"
                  @click="registerCompanyUserJWT"
                  :disabled="!validateForm"
                  >{{ $t("Create") }}</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleCompany from "@/store/company/moduleCompany.js";
import accountType_JSON from "./../driver/json/accountType.json";

export default {
  accountTypeJSON: accountType_JSON,
  data() {
    return {
      EmailObj: {
        Email: ""
      },
      Model: {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNo: "",
        Country: "",
        CountryCode: "",
        CompanyId: "",
        AccountType: ""
      },
      isValid: true,
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
    validateForm() {
      if (this.ExistEmail === "false") {
        return (
          !this.errors.any() &&
          this.Model.FirstName !== "" &&
          this.Model.LastName !== "" &&
          this.Model.Email !== "" &&
          this.Model.PhoneNo !== "" &&
          this.Model.AccountType !== ""
        );
      }
      return false;
    },
    ExistEmail() {
      if (this.Model.Email != "") {
        this.CheckEmailExist();
        return this.$store.state.auth.isEmailExist;
      } else {
        return false;
      }
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    CheckEmailExist() {
      this.EmailObj.Email = this.Model.Email;
      this.$store.dispatch("auth/CheckEmailExist", this.EmailObj);
    },
    registerCompanyUserJWT() {
      if (!this.validateForm) {
        return;
      }
      this.$vs.loading();
      this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.Model.CompanyId = userInfo.CompaneyId;
      this.Model.Country = userInfo.country;
      this.Model.CountryCode = userInfo.countrycode;

      this.$store
        .dispatch("Company/registCompanyUser", this.Model)
        .then(Response => {
          if (Response.status == 200) {
            this.$vs.loading.close();
            window.showSuccessCreate();
            this.$router.push({ name: "CompanyUsers" });
          }
        })
        .catch(Error => {
          if (Error.status == 400) {
            if (Error.data.error == "Email Exist") {
              window.showAlreadyExist();
            }
          } else {
            window.showError();
          }
          this.$vs.loading.close();
        });
    }
  },
  created() {
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    window.userTypeNotAllowedToAccessCurrentPage(userInfo.AccountType);

    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    this.$store.state.auth.isEmailExist = "";
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 470px;

  .con-tab {
    padding-bottom: 23px;
  }
}
.LayoutCss {
  height: 40px;
  margin-bottom: 20px;
}
.LayoutCssPadding {
  padding-bottom: 20px;
}
</style>
