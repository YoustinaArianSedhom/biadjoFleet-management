<template>
  <div id="page-user-view">
    <vs-alert
      color="danger"
      v-bind:title="$t('DriverNotFound')"
      :active.sync="ID_Not_Found"
    >
      <span>record with ID : {{ this.$route.params.Id }} not found. </span>
      <span>
        <span>Check </span
        ><router-link
          :to="{ name: 'ViewDrivers' }"
          class="text-inherit underline"
          >All Drivers</router-link
        >
      </span>
    </vs-alert>

    <div id="user-data" v-if="FormData != null || FormData != undefined">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- firstName -->
              <tr>
                <td class="font-semibold">{{ $t("FullName") }}</td>
                <td>{{ FormData.firstName }} {{ FormData.lastName }}</td>
              </tr>
              <!-- PhoneNumber -->
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <td>
                  <span :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    >{{ FormData.PhoneNumber }}
                  </span>
                </td>
              </tr>
              <!-- Email -->
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>{{ FormData.Email }}</td>
              </tr>
              <!-- WalletCountryCode -->
              <tr>
                <td class="font-semibold">{{ $t("DriverBalance") }}</td>
                <td>
                  {{ FormData.DriverBalance | numFormat("###,##0.00") }}
                  {{ $t(FormData.WalletCountryCode + "_Currency") }}
                </td>
              </tr>
              <!-- CreditLimit -->
              <!-- <tr>
                <td class="font-semibold">{{ $t("CreditLimit") }}</td>
                <td>
                  {{ FormData.CreditLimit | numFormat("###,##0.00") }}
                  {{ $t(FormData.WalletCountryCode + "_Currency") }}
                </td>
              </tr> -->
              <!-- FreeTrips -->
              <!-- <tr>
                <td class="font-semibold">{{ $t("FreeTrips") }}</td>
                <td>{{ FormData.FreeTrips }}</td>
              </tr> -->
              <!-- CustomerId -->
              <!-- <tr>
                <td class="font-semibold">{{ $t("CustomerID") }}</td>
                <td>{{ FormData.CustomerId }}</td>
              </tr> -->
              <!-- AccountStatus -->
              <tr>
                <td class="font-semibold">{{ $t("AccountStatus") }}</td>

                <td>{{ $t(FormData.AccountStatus) }}</td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- driverNo -->
              <tr>
                <td class="font-semibold">{{ $t("DriverNo") }}</td>
                <td>{{ FormData.driverNo }}</td>
              </tr>
              <!-- CompletedTrips -->
              <tr>
                <td class="font-semibold">{{ $t("CompletedTrips") }}</td>
                <td>{{ FormData.CompletedTrips }}</td>
              </tr>
              <!-- Rating -->
              <tr>
                <td class="font-semibold">{{ $t("Rating") }}</td>
                <td style="display:flex !important;">
                  <star-rating
                    v-model="FormData.Rating"
                    v-bind:increment="0.01"
                    v-bind:max-rating="5"
                    inactive-color="gray"
                    active-color="orange"
                    v-bind:read-only="true"
                    v-bind:show-rating="false"
                    v-bind:round-start-rating="false"
                    v-bind:star-size="20"
                  >
                  </star-rating>
                  <span class="ml-2 mr-2">
                    ( {{ FormData.Rating | numFormat("0.00") }} )
                  </span>
                </td>
              </tr>
              <!-- RegistrationDate -->
              <tr>
                <td class="font-semibold">{{ $t("RegistrationDate") }}</td>
                <td>
                  {{
                    FormData.RegistrationDate | formatDate("yyyy/MM/dd HH:mm")
                  }}
                </td>
              </tr>

              <!-- <tr>
                <td class="font-semibold">{{ $t("BirthDate") }}</td>
                <td>
                  {{ FormData.BirthDate | formatDate("yyyy/MM/dd") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("DriverLicense") }}</td>
                <td>{{ FormData.DriverLicense }}</td>
              </tr>

              <tr>
                <td class="font-semibold">{{ $t("NationalID") }}</td>
                <td>{{ FormData.NationalID }}</td>
              </tr> -->
            </table>
          </div>
        </div>
        <div class="flex flex-wrap m-4">
          <!-- <div class="mb-2 mt-2 ">
            <vs-button
              class="mr-4"
              :to="{
                name: 'BankAccountEdit',
                params: {
                  Id: FormData.Id
                }
              }"
              >{{ $t("EditBankInformation") }}</vs-button
            >
          </div> -->
          <!-- UploadDocuments -->
          <div class="mb-2 mt-2 ">
            <vs-button
              color="warning"
              class="mr-4 p-4"
              :to="{
                name: 'UploadDocuments',
                params: {
                  Id: FormData.Id
                }
              }"
              v-if="!disableUploadDoc"
              icon-pack="feather"
              >{{ $t("UploadDocuments") }}</vs-button
            >
          </div>
          <!-- ScheduledBiadjos -->
          <div class="mb-2 mt-2 ">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              :to="{
                name: 'DriverScheduledBiadjos',
                params: { DriverId: FormData.Id }
              }"
              icon-pack="feather"
              >{{ $t("ScheduledBiadjos") }}</vs-button
            >
          </div>
          <!-- ViewSubmittedOrders -->
          <div class="mb-2 mt-2 ">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              :to="{
                name: 'driverSubmittedOrders',
                params: {
                  Id: FormData.Id
                }
              }"
              icon-pack="feather"
              >{{ $t("ViewSubmittedOrders") }}</vs-button
            >
          </div>
          <!-- TransactionsHistory -->
          <div class="mb-2 mt-2 ">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              :to="{
                name: 'TransactionsHistoryOfDriver',
                params: { Id: FormData.Id }
              }"
              icon-pack="feather"
              >{{ $t("TransactionsHistory") }}</vs-button
            >
          </div>
          <!-- BiadjosHistory -->
          <div class="mb-2 mt-2 ">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              :to="{
                name: 'DriverBiadjosHistory',
                params: { DriverId: FormData.Id }
              }"
              icon-pack="feather"
              >{{ $t("BiadjosHistory") }}</vs-button
            >
          </div>
          <!-- DriverUnpaidBiadjos -->
          <div class="mb-2 mt-2 ">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              :to="{
                name: 'DriverUnpaidBiadjos',
                params: { DriverId: FormData.Id }
              }"
              icon-pack="feather"
              >{{ $t("UnpaidBiadjos") }}</vs-button
            >
          </div>
          <!-- RemoveDriver -->
          <div class="mb-2 mt-2 " v-show="FormData.AccountType != 'FAT1'">
            <vs-button
              v-show="FormData.AccountStatus == 'AS1'"
              class="mr-4 p-3"
              @click="confirmRemove1('AS2')"
              icon-pack="feather"
              >{{ $t("Deactivate") }}</vs-button
            >
            <vs-button
              v-show="FormData.AccountStatus == 'AS2'"
              class="mr-4 p-3"
              @click="confirmRemove2('AS1')"
              icon-pack="feather"
              >{{ $t("Activate") }}</vs-button
            >
          </div>

          <div class="mb-2 mt-2 ">
            <vs-button
              :to="{
                name: 'FollowDriverOnMap',
                params: { DriverId: FormData.Id }
              }"
              class="mr-4 p-3"
              icon-pack="feather"
              >{{ $t("ViewDriverOnMap") }}</vs-button
            >
          </div>

          <div class="mb-2 mt-2 ">
            <vs-button
              type="border"
              color="warning"
              class="mr-4 p-3"
              icon-pack="feather"
              @click="Back"
              >{{ $t("Back") }}</vs-button
            >
          </div>
        </div>
      </vx-card>

      <vx-card v-bind:title="$t('VehicleInfo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("LicensePlate") }}</td>
                  <td>{{ FormData.LicensePlate }}</td>
                </tr>

                <tr>
                  <td class="font-semibold">{{ $t("VehicleType") }}</td>
                  <td>{{ $t(FormData.VehicleType) }}</td>
                </tr>

                <tr>
                  <td class="font-semibold">{{ $t("VehicleOption") }}</td>
                  <td>{{ $t(FormData.VehicleOption) }}</td>
                </tr>
              </table>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- VehicleMake -->
              <tr>
                <td class="font-semibold">{{ $t("VehicleMake") }}</td>
                <td>{{ $t(FormData.VehicleMake) }}</td>
              </tr>
              <!-- VehicleModel -->
              <tr>
                <td class="font-semibold">{{ $t("VehicleModel") }}</td>
                <td>{{ $t(FormData.VehicleModel) }}</td>
              </tr>
              <!-- VehicleColor -->
              <tr>
                <td class="font-semibold">{{ $t("VehicleColor") }}</td>
                <td>{{ $t(FormData.VehicleColor) }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>

      <!-- <vx-card v-bind:title="$t('BankAccountInfo')" class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <table>
                <tr>
                  <td class="font-semibold">{{ $t("FullName") }}</td>
                  <td>{{ accountBank_data.FullName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BankName") }}</td>
                  <td>{{ accountBank_data.BankName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("BranchName") }}</td>
                  <td>{{ accountBank_data.BranchName }}</td>
                </tr>
                <tr>
                  <td class="font-semibold">{{ $t("AccountNumber") }}</td>
                  <td>{{ accountBank_data.AccountNumber }}</td>
                </tr>
              </table>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }}</td>
                <td>{{ accountBank_data.SWIFT }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }}</td>
                <td>{{ accountBank_data.BankAddress }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>{{ accountBank_data.City }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>{{ accountBank_data.State }}</td>
              </tr>
              <tr>
                <td class="font-semibold">{{ $t("Country") }}</td>
                <td>{{ accountBank_data.Country }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card> -->
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import StarRating from "vue-star-rating";

export default {
  data() {
    return {
      AS: "",
      Biadjo: {},
      accountBank_data: {},
      FormData: null,
      ID_Not_Found: false,
      OldAccountStatus: "",

      disableUploadDoc: false
    };
  },
  components: {
    StarRating
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    CancelAlert() {
      this.FormData.AccountStatus = this.OldAccountStatus;
    },
    confirmRemove2(AS) {
      this.AS = AS;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmRemove"),
        text:
          this.$t("YouAreAboutToActivateThis") +
          " " +
          this.FormData.firstName +
          " " +
          this.FormData.lastName,
        cancelText: this.$t("Cancel"),
        accept: this.RemoveUser,
        acceptText: this.$t("Update")
      });
    },
    confirmRemove1(AS) {
      this.AS = AS;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmRemove"),
        text:
          this.$t("YouAreAboutToDeActivateThis") +
          " " +
          this.FormData.firstName +
          " " +
          this.FormData.lastName,
        cancelText: this.$t("Cancel"),
        accept: this.RemoveUser,
        acceptText: this.$t("Update")
      });
    },
    RemoveUser() {
      this.$vs.loading();
      let form = {};
      form.PhoneNo = this.FormData.PhoneNumber;
      form.AccountStatus = this.AS;
      this.$store
        .dispatch("DriverList/UpdateDriverStatus", form)
        .then(response => {
          if (response.data == 1) {
            this.$vs.loading.close();
            window.showSuccessRemoveUser();
            this.fetchData();
            // this.Back();
          }
        })
        .catch(err => {
          this.$vs.loading.close();
          console.error(err);
          window.showError();
        });
      this.$vs.loading.close();
    },

    ChangeRecord() {
      this.FormData.Id = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/UpdateDriverById", this.FormData)
        .then(res => {
          if (res.status === 200) {
            this.OldAccountStatus = this.FormData.AccountStatus;
            window.showSuccess();
          }
        })
        .catch(err => {
          window.showError();
        });
    },
    fetchData() {
      this.$vs.loading();
      var driver = {};
      driver.DriverId = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/GetDriverById", driver)
        .then(response => {
          if (response.status == 200) {
            window.validCompanyUser(response.data.CompanyId);
            this.FormData = response.data;
            if (response.data.AccountStatus != "AS5") {
              this.disableUploadDoc = true;
            }
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.FormData = null;
          }
        })
        .catch(err => {
          this.$vs.loading.close();
          this.ID_Not_Found = true;
          window.showError();
          return;
        });
      this.$store
        .dispatch("DriverList/bankAccountInfoData", driver.DriverId)
        .then(response => {
          this.accountBank_data = response.data[0];
          this.$vs.loading.close();
        });
      this.$vs.loading.close();
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }

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
