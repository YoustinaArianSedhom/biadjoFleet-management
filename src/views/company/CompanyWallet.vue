<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="ID_Not_Found"
    >
      <span
        >company wallet record with id: {{ this.$route.params.Id }} not found.
      </span>
    </vs-alert>

    <div id="company-data" v-if="CompanyWalletBalance != undefined">
      <vx-card class="mb-base" id="account-info">
        <!-- CompanyWalletBalance -->
        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <h3 class="m-2">
              {{ $t("Balance") }}
            </h3>
            <h2
              class="m-1"
              v-if="CompanyWalletBalance >= 0"
              style="color:green"
            >
              {{ CompanyWalletBalance | numFormat("###,##0.00") }}
            </h2>
            <h2 class="m-1" v-if="CompanyWalletBalance < 0" style="color:red">
              {{ CompanyWalletBalance | numFormat("###,##0.00") }}
            </h2>
            <h5>
              {{ $t(userInfo.countrycode + "_Currency") }}
            </h5>
          </vs-col>
        </vs-row>

        <vs-row vs-type="flex" vs-justify="center">
          <vs-col
            class="m-4"
            vs-type="flex"
            vs-justify="center"
            vs-align="center"
            vs-w="12"
          >
            <div class="flex flex-wrap m-4">
              <!-- EditBankInformation -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  v-if="userInfo.AccountType != 'FAT2'"
                  icon-pack="feather"
                  :to="{
                    name: 'EditCompanyBankAccountInformation',
                    params: {
                      Id: userInfo.CompaneyId
                    }
                  }"
                  class="mr-4"
                  icon="icon-edit"
                  >{{ $t("EditBankInformation") }}</vs-button
                >
              </div>
              <!-- ApplyBankInfoToAllDrivers -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  v-if="userInfo.AccountType != 'FAT2'"
                  icon-pack="feather"
                  class="mr-4"
                  @click="confirmApplyBank"
                  icon="icon-edit"
                  >{{ $t("ApplyBankInfoToAllDrivers") }}</vs-button
                >
              </div>
              <!-- TransactionsHistory -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  v-if="userInfo.AccountType != 'FAT2'"
                  :to="{
                    name: 'CompanyTransactionHistory',
                    params: {
                      Id: userInfo.CompaneyId
                    }
                  }"
                  class="mr-4"
                  >{{ $t("TransactionsHistory") }}</vs-button
                >
              </div>
              <!-- Back -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4"
                >
                  {{ $t("Back") }}</vs-button
                >
              </div>
            </div>
          </vs-col>
        </vs-row>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleCompany from "@/store/company/moduleCompany.js";
export default {
  data() {
    return {
      ID_Not_Found: false,
      CompanyWalletBalance: {},
      userInfo: {}
    };
  },
  components: {},
  methods: {
    confirmApplyBank() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToUpdateBankInfoForAllDrivers"),
        cancelText: this.$t("Cancel"),
        accept: this.ApplyBankInfoToAllDrivers,
        acceptText: this.$t("Apply")
      });
    },
    Back() {
      this.$router.go(-1);
    },
    ApplyBankInfoToAllDrivers() {
      this.$vs.loading();
      let JsonObj = {};
      JsonObj.CompanyId = this.userInfo.CompaneyId;

      this.$store
        .dispatch("Company/applyBankInfoToAllDrivers", JsonObj)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            window.showSuccess();
          }
          this.$vs.loading.close();
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      let JsonObj = {};
      JsonObj.CompanyId = this.userInfo.CompaneyId;

      this.$store
        .dispatch("Company/fetchCompanyWalletBalance", JsonObj)
        .then(response => {
          if (response.status == 200) {
            this.CompanyWalletBalance = response.data;
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
    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>
