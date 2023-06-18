<template>
  <div class="vx-col w-full md:w-3/3 mb-base float-right">
    <template slot="actions">
      <feather-icon
        icon="SettingsIcon"
        svgClasses="w-6 h-6 text-grey"
      ></feather-icon>
    </template>
    <div slot="no-body" class="h3-6 pb-0">
      <div class="flex " v-if="UnPaideBiadjosOutstandingBalance">
        <div class="m-6">
          <p class="mb-3 font-semibold">{{ $t("NumberOfBiadjos") }}</p>
          <p class="text-4xl text-success">
            <sup class="text-base mr-1">#</sup
            >{{ UnPaideBiadjosOutstandingBalance[0].Value }}
          </p>
        </div>
        <div class="m-6">
          <p class="mb-3 font-semibold">{{ $t("outStandingBalance") }}</p>
          <p class="text-4xl text-danger">
            <sup class="text-base mr-1">$</sup
            >{{ UnPaideBiadjosOutstandingBalance[1].Value }}
            <span class="text-xl" style="color:black">
              {{ $t(CountryCode + "_Currency") }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moduleDashboard from "@/store/fleetDashboard/moduleDashboard.js";

export default {
  data() {
    return {
      duration: 5,
      UnPaideBiadjosOutstandingBalance: null,
      CountryCode: null,
      clearSetInterval: false
    };
  },
  components: {},
  methods: {
    UnPaidBiadjosOutstandingBalance() {
      this.UnPaideBiadjosOutstandingBalance = null;
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var Obj = {};
      Obj.CompanyId = userInfo.CompaneyId;
      this.CountryCode = userInfo.countrycode;
      this.$store
        .dispatch("Dashboard/UnPaideBiadjosOutstandingBalance", Obj)
        .then(res => {
          this.UnPaideBiadjosOutstandingBalance = res.data;
        });
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.UnPaidBiadjosOutstandingBalance();
      }, this.duration * 1000 * 60);
    },
    StopInterval() {
      clearInterval(this.clearSetInterval);
    }
  },
  created() {
    if (!moduleDashboard.isRegistered) {
      this.$store.registerModule("Dashboard", moduleDashboard);
      moduleDashboard.isRegistered = true;
    }
    this.UnPaidBiadjosOutstandingBalance();
    this.DashboardReloading();
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
