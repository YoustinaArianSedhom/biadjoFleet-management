<!-- =========================================================================================
  File Name: driverView.vue
  Description: driver View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/driver/pixinvent
========================================================================================== -->

<template>
  <div id="page-driver-view">
    <vs-alert color="danger" title="No Data Found" :active.sync="noDataFound">
      <span
        >Sorry... No Data Found For Driver with ID :
        <a> {{ $route.params.Id }} </a>.</span
      >
      <span>
        <span>Check For Another Driver </span>
        <router-link :to="{ name: 'Driver' }" class="text-inherit underline"
          >All drivers</router-link
        >
      </span>
    </vs-alert>
    <div class="w-full" id="Scroll">
      <vx-card>
        <div
          id="data-list-list-view"
          class="data-list-container"
          v-if="Model != undefined || Model != null"
        >
          <vs-table
            ref="table"
            pagination
            :max-items="itemsPerPage"
            search
            :data="Model"
          >
            <div
              slot="header"
              class="flex flex-wrap-reverse items-center flex-grow justify-between"
            >
              <vs-button
                class="mr-4 mb-2"
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
              <vs-th sort-key="Biadjo Number">{{ $t("BiadjoNumber") }}</vs-th>
              <vs-th sort-key="Price">{{ $t("Price") }}</vs-th>
              <vs-th sort-key="Schedual">{{ $t("Schedual") }}</vs-th>
              <vs-th sort-key="Payment Status">{{ $t("PaymentStatus") }}</vs-th>
              <vs-th sort-key="Status">{{ $t("Status") }}</vs-th>
              <vs-th sort-key="Driver Payment Status">
                {{ $t("DriverPaymentStatus") }}
              </vs-th>
              <vs-th sort-key="Rating">{{ $t("Rating") }}</vs-th>
              <vs-th>{{ $t("BiadjoDetails") }}</vs-th>
              <vs-th>{{ $t("ViewDriverOnMap") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="id font-medium truncate">{{ tr.id }}</p>
                  </vs-td>

                  <vs-td>
                    <p class="Price">
                      {{ tr.Price | numFormat("###,##0.00") }}
                      {{ $t(tr.CountryCode + "_Currency") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="Schedual">
                      {{ tr.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <vs-chip
                      :color="getStatusColor(tr.PaymentStatus)"
                      class="PaymentStatus"
                      >{{ $t(tr.PaymentStatus) }}</vs-chip
                    >
                  </vs-td>

                  <vs-td>
                    <vs-chip :color="getStatusColor(tr.Status)" class="Status">
                      <p>{{ $t(tr.Status) }}</p>
                    </vs-chip>

                    <!-- <p class="Status">{{ $t(tr.Status) }}</p> -->
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getStatusColor(tr.DriverPaymentStatus)"
                      class="DriverPaymentStatus"
                    >
                      <p>{{ $t(tr.DriverPaymentStatus) }}</p>
                    </vs-chip>
                    <!-- <p class="DriverPaymentStatus">
                      {{ $t(tr.DriverPaymentStatus) }}
                    </p> -->
                  </vs-td>
                  <vs-td>
                    <p class="Status">{{ tr.Rating }}</p>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <router-link
                      :to="{
                        name: 'BiadjoDetails',
                        params: { Id: tr.id }
                      }"
                      svgClasses="w-5 h-5 hover:text-primary stroke-current"
                    >
                      <feather-icon
                        icon="ArchiveIcon"
                        svgClasses="w-5 h-5 hover:text-primary stroke-current"
                        style="padding: 2px;"
                      />
                    </router-link>
                  </vs-td>
                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      :to="{
                        name: 'FollowBiadjoOnMap',
                        params: { Id: tr.id }
                      }"
                      color="primary"
                      class="text-lg"
                      type="filled"
                      size="small"
                      >{{ $t("ViewOnMap") }}</vs-button
                    >
                  </vs-td>
                </vs-tr>
              </tbody>
            </template>
          </vs-table>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import { en, ar } from "vuejs-datepicker/src/locale";

export default {
  data() {
    return {
      format: "dd/MM/yyyy",
      ar: ar,
      en: en,
      itemsPerPage: 10,
      Model: {},
      noDataFound: false
    };
  },
  computed: {
    DatepickerLang() {
      var SelectedLanguage = {};

      if (this.$i18n.locale == "ar") {
        SelectedLanguage = this.ar;
      } else {
        SelectedLanguage = this.en;
      }
      return SelectedLanguage;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.Biadjo.length;
    },
    windowWidth() {
      return this.$store.state.windowWidth;
    }
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    getStatusColor(status) {
      if (status == "PS3") {
        return "#F8BD30";
      }
      if (status == "PS1") {
        return "#039BE5";
      }
      if (status == "PS2") {
        return "#B11226";
      }

      if (status == "BS1") {
        return "#F8BD30";
      }
      if (status == "BS2") {
        return "#F8BD30";
      }
      if (status == "BS3") {
        return "#F8BD30";
      }
      if (status == "BS4") {
        return "dark";
      }

      if (status == "BS11") {
        return "#039BE5";
      }
      if (status == "BS12") {
        return "#B11226";
      }
      if (status == "BS13") {
        return "#B11226";
      }
      if (status == "BS14") {
        return "#B11226";
      }

      if (status == "DPS1") {
        return "#039BE5";
      }
      if (status == "DPS2") {
        return "#B11226";
      }
      if (status == "DPS3") {
        return "#F8BD30";
      }

      return "primary";
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
      var driver = {};
      driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/getScheduledBiadjos", driver)
        .then(response => {
          if (response.data.length > 0) {
            this.Model = response.data;
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            window.showNoRecords();
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
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  }
};
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {
    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
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
