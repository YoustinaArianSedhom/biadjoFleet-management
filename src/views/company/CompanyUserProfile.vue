<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('UserNotFound')"
      :active.sync="ID_Not_Found"
    >
      <span>user record with Email : {{ $route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'CompanyUsers' }"
          class="text-inherit underline"
          >All Users</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div v-if="FormData.ProfilePicture" class="vx-col" id="avatar-col">
            <div class="img-container mb-4">
              <img :src="FormData.ProfilePicture" class="rounded w-full" />
            </div>
          </div>
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    >{{ FormData.PhoneNumber }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>
                <td>{{ $t(FormData.AccountStatus) }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("UserID") }}</td>
                <td>{{ FormData.Id }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    FormData.RegistrationDate | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ FormData.country }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("CountryCode") }}</td>
                <td>{{ FormData.countrycode }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  :to="{
                    name: 'EditCompanyUser',
                    params: {
                      Id: FormData.Email
                    }
                  }"
                  class="mr-4"
                  icon="icon-edit"
                  v-if="userInfo.AccountType != 'FAT2'"
                  >{{ $t("Edit") }}</vs-button
                >
              </div>

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
                  v-if="userInfo.AccountType != 'FAT2'"
                  @click="$refs.updateImgInput.click()"
                  class="mr-4"
                  >{{ $t("UpdateImage") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 ">
                <vs-button
                  icon-pack="feather"
                  icon="icon-lock"
                  v-if="userInfo.AccountType != 'FAT2'"
                  class="mr-4"
                  @click.prevent="confirmResetPasssword"
                  >{{ $t("ResetPassword") }}</vs-button
                >
              </div>

              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  class="mr-4"
                  icon-pack="feather"
                  @click="Back"
                  >{{ $t("Back") }}</vs-button
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
/* eslint-disable */

import moduleAuth from "@/store/auth/moduleAuth.js";
import moduleCompany from "@/store/company/moduleCompany";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";
var CryptoJS = require("crypto-js");

export default {
  data() {
    return {
      userinfo: {},
      ResetPasswordModel: {
        Email: "",
        CountryCode: ""
      },

      FormData: {},

      ID_Not_Found: false,
      OldAccountStatus: ""
    };
  },
  components: {},
  methods: {
    confirmResetPasssword() {
      this.$vs.dialog({
        type: "confirm",
        color: "danger",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToResetPasssword"),
        accept: this.ResetByAdmin,
        acceptText: this.$t("Reset"),
        cancelText: this.$t("Cancel"),
        cancel: this.CancelAlert
      });
    },

    ResetByAdmin() {
      this.$vs.loading();
      this.ResetPasswordModel.Email = this.FormData.Email;
      this.ResetPasswordModel.CountryCode = this.FormData.countrycode;
      this.$store
        .dispatch("auth/resetPasswordByAdmin", this.ResetPasswordModel)
        .then(response => {
          if (response.data.result == "Success") {
            this.$vs.loading.close();
            window.showCheckEmail();
            this.Model = {};
          } else {
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },

    Back() {
      this.$router.go(-1);
    },
    async updateCurrImg(input) {
      this.$vs.loading();
      if (input.target.files && input.target.files[0]) {
        const file = event.target.files[0];
        var newFile = await FileEncryptionHandler.encrypt(file);

        this.$store
          .dispatch("User/UploadProfilePic", {
            params: {
              Id: this.FormData.Id,
              file: newFile
            }
          })
          .then(response => {
            this.FormData.ProfilePicture = FileEncryptionHandler.decrypt(
              response.data
            );
            this.$vs.loading.close();
          });
      }
    },
    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var user = {};
      user.Email = this.$route.params.Id;
      this.$store
        .dispatch("User/fetchUserDetailsList", user)
        .then(response => {
          if (response.data != null) {
            window.validCompanyUser(response.data.CompaneyId);
            this.OldAccountStatus = response.data.AccountStatus;
            this.FormData = response.data;
            this.$vs.loading.close();
            if (response.data.ProfilePicture) {
              this.FormData.ProfilePicture = FileEncryptionHandler.decrypt(
                JSON.parse(response.data.ProfilePicture)
              );
            }
          } else {
            this.$vs.loading.close();
            this.ID_Not_Found = true;
            this.FormData = null;
          }
        })
        .catch(err => {
          if (err.status === 404) {
            this.$vs.loading.close();
            window.showError();
            return;
          }
          console.error(err);
        });
    }
  },
  created() {
    if (!moduleAuth.isRegistered) {
      this.$store.registerModule("User", moduleAuth);
      moduleAuth.isRegistered = true;
    }
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
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
