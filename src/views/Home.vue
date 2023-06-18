<template>
  <div class="vx-row">
    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <BiadjoSchedualeForWeek />
      </vx-card>
    </div>

    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <IncomePerDayforWeek />
      </vx-card>
    </div>

    <div class="vx-col  w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <IncomePerYear />
      </vx-card>
    </div>
    <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/2 mb-base">
      <vx-card class="FixedHeight">
        <h4 class=" font-bold mb-4">
          {{ $t("UnPaideBiadjosOutstandingBalance") }}
        </h4>
        <UnPaideBiadjosOutstandingBalance />
      </vx-card>
    </div>
    <div class="vx-col w-full mb-base">
      <vx-card class="FixedHeight">
        <BiadjoSchedualePerStatusForToday />
      </vx-card>
    </div>

    <div class="vx-col w-full mb-base">
      <vx-card>
        <DriversPerTruckType />
      </vx-card>
    </div>
  </div>
</template>
<script>
import BiadjoSchedualeForWeek from "@/views/dashboard/BiadjoSchedualeForWeek";
import IncomePerDayforWeek from "@/views/dashboard/IncomePerDayforWeek";
import IncomePerYear from "@/views/dashboard/IncomePerYear";
import BiadjoSchedualePerStatusForToday from "@/views/dashboard/BiadjoSchedualePerStatusForToday";
import DriversPerTruckType from "@/views/dashboard/DriversPerTruckType";
import UnPaideBiadjosOutstandingBalance from "@/views/dashboard/UnPaideBiadjosOutstandingBalance";

export default {
  components: {
    BiadjoSchedualeForWeek,
    IncomePerDayforWeek,
    IncomePerYear,
    BiadjoSchedualePerStatusForToday,
    DriversPerTruckType,
    UnPaideBiadjosOutstandingBalance
  }
};
</script>
<style>
.FixedHeight {
  height: 500px !important;
}
.HalfFixedHeight {
  height: 250px !important;
}
.ThirdFixedHeight {
  height: 280px !important;
}
</style>
