<template>
  <vx-card class="p-8">
    <div class="vx-row mb-6">
      <!-- MessageType -->
      <div class="vx-col w-full">
        <label class="text-sm opacity-75">{{ $t("MessageType") }}</label>
        <v-select
          style="padding-bottom: 0 !important;padding-top: 0 !important"
          class="mt-1 w-full"
          name="MessageType"
          v-model="Model.MessageType"
          :reduce="Value => Value.Value"
          :options="this.$options.ContactUsMessageTypesJson"
          v-validate="'required'"
          :dir="$vs.rtl ? 'rtl' : 'ltr'"
          :get-option-label="option => $t(option.Code)"
        />
        <span class="text-danger text-sm" v-show="errors.has('MessageType')">
          {{ errors.first("MessageType") }}</span
        >
      </div>
    </div>
    <!-- MessageBody -->
    <div class="vx-row mb-6">
      <div class="vx-col w-full">
        <vs-textarea rows="12" v-model="Model.MessageBody" />
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full">
        <!-- Send -->
        <vs-button
          class="mr-3 mb-2"
          @click="SendMessage"
          :disabled="!validateForm"
          >{{ $t("Send") }}</vs-button
        >
        <!-- Reset -->
        <vs-button color="warning" type="border" class="mb-2" @click="Reset">{{
          $t("Reset")
        }}</vs-button>
      </div>
    </div>
  </vx-card>
</template>
<script>
import moduleGeneral from "@/store/General/moduleGeneral.js";
import ContactUsMessageTypes_JSON from "@/views/JsonFiles/ContactUsMessageTypes.json";

export default {
  ContactUsMessageTypesJson: ContactUsMessageTypes_JSON,
  data() {
    return {
      Model: {
        MessageType: null,
        MessageBody: "",
        UserEmail: "",
        UserPhoneNo: "",
        UserFullName: "",
        UserType: "FLeet User",
        UserId: ""
      }
    };
  },
  computed: {
    validateForm() {
      return (
        this.Model.MessageBody.length > 1 &&
        this.Model.MessageType !== "" &&
        this.Model.MessageType !== null
      );
    }
  },
  methods: {
    Reset() {
      this.Model.MessageBody = "";
      this.Model.MessageType = null;
    },
    SendMessage() {
      this.$vs.loading();
      this.$store
        .dispatch("CountryList/ContactUs", this.Model)
        .then(() => {
          this.$vs.loading.close();
          window.showSuccessContactUs();
          this.$router.push({ name: "home" });
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    }
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("CountryList", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    var userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.Model.UserId = userInfo.Id;
    this.Model.UserEmail = userInfo.Email;
    this.Model.UserPhoneNo = userInfo.PhoneNumber;
    this.Model.UserFullName = userInfo.firstName + " " + userInfo.lastName;
  }
};
</script>
