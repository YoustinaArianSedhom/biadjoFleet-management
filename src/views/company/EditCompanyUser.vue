<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="ID_Not_Found"
    >
      <span>user record with id: {{ this.$route.params.Id }} not found. </span>
      <span>
        <span>Check</span>
        <router-link
          :to="{
            name: 'CompanyUserProfile',
            params: { Id: this.$route.params.Id }
          }"
          class="text-inherit underline"
          >user</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined">
      <vx-card class="mb-base" id="account-info">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- FirstName -->
              <tr>
                <td class="font-semibold">{{ $t("FirstName") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="FirstName"
                    v-model="UserModel.FirstName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("FirstName")
                  }}</span>
                </td>
              </tr>
              <!-- LastName -->
              <tr>
                <td class="font-semibold">{{ $t("LastName") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="LastName"
                    v-model="UserModel.LastName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("LastName")
                  }}</span>
                </td>
              </tr>
              <!-- Email -->
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|email'"
                    name="Email"
                    icon-no-border
                    v-model="UserModel.Email"
                    class="w-full "
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Email")
                  }}</span>
                  <span
                    v-if="
                      UserModel.Email != user_data.Email &&
                        ExistEmail === 'true'
                    "
                    class="text-danger text-sm"
                    >{{ $t("EmailExistError") }}</span
                  >
                </td>
              </tr>
              <!-- PhoneNumber -->
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <vue-tel-input
                  :dir="$vs.rtl ? 'ltr' : 'ltr'"
                  @change="onChange($event)"
                  @onInput="onInput"
                  v-bind="bindProps"
                  name="PhoneNo"
                  class="w-full"
                  v-model="UserModel.PhoneNo"
                >
                </vue-tel-input>
                <span class="text-danger text-sm">{{
                  errors.first("PhoneNo")
                }}</span>
                <span v-if="!isValid" class="text-danger text-sm">{{
                  $t("PhoneNumberNotValid")
                }}</span>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- AccountStatus -->
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td>
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.AccountStatusJson"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="UserModel.AccountStatus"
                  ></v-select>
                </td>
              </tr>
              <!-- AccountType -->
              <tr v-if="UserModel.AccountType != 'FAT0'">
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td style="width:245px">
                  <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.AccountTypeJSON"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="UserModel.AccountType"
                  ></v-select>
                </td>
              </tr>
              <tr v-else>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td style="width:245px">
                  {{ $t(UserModel.AccountType) }}
                  <!-- <v-select
                    :reduce="Code => Code.Code"
                    class="mt-1 w-full"
                    :options="this.$options.AccountTypeJSON"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                    :get-option-label="option => $t(option.Code)"
                    v-model="UserModel.AccountType"
                  ></v-select> -->
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <!-- SaveChanges -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  :disabled="userInfo.AccountType == 'FAT2' || !validateForm"
                  icon-pack="feather"
                  @click="EditCompanyUser"
                  class="mr-4 p-3"
                  icon="icon-edit"
                  >{{ $t("SaveChanges") }}</vs-button
                >
              </div>
              <!-- Back -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4 p-3"
                >
                  {{ $t("Back") }}</vs-button
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
import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./../user/json/accountStatus";
import AccountType_JSON from "./../user/json/accountType";

export default {
  AccountTypeJSON: AccountType_JSON,
  AccountStatusJson: AccountStatus_JSON,
  data() {
    return {
      ID_Not_Found: false,
      user_data: {},
      UserModel: {
        UserId: "",
        FirstName: "",
        LastName: "",
        PhoneNo: "",
        Email: "",
        AccountStatus: "",
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
      },
      userInfo: {}
    };
  },
  computed: {
    ExistEmail() {
      if (this.UserModel.Email != this.user_data.Email) {
        this.CheckEmailExist();
        return this.$store.state.User.isEmailExist;
      }
      return false;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.UserModel.FirstName !== "" &&
        this.UserModel.LastName !== "" &&
        this.UserModel.PhoneNo !== "" &&
        this.UserModel.Email !== "" &&
        this.UserModel.AccountStatus !== "" &&
        this.UserModel.AccountStatus !== null &&
        this.UserModel.AccountType !== "" &&
        this.UserModel.AccountType !== null &&
        !(
          this.UserModel.Email != this.user_data.Email &&
          this.ExistEmail === "true"
        )
      );
    }
  },
  methods: {
    CheckEmailExist() {
      var EmailObj = {};
      EmailObj.Email = this.UserModel.Email;
      this.$store.dispatch("User/CheckEmailExist", EmailObj);
    },
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    Back() {
      this.$router.go(-1);
    },
    EditCompanyUser() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      if (
        this.UserModel.Email != this.user_data.Email &&
        this.ExistEmail === "true"
      ) {
        return;
      }
      this.$vs.loading();
      this.UserModel.PhoneNo = this.UserModel.PhoneNo.replace(/\s/g, "");
      this.$store
        .dispatch("User/editUserDetails", this.UserModel)
        .then(() => {
          this.$vs.loading.close();
          window.showSuccess();
          this.Back();
        })
        .catch(Error => {
          if (Error.status == 400) {
            if (Error.data.error == "Email Exist") {
              window.showError();
            } else {
              window.showError();
            }
          } else {
            window.showError();
          }
          this.$vs.loading.close();
        });
    },
    fetchData() {
      this.$vs.loading();
      this.$store
        .dispatch("User/fetchUserDetailsList", { Email: this.$route.params.Id })
        .then(response => {
          if (response.status == 200) {
            window.validCompanyUser(response.data.CompaneyId);
          }
        })
        .catch(() => {
          return;
        });

      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      window.userTypeNotAllowedToAccessCurrentPage(this.userInfo.AccountType);

      var user = {};
      user.Email = this.$route.params.Id;

      this.$store
        .dispatch("User/fetchUserDetailsList", user)
        .then(res => {
          this.user_data = res.data;
          this.UserModel.UserId = this.user_data.Id;
          this.UserModel.FirstName = this.user_data.firstName;
          this.UserModel.LastName = this.user_data.lastName;
          this.UserModel.PhoneNo = this.user_data.PhoneNumber;
          this.UserModel.Email = this.user_data.Email;
          this.UserModel.AccountStatus = this.user_data.AccountStatus;
          this.UserModel.AccountType = this.user_data.AccountType;
          this.$vs.loading.close();
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.ID_Not_Found = true;
            return;
          }
          this.$vs.loading.close();
          this.ID_Not_Found = true;
        });
    }
  },
  created() {
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("User", moduleAuth);
      moduleAuth.isRegistered = true;
    }
    this.fetchData();

    this.$store.state.User.isEmailExist = "";
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-client-view {
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

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
