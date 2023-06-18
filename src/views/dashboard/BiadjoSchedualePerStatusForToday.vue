<template>
  <e-charts autoresize :options="pie" ref="pie" auto-resize />
</template>

<script>
import ECharts from "vue-echarts/components/ECharts";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import "echarts/lib/chart/pie";
import moduleDashboard from "@/store/fleetDashboard/moduleDashboard.js";
import moment from "moment";

export default {
  data() {
    return {
      duration: 5,
      clearSetInterval: false,
      pie: {
        title: {
          text: this.$t("BiadjoSchedualePerStatusForToday"),
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
                this.$t("BiadjoSchedualePerStatusForToday") +
                " " +
                moment(new Date()).format("YYYY-MM-DD hh:mm")
            }
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [],
          padding: 50
        },
        series: [
          {
            name: this.$t("DriversPerStatus"),
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            color: [
              "#27ABBE",
              "#EA5455",
              "#EA5455",
              "#EA5455",
              "#FF9F43",
              "#FF9F43"
            ],

            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  components: {
    ECharts
  },
  methods: {
    BiadjoSchedualePerStatus() {
      this.pie.series[0].data = [];
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      var Obj = {};
      Obj.CompanyId = this.userInfo.CompaneyId;
      this.$store
        .dispatch("Dashboard/BiadjoSchedualePerStatusForToday", Obj)
        .then(response => {
          response.data.forEach(element => {
            if (element.Value == 0) {
              this.pie.series[0].data.push({
                name: this.$t(element.Key),
                value: null
              });
              this.pie.legend.data.push(this.$t(element.Key));
            } else {
              this.pie.series[0].data.push({
                name: this.$t(element.Key),
                value: element.Value
              });
              this.pie.legend.data.push(this.$t(element.Key));
            }
          });
        });
    },
    DashboardReloading() {
      this.clearSetInterval = setInterval(() => {
        this.BiadjoSchedualePerStatus();
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
    this.BiadjoSchedualePerStatus();
    this.DashboardReloading();
  },
  beforeDestroy() {
    this.StopInterval();
  }
};
</script>
