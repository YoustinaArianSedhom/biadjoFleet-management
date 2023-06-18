<!-- =========================================================================================
  File Name: BiadjoView.vue
  Description: Biadjo View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/Biadjo/pixinvent
========================================================================================== -->
<template>
  <div id="page-Biadjo-view">
    <vs-alert
      color="danger"
      title="SubmittedOrder Not Found"
      :active.sync="SubmittedOrders_not_found"
    >
      <span
        >SubmittedOrders record with driver id: {{ this.$route.params.Id }} not
        found.</span
      >
      <span>
        <span>Check</span>
        <router-link
          :to="{
            name: 'DriverProfile',
            params: {
              Id: $route.params.Id
            }
          }"
          class="text-inherit underline"
          >Driver</router-link
        >
      </span>
    </vs-alert>
    <vx-card ref="filterCard" class="user-list-filters mb-8" collapse-action>
      <div class="vx-row">
        <div class="vx-col w-full">
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO1">{{
            $t("SO1")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO2">{{
            $t("SO2")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO3">{{
            $t("SO3")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="SO4">{{
            $t("SO4")
          }}</vs-radio>
          <vs-radio class="m-2" v-model="statusFilter" vs-value="ALL">{{
            $t("ALL")
          }}</vs-radio>
        </div>
      </div>
    </vx-card>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="SubmittedOrderModel != undefined || SubmittedOrderModel != null"
        >
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="filteredSubmittedOrderModel"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 m-2"
                @click="Back"
                type="border"
                color="warning"
                icon-pack="feather"
              >
                {{ $t("Back") }}
              </vs-button>

              <div class="flex flex-wrap-reverse items-center"></div>
            </div>

            <template slot="thead">
              <vs-th sort-key="FirstName">{{ $t("FullName") }}</vs-th>

              <vs-th sort-key="SubmittedOrderNumber">{{
                $t("SubmittedOrderNumber")
              }}</vs-th>
              <vs-th sort-key="BiadjoNumber">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Offer">{{ $t("Offer") }}</vs-th>
              <vs-th sort-key="Status"> {{ $t("Status") }} </vs-th>
              <vs-th sort-key="Date">{{ $t("Date") }}</vs-th>
              <vs-th>{{ $t("SubmitOffer") }}</vs-th>
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>
              <vs-th>{{ $t("ViewOnMap") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">
                      {{ tr.FirstName }} {{ tr.LastName }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.Id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="BiadjoRequestID">{{ tr.BiadjoRequestID }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="Offer">
                      {{ tr.Offer | numFormat("###,##0.00") }}
                      {{ $t(userInfo.countrycode + "_Currency") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getStatusColor(tr.Status)"
                      class="Status"
                      >{{ $t(tr.Status) }}</vs-chip
                    >
                  </vs-td>
                  <vs-td>
                    <p class="DateTime">
                      {{ tr.DateTime | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      v-if="tr.Status == 'SO1'"
                      @click="popupActive1Open(tr)"
                      size="small"
                    >
                      {{ $t("SubmitOffer") }}
                    </vs-button>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      v-if="tr.Status == 'SO1' || tr.Status == 'SO4'"
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.BiadjoRequestID }
                      }"
                      size="small"
                    >
                      {{ $t("BiadjoDetails") }}
                    </vs-button>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      v-if="tr.Status == 'SO1' || tr.Status == 'SO4'"
                      size="small"
                      :to="{
                        name: 'FollowBiadjoOnMap',
                        params: { Id: tr.BiadjoRequestID }
                      }"
                    >
                      {{ $t("ViewOnMap") }}
                    </vs-button>
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
    <div class="parentx-static">
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="CompanySubmitOffer"
      >
        <div style="padding: 20px; margin: auto;">
          <CompanySubmitOffer
            :PopupModel="PopupModel"
            @ClosePopup="CompanySubmitOffer = false"
          ></CompanySubmitOffer>
        </div>
      </vs-popup>
    </div>
  </div>
</template>
<script>
import moduleDriver from "@/store/driver/moduleDriver.js";

export default {
  data() {
    return {
      userInfo: {},
      CompanySubmitOffer: false,
      popupActive2: false,
      itemsPerPage: 10,
      PopupModel: {},
      statusFilter: "SO1",
      driver_id: "",
      SubmittedOrders_not_found: false,
      SubmittedOrderModel: [],

      disable: true,
      popupActive: false,

      driver: {}
    };
  },
  components: {
    CompanySubmitOffer: () =>
      import("@/views/generalPopups/CompanySubmitOffer.vue")
  },
  computed: {
    filteredSubmittedOrderModel() {
      if (this.statusFilter != "ALL") {
        return this.SubmittedOrderModel.filter(order => {
          return order.Status == this.statusFilter;
        });
      } else {
        return this.SubmittedOrderModel;
      }
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.PopupModel.price != undefined &&
        this.PopupModel.price != null &&
        this.PopupModel.price != ""
      );
    }
  },
  methods: {
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
    popupActive1Open(tr) {
      this.PopupModel.BiadjoID = tr.BiadjoRequestID;
      this.PopupModel.DriverID = this.$route.params.Id;
      // this.PopupModel.price = tr.Offer;
      this.CompanySubmitOffer = true;
    },

    SubmitOffer() {
      if (!this.validateForm) return;
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/SubmitOfferToBiadjo", this.PopupModel)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            this.CompanySubmitOffer = false;
            this.popupActive2 = false;
            window.showSuccess();
            location.reload("/");
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.CompanySubmitOffer = false;
          this.popupActive2 = false;
          window.showError();
        });
    },
    getStatusColor(status) {
      if (status == "SO1") {
        return "#F8BD30";
      }
      if (status == "SO2") {
        return "#F8BD30";
      }
      if (status == "SO3") {
        return "#B11226";
      }
      if (status == "SO4") {
        return "#039BE5";
      }

      return "primary";
    },

    Back() {
      this.$router.go(-1);
    },
    fetchData() {
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/GetDriverById", {
          DriverId: this.$route.params.Id
        })
        .then(response => {
          if (response.status == 200) {
            window.validCompanyUser(response.data.CompanyId);
          }
        })
        .catch(() => {
          return;
        });
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.PopupModel.CountryCode = this.userInfo.countrycode;
      var driver = {};
      driver.DriverId = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/ViewSubmitedOrders", driver)
        .then(response => {
          if (response.data.length > 0) {
            this.SubmittedOrderModel = response.data;

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
          }
        })
        .catch(() => {
          this.SubmittedOrders_not_found = true;
          this.$vs.loading.close();
          window.showError();
          return;
        });
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>
<style lang="scss" scopped>
#data-list-list-view {
  .vs-con-table {
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
      margin-left: 1.5rem;
      margin-right: 1.5rem;

      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);

        td {
          padding: 20px;

          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }

          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
        }

        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }

      th.td-check {
        padding: 0 15px !important;
      }

      tr {
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
