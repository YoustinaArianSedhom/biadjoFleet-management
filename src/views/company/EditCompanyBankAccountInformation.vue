<template>
  <div id="page-companyBankInfo-view">
    <vs-alert
      color="danger"
      title="driver Not Found"
      :active.sync="ID_Not_Found"
    >
      <span>bank info record with id: {{ $route.params.Id }} not found.</span>
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'CompanyWallet' }"
          class="text-inherit underline"
          >wallet</router-link
        >
      </span>
    </vs-alert>

    <div id="companyBankInfo-data" v-if="accountBank_data != undefined">
      <vx-card class="mb-base">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- FullName -->
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
              <!-- BankName -->
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
              <!-- BranchName -->
              <tr>
                <td class="font-semibold">{{ $t("BranchName") }} :</td>
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
              <!-- AccountNumber -->
              <tr>
                <td class="font-semibold">{{ $t("AccountNumber") }} :</td>
                <td>
                  <vs-input
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
              <!-- SWIFT -->
              <tr>
                <td class="font-semibold">{{ $t("SWIFT") }} :</td>
                <td>
                  <vs-input
                    class="w-full mt-4"
                    v-model="accountBank_data.SWIFT"
                    name="SWIFT"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- ZipCode -->
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }} :</td>
                <td>
                  <vs-input
                    v-validate="'required'"
                    class="w-full mt-4"
                    v-model="accountBank_data.ZipCode"
                    name="ZipCode"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('ZipCode')"
                    >{{ errors.first("ZipCode") }}</span
                  >
                </td>
              </tr>
              <!-- BankAddress -->
              <tr>
                <td class="font-semibold">{{ $t("BankAddress") }} :</td>
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
              <!-- Country -->
              <tr>
                <td class="font-semibold">{{ $t("Country") }} :</td>

                <td>
                  <v-select
                    label="alpha2Code"
                    class="mt-1 w-full"
                    name="Country"
                    :reduce="alpha2Code => alpha2Code.alpha2Code"
                    v-model="accountBank_data.Country"
                    :options="AllCountries"
                    v-validate="'required'"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('Country')"
                  >
                    {{ errors.first("Country") }}
                  </span>
                </td>
              </tr>
              <!-- State -->
              <tr>
                <td class="font-semibold">{{ $t("State") }} :</td>

                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required|min:3'"
                    name="State"
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
              <!-- City -->
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
            </table>
          </div>
        </div>

        <div class="flex flex-wrap m-4">
          <!-- SaveChanges -->
          <div class="mr-4 ">
            <vs-button
              class="ml-auto mt-2"
              @click="confirmSave"
              :disabled="!validateForm"
            >
              {{ $t("SaveChanges") }}
            </vs-button>
          </div>
          <!-- Back -->
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
import moduleCompany from "@/store/company/moduleCompany.js";
import moduleCountry from "@/store/countrySetting/moduleCountry.js";
import moduleGeneral from "@/store/General/moduleGeneral.js";

export default {
  data() {
    return {
      ID_Not_Found: false,
      accountBank_data: {
        CompanyId: "",
        FullName: "",
        BankName: "",
        BranchName: "",
        AccountNumber: "",
        SWIFT: "",
        BankAddress: "",
        City: "",
        State: "",
        ZipCode: "",
        Country: "Egypt"
      },
      BankDataType: "SWIFT"
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
    AllCountries() {
      return this.$store.state.CountryList.AllCountries;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.accountBank_data.FullName !== "" &&
        this.accountBank_data.BankName !== "" &&
        this.accountBank_data.BranchName !== "" &&
        this.accountBank_data.AccountNumber !== "" &&
        // this.accountBank_data.SWIFT !== "" &&
        this.accountBank_data.BankAddress !== "" &&
        this.accountBank_data.City !== "" &&
        this.accountBank_data.State !== "" &&
        this.accountBank_data.ZipCode !== "" &&
        this.accountBank_data.Country !== ""
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
    Back() {
      this.$router.go(-1);
    },
    save_changes() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      // if (this.BankDataType == "IBAN") {
      //   if (
      //     this.accountBank_data.AccountNumber.substring(0, 2).toUpperCase() !=
      //     this.accountBank_data.Country
      //   ) {
      //     window.IBANError();
      //     return;
      //   }
      // }
      this.$vs.loading();

      this.$store
        .dispatch(
          "Company/updateCompanyBankAccountInformation",
          this.accountBank_data
        )
        .then(res => {
          if (res.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
            this.fetchData();
          }
        })
        .catch(() => {
          window.showError();
          this.$vs.loading.close();
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
      var userInfo = JSON.parse(localStorage.getItem("userInfo"));
      window.userTypeNotAllowedToAccessCurrentPage(userInfo.AccountType);

      var company = this.$route.params.Id;
      let JsonObj = {};
      JsonObj.CompanyId = company;

      this.$store
        .dispatch("Company/fetchCompanyBankAccountInfo", JsonObj)
        .then(response => {
          if (response.status == 200) {
            var accountInfo = response.data[0];
            if (response.data[0].State) {
              this.GetCityList(response.data[0].State);
            }
            this.accountBank_data.BranchName = accountInfo.BranchName;
            this.accountBank_data.FullName = accountInfo.FullName;
            this.accountBank_data.CompanyId = company;
            this.accountBank_data.BankName = accountInfo.BankName;
            this.accountBank_data.BankAddress = accountInfo.BankAddress;
            this.accountBank_data.AccountNumber = accountInfo.AccountNumber;
            this.accountBank_data.SWIFT = accountInfo.SWIFT;
            this.accountBank_data.City = accountInfo.City;
            this.accountBank_data.State = accountInfo.State;
            this.accountBank_data.ZipCode = accountInfo.ZipCode;
            this.accountBank_data.Country = accountInfo.Country;
            // if (
            //   this.accountBank_data.AccountNumber.substring(
            //     0,
            //     2
            //   ).toUpperCase() == this.accountBank_data.Country.toUpperCase()
            // ) {
            //   this.BankDataType = "IBAN";
            // } else {
            //   this.BankDataType = "SWIFT";
            // }
            this.$vs.loading.close();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          this.ID_Not_Found = true;
          window.showError();
        });
    }
  },
  created() {
    this.$vs.loading();
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    if (!moduleCountry.isRegistered) {
      this.$store.registerModule("CountryList", moduleCountry);
      moduleCountry.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountries");

    let item = {};
    item.CountryCode = "EG";
    this.$store.dispatch("General/GetStateList", item);

    this.fetchData();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-companyBankInfo-view {
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
