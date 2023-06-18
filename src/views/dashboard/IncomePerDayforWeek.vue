<template>
  <e-charts autoresize :options="option" ref="bar" auto-resize />
</template>

<script>
/* eslint-disable */
import moduleDashboard from "@/store/fleetDashboard/moduleDashboard.js";
import moment from "moment";

import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts-gl";

export default {
  data() {
    return {
      duration: 5,
      clearSetInterval: false,
      option: {
        title: {
          text: this.$t("IncomePerDayforWeek"),
          left: this.$vs.rtl ? "right" : "left",
          textStyle: {
            fontFamily: "Cairo"
          }
        },
        toolbox: {
          left: this.$vs.rtl ? "left" : "right",
          feature: {
            magicType: {
              show: true,
              title: this.$t("ChangeType"),
              type: ["line", "bar"]
            },
            restore: { show: true, title: this.$t("Reset") },
            saveAsImage: {
              title: this.$t("Save"),
              type: "png",
              name:
                this.$t("IncomePerDayforWeek") +
                " " +
                moment(new Date()).format("YYYY-MM-DD hh:mm")
            }
          }
        },
        color: ["#27ABBE"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              // rotate: 45,
              fontWeight: "bold",
              fontSize: 14
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "bar",
            data: []
          }
        ]
      }
    };
  },
  components: {
    ECharts
  },
  methods: {
    IncomePerDayForWeek() {
      this.option.series[0].data = [];
      this.option.xAxis[0].data = [];
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var Obj = {};
      Obj.CompanyId = this.userInfo.CompaneyId;
      this.$store.dispatch("Dashboard/IncomePerDayforWeek", Obj).then(res => {
        res.data.forEach(element => {
          this.option.series[0].data.push(element.Value);
          this.option.xAxis[0].data.push(element.Key);
        });
      });
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.IncomePerDayForWeek();
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
    this.IncomePerDayForWeek();
    this.DashboardReloading();
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
