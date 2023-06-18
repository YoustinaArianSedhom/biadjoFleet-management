<template>
  <div
    class="flex w-full vx-row no-gutter items-center justify-center"
    id="page-forgetPass"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="mr-2 ml-2 mt-8">
              <span class="text-primary text-lg">{{
                $t("AddDriverNote")
              }}</span>
            </div>
            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-2 pt-8 login-tabs-container">
                <div class="w-full" v-if="find == true">
                  <!-- PhoneNumber -->
                  <div class=" mb-6 mt-1 w-full">
                    <label class="text-sm opacity-75">{{
                      $t("PhoneNumber")
                    }}</label>
                    <vue-tel-input
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                      v-validate="'required'"
                      @change="onChange($event)"
                      v-bind="bindProps"
                      name="PhoneNo"
                      v-model="Model.PhoneNo"
                    >
                    </vue-tel-input>
                    <span class="text-danger text-sm">{{
                      errors.first("PhoneNo")
                    }}</span>
                    <span v-if="!isValid" class="text-danger text-sm">{{
                      PhoneNumberNotValid
                    }}</span>
                  </div>
                  <!-- Find -->
                  <div class="vx-row justify-center">
                    <div class="m-4  ">
                      <vs-button
                        :disabled="Model.PhoneNo == ''"
                        @click.prevent="Search()"
                      >
                        {{ $t("Find") }}</vs-button
                      >
                    </div>
                    <div class=" m-4 ">
                      <vs-button
                        type="border"
                        color="warning"
                        icon-pack="feather"
                        @click="Back"
                        >{{ $t("Back") }}</vs-button
                      >
                    </div>
                  </div>
                </div>

                <div v-else>
                  <div class="flex mb-4">
                    <!-- Text -->
                    <!-- <div class="w-2/3 mr-2">
                      <label class="text-sm opacity-75">{{ $t("Code") }}</label>
                      <vs-input
                        class="mb-5 w-full"
                        v-model="text"
                        name="Text"
                      />
                      <span
                        class="text-danger text-sm"
                        v-show="errors.has('Text')"
                        >{{ errors.first("Text") }}</span
                      >
                    </div> -->
                    <!-- SendText -->
                    <!-- <div class="w-1/3 mt-6">
                      <vs-button
                        style="padding-left: 5px;padding-right: 5px;"
                        class="mb-5 w-full"
                        @click.prevent="SendText()"
                        v-show="!IsClicked"
                      >
                        {{ $t("SendText") }}</vs-button
                      >
                      <vs-button
                        :dir="$vs.rtl ? 'ltr' : 'ltr'"
                        v-show="IsClicked"
                        :disabled="disable"
                      >
                        {{ minutes }} : {{ seconds }}</vs-button
                      >
                    </div> -->
                  </div>
                  <!-- AddDriverToCompany -->
                  <div class="flex mb-4">
                    <div class="mr-auto ml-auto bg-grid-color-secondary h-12">
                      <vs-button @click.prevent="AddDriverToCompany()">
                        {{ $t("AddDriverToCompany") }}</vs-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
import moduleGeneral from "@/store/General/moduleGeneral.js";
import "vue-slider-component/theme/default.css";

export default {
  components: {},
  data() {
    return {
      minutes: 5,
      seconds: 0,
      innerSetInterval: null,
      IsClicked: false,
      disable: true,
      text: "",
      ApiDataText: "",
      find: true,
      right: false,
      isValid: true,
      Model: { PhoneNo: "" },
      Company: {
        PhoneNo: "",
        CompaneyId: ""
      },
      bindProps: {
        mode: "international",
        defaultCountry: "",
        disabledFetchingCountry: false,
        disabled: false,
        disabledFormatting: false,
        placeholder: "",
        required: true,
        enabledCountryCode: true,
        enabledFlags: true,
        preferredCountries: ["EG", "US", "CZ", "LY", "GB"],
        onlyCountries: [],
        ignoredCountries: [],
        autocomplete: "on",
        name: "telephone",
        maxLen: 20,
        wrapperClasses: "",
        inputClasses: "",
        dropdownOptions: {
          disabledDialCode: true
        },
        inputOptions: {
          showDialCode: false,
          tabindex: 0
        }
      }
    };
  },
  watch: {},
  methods: {
    Back() {
      this.$router.go(-1);
    },
    Search() {
      debugger;
      this.$vs.loading();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.Model.PhoneNo = this.Model.PhoneNo.replace(/\s/g, "");
          this.$store
            .dispatch("DriverList/CheckIfDriverExist", this.Model)
            .then(res => {
              if (res.status == 200) {
                if (res.data.result == "true") {
                  this.find = false;
                  this.right = true;
                  this.$vs.loading.close();
                } else {
                  // window.DriverNotFound();
                  this.$router.push({ name: "RegisterDriver" });
                  this.$vs.loading.close();
                }
                this.$vs.loading.close();
              }
            })
            .catch(() => {
              window.showError();
              this.$vs.loading.close();
            });
        } else {
          this.$vs.loading.close();
          window.showError();
        }
      });
    },
    setTimer() {
      this.minutes = 5;
      this.seconds = 0;
    },
    // SendText() {
    //   this.$vs.loading();
    //   this.$validator.validateAll().then(result => {
    //     if (result) {
    //       this.$store
    //         .dispatch("DriverList/SendOTPToDriver", this.Model)
    //         .then(res => {
    //           if (res.status == 200) {
    //             this.ApiDataText = res.data;
    //             this.$vs.loading.close();
    //             this.StartTiming();
    //           }
    //         })
    //         .catch(() => {
    //           window.showError();
    //           this.$vs.loading.close();
    //         });
    //     } else {
    //       this.$vs.loading.close();
    //       window.showError();
    //     }
    //   });
    // },
    StartTiming() {
      this.IsClicked = true;
      this.setTimer();
      this.innerSetInterval = window.setInterval(() => {
        if (this.minutes == 0 && this.seconds == 0) {
          clearInterval(this.innerSetInterval);
          this.IsClicked = false;

          return;
        }

        if (this.seconds > 0) {
          this.seconds = this.seconds - 1;
        } else {
          this.seconds = 59;

          if (this.minutes > 0) {
            this.minutes = this.minutes - 1;
          }
        }
      }, 1000);
    },
    AddDriverToCompany() {
      if (this.ApiDataText == this.text) {
        this.$vs.loading();
        let userInfo = JSON.parse(localStorage.getItem("userInfo"));
        this.Company.CompaneyId = userInfo.CompaneyId;
        this.Company.PhoneNo = this.Model.PhoneNo;
        this.$store
          .dispatch("DriverList/AddDriverToCompany", this.Company)
          .then(res => {
            if (res.status == 200) {
              this.$vs.loading.close();
              window.showDriverAddeddSuccessfuly();
              this.$router.push("/ViewDrivers");
            }
          })
          .catch(err => {
            if (err.response.status == 400) {
              if (err.response.data == 0) {
                window.showAlreadyExist();
                this.$vs.loading.close();
              }
              if (err.response.data == 2) {
                window.showAlreadyExistInAnotherCompany();
                this.$vs.loading.close();
              } else {
                window.showError();
                this.$vs.loading.close();
              }
            } else {
              window.showError();
              this.$vs.loading.close();
            }
          });
      } else {
        window.IncorrectCode();
      }
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }

    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("CountryList", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    this.$store.dispatch("CountryList/fetchAllCountriesList");
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 255px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
