<template>
  <div class="w-full bg-img vx-row no-gutter items-center justify-center ">
    <div style="padding: 20px; margin: auto;">
      <div class="vx-col w-full">
        <div class="vx-col ">
          <label class="text-sm opacity-75">{{ $t("Price") }}</label>
          <vs-input
            class="w-full"
            type="Number"
            name="Price"
            min="1"
            v-model="PopupModel.price"
            icon-after
            :icon="$t(`${PopupModel.CountryCode}_Currency`)"
          />

          <span class="text-danger text-sm" v-show="errors.has('id')">
            {{ errors.first("id") }}
          </span>
        </div>
        <div class="vx-row" style="padding: 20px; margin: auto;">
          <vs-button
            @click="OpenNewPopup"
            :disabled="!validateForm"
            color="primary"
            class="mr-4 mb-2"
            type="filled"
            >{{ $t("SubmitOffer") }}</vs-button
          >
          <vs-button
            @click="ClosePopup"
            color="primary"
            type="filled"
            class="mr-4 mb-2"
            >{{ $t("Cancel") }}</vs-button
          >
        </div>
      </div>
      <vs-popup
        classContent="popup-example"
        v-bind:title="$t('SubmitOffer')"
        :active.sync="popupActiveCompanySubmitOffer"
      >
        <div class="vx-row">
          <div class="vx-col w-full">
            <label class="text-xl opacity-75"
              >{{ $t("OfferWillSendWithValue") }} :
              {{ this.PopupModel.price | numFormat("###,##0.00") }}
              {{ $t(PopupModel.CountryCode + "_Currency") }}
            </label>
          </div>

          <div class="vx-row ml-auto mr-auto pt-4">
            <vs-button
              @click="SubmitOffer()"
              color="primary"
              class="mr-4 mb-2"
              type="filled"
              >{{ $t("Send") }}</vs-button
            >
            <vs-button
              @click="popupActiveCompanySubmitOffer = false"
              color="primary"
              type="filled"
              class="mr-4 mb-2"
              >{{ $t("Cancel") }}</vs-button
            >
          </div>
        </div>
      </vs-popup>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";

export default {
  props: {
    PopupModel: {
      type: Object
    }
  },
  data() {
    return {
      popupActiveCompanySubmitOffer: false
    };
  },
  computed: {
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
    OpenNewPopup() {
      this.popupActiveCompanySubmitOffer = true;
      this.$emit("ClosePopup");
    },
    ClosePopup() {
      this.$emit("ClosePopup");
    },

    SubmitOffer() {
      if (!this.validateForm) return;
      this.$vs.loading();
      this.$store
        .dispatch("DriverList/SubmitOfferToBiadjo", this.PopupModel)
        .then(response => {
          if (response.status == 200) {
            this.$vs.loading.close();
            this.popupActiveCompanySubmitOffer = false;
            window.showSuccess();
            this.$emit("Refresh");
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.$emit("Refresh");
          this.popupActiveCompanySubmitOffer = false;
          window.showError();
        });
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
  }
};
</script>
