<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="user_not_found"
    >
      <span>user record with id: {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ClientProfile' }"
          class="text-inherit underline"
          >All Clients</router-link
        >
      </span>
    </vs-alert>
    <div id="user-data" v-if="user_data != undefined">
      <vx-card v-if="!EditEmailDiv" class="mb-base" id="account-info">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Avatar Col -->
          <div class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="user_data.ProfilePicture" class="rounded w-full" />
            </div>
          </div>
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <!-- <vx-card> -->
            <table>
              <!-- FullName -->
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ user_data.firstName }} {{ user_data.lastName }}</td>
              </tr>
            </table>

            <table>
              <!-- PhoneNumber -->
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    >{{ user_data.PhoneNumber }}
                  </span>
                </td>
              </tr>
              <!-- UserID -->
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ user_data.Id }}</td>
              </tr>
              <!-- Email -->
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ user_data.Email }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- Country -->
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ user_data.country }}</td>
              </tr>
              <!-- CountryCode -->
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ user_data.countrycode }}</td>
              </tr>
              <!-- AccountType -->
              <tr>
                <td class="font-semibold">{{ $t("AccountType") }}</td>
                <td>{{ $t(user_data.AccountType) }}</td>
              </tr>
              <!-- Status -->
              <tr>
                <td class="font-semibold">{{ $t("Status") }}</td>
                <td>{{ $t(user_data.AccountStatus) }}</td>
              </tr>
            </table>
          </div>
          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <!-- UpdateImage -->
              <div class="mb-2 mt-2 ">
                <input
                  type="file"
                  class="hidden"
                  ref="updateImgInput"
                  @change="updateCurrImg"
                  accept="image/*"
                />
                <vs-button
                  icon-pack="feather"
                  icon="icon-user"
                  @click="$refs.updateImgInput.click()"
                  class="mr-4"
                  >{{ $t("UpdateImage") }}</vs-button
                >
              </div>
              <!-- ResetPassword -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  icon="icon-lock"
                  class="mr-4 p-3"
                  @click="EditEmailDiv = true"
                  >{{ $t("Edit") }}</vs-button
                >
              </div>
              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  icon="icon-lock"
                  class="mr-4 p-3"
                  :to="{
                    name: 'ResetPasswordByUser',
                    params: { Id: user_data.Id }
                  }"
                  >{{ $t("ResetPassword") }}</vs-button
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
      <vx-card v-if="EditEmailDiv">
        <div class="vx-row mt-4">
          <div class="vx-col md:w-1/2 w-full">
            <label class="text-sm opacity-75">{{ $t("Email") }}</label>
            <vs-input
              class="w-full"
              v-model="user_data.Email"
              v-validate="'required|email'"
              @input="CheckEmailExist"
              name="Email"
              type="email"
            />
            <span class="text-danger text-sm">{{ errors.first("Email") }}</span>
            <span v-if="isEmailExist" class="text-danger text-sm">{{
              $t("EmailExistError")
            }}</span>
          </div>
          <div class="vx-col md:w-1/2 w-full">
            <label class="text-sm opacity-75">{{ $t("PhoneNumber") }}</label>
            <vue-tel-input
              :dir="$vs.rtl ? 'ltr' : 'ltr'"
              @change="onChange($event)"
              @onInput="onInput"
              v-bind="bindProps"
              name="PhoneNo"
              class="w-full"
              v-model="user_data.PhoneNumber"
            >
            </vue-tel-input>
            <span class="text-danger text-sm">{{
              errors.first("PhoneNo")
            }}</span>
            <span v-if="!isValid" class="text-danger text-sm">{{
              $t("PhoneNumberNotValid")
            }}</span>
          </div>
        </div>
        <div class="flex mb-2 mt-2 justify-center item-center ">
          <vs-button
            icon-pack="feather"
            icon="icon-lock"
            class="mr-4"
            :disabled="!validateForm"
            @click="EditUserDetails"
            >{{ $t("SaveChanges") }}</vs-button
          >
          <vs-button
            type="border"
            color="warning"
            icon-pack="feather"
            @click="EditEmailDiv = false"
            class="mr-4 p-3"
          >
            {{ $t("Back") }}</vs-button
          >
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleAuth from "@/store/auth/moduleAuth.js";
import AccountStatus_JSON from "./../driver/json/accountStatus";
import AccountType_JSON from "./../driver/json/accountType";
/* eslint-disable */
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";
var CryptoJS = require("crypto-js");

export default {
  AccountStatusJson: AccountStatus_JSON,
  AccountTypeJSON: AccountType_JSON,

  data() {
    return {
      user_data: {},
      EditEmailDiv: false,
      imgUrl: null,
      user_not_found: false,
      isEmailExist: false,
      OldEmail: "",
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
      return (
        !this.errors.any() &&
        this.user_data.PhoneNumber !== "" &&
        this.isValid == true &&
        this.user_data.Email !== "" &&
        this.isEmailExist == false
      );
    }
  },
  methods: {
    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    CheckEmailExist() {
      var EmailObj = {};
      EmailObj.Email = this.user_data.Email;
      this.$store.dispatch("auth/CheckEmailExist", EmailObj).then(response => {
        if (response.status == 200 && response.data.error == "") {
          if (response.data.result == "true") {
            this.isEmailExist = false;
          }
          if (response.data.result == "true") {
            if (this.OldEmail !== EmailObj.Email) {
              this.isEmailExist = true;
            } else {
              this.isEmailExist = false;
            }
          }
        }
      });
    },
    Back() {
      this.$router.go(-1);
    },
    EditUserDetails() {
      if (!this.validateForm) {
        return;
      }
      if (this.OldEmail != this.user_data.Email && this.ExistEmail === "true") {
        return;
      }
      this.$vs.loading();

      var Obj = {};
      Obj.UserId = this.user_data.Id;
      Obj.PhoneNo = this.user_data.PhoneNumber.replace(/\s/g, "");
      Obj.Email = this.user_data.Email;
      Obj.FirstName = this.user_data.firstName;
      Obj.LastName = this.user_data.lastName;
      Obj.AccountStatus = this.user_data.AccountStatus;
      Obj.AccountType = this.user_data.AccountType;

      this.$store
        .dispatch("User/editUserDetails", Obj)
        .then(() => {
          this.$vs.loading.close();
          window.showSuccess();
          this.EditEmailDiv = false;
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
    async updateCurrImg(input) {
      this.$vs.loading();
      if (input.target.files && input.target.files[0]) {
        const file = event.target.files[0];
        var newFile = await FileEncryptionHandler.encrypt(file);

        this.$store
          .dispatch("User/UploadProfilePic", {
            params: {
              Id: this.$route.params.Id,
              file: newFile
            }
          })
          .then(response => {
            this.user_data.ProfilePicture = FileEncryptionHandler.decrypt(
              response.data
            );
            this.$vs.loading.close();
            this.$store.dispatch("auth/refreshCurrentUser");
            this.$vs.loading.close();
          });
      }
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("User", moduleAuth);
      moduleAuth.isRegistered = true;
    }

    var JsonValue = {};
    let userInfo = JSON.parse(localStorage.getItem("userInfo"));
    JsonValue.Email = userInfo.Email;

    this.$store
      .dispatch("User/fetchUserDetailsList", JsonValue)
      .then(response => {
        this.user_data = response.data;
        this.OldEmail = this.user_data.Email;
        this.$vs.loading.close();
      })
      .catch(err => {
        if (err.response.status === 404) {
          this.user_not_found = true;
          this.$vs.loading.close();
          window.showError();
          return;
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
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
