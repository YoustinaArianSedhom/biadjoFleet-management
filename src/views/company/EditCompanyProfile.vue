<template>
  <div id="page-client-view">
    <vs-alert
      color="danger"
      title="client Not Found"
      :active.sync="ID_Not_Found"
    >
      <span>company record with id: {{ userInfo.CompaneyId }} not found. </span>
      <span>
        <span>Check</span>
        <router-link
          :to="{ name: 'CompanyProfile' }"
          class="text-inherit underline"
          >company</router-link
        >
      </span>
    </vs-alert>
    <div id="company-data" v-if="company_data != undefined">
      <vx-card class="mb-base" id="account-info">
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <!-- CompanyName -->
              <tr>
                <td class="font-semibold">{{ $t("CompanyName") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|min:3'"
                    name="CompanyName"
                    v-model="CompanyModel.CompanyName"
                    class="w-full"
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("CompanyName")
                  }}</span>
                </td>
              </tr>
              <!-- Email -->
              <tr>
                <td class="font-semibold">{{ $t("Email") }}</td>
                <td>
                  <vs-input
                    v-validate="'required|email'"
                    name="Email"
                    icon-no-border
                    v-model="CompanyModel.Email"
                    class="w-full "
                  />
                  <span class="text-danger text-sm">{{
                    errors.first("Email")
                  }}</span>
                </td>
              </tr>
              <!-- PhoneNumber -->
              <tr>
                <td class="font-semibold">{{ $t("PhoneNumber") }}</td>
                <div class="td mb-3">
                  <vue-tel-input
                    :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    @change="onChange($event)"
                    @onInput="onInput"
                    v-bind="bindProps"
                    name="PhoneNo"
                    v-model="CompanyModel.PhoneNo"
                  >
                  </vue-tel-input>
                  <span class="text-danger text-sm">{{
                    errors.first("PhoneNo")
                  }}</span>
                  <span v-if="!isValid" class="text-danger text-sm">{{
                    $t("PhoneNumberNotValid")
                  }}</span>
                </div>
              </tr>
              <!-- TaxID -->
              <tr>
                <td class="font-semibold">{{ $t("TaxID") }}</td>
                <td>
                  <vs-input
                    name="TaxID"
                    v-model="CompanyModel.TaxID"
                    class="w-full"
                  />
                </td>
              </tr>
              <!-- CommercialRegistrationID -->
              <tr>
                <td class="font-semibold">
                  {{ $t("CommercialRegistrationID") }}
                </td>
                <td>
                  <vs-input
                    name="CommercialRegistrationID"
                    v-model="CompanyModel.CommercialRegistrationID"
                    class="w-full"
                  />
                </td>
              </tr>
            </table>
          </div>
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <!-- Address -->
              <tr>
                <td class="font-semibold">{{ $t("Address") }}</td>
                <td>
                  <vs-input
                    name="Address"
                    v-model="CompanyModel.Address"
                    class="w-full"
                  />
                </td>
              </tr>
              <!-- State -->

              <tr>
                <td class="font-semibold">{{ $t("State") }}</td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[StateWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required|min:3'"
                    name="State"
                    v-model="CompanyModel.State"
                    @input="GetCityList(CompanyModel.State)"
                    :reduce="admin1Name_en => admin1Name_en.admin1Name_en"
                    :options="State"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />
                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('State')"
                    >{{ errors.first("State") }}</span
                  >
                </td>
              </tr>
              <!-- City -->
              <tr>
                <td class="font-semibold">{{ $t("City") }}</td>
                <td>
                  <v-select
                    :get-option-label="option => $t(option[CityWithLocale])"
                    class="mt-1 w-full p-0"
                    v-validate="'required|min:3'"
                    name="City"
                    v-model="CompanyModel.City"
                    :reduce="admin2Name_en => admin2Name_en.admin2Name_en"
                    :options="City"
                    :dir="$vs.rtl ? 'rtl' : 'ltr'"
                  />

                  <span
                    class="text-danger text-sm"
                    v-show="errors.has('City')"
                    >{{ errors.first("City") }}</span
                  >
                </td>
              </tr>

              <!-- ZipCode -->
              <tr>
                <td class="font-semibold">{{ $t("ZipCode") }}</td>
                <td style="width:242px">
                  <vs-input
                    name="ZipCode"
                    v-model="CompanyModel.ZibCode"
                    class=" w-full"
                  />
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-col w-full " id="account-manage-buttons">
            <div class="flex flex-wrap m-4">
              <!-- SaveChanges -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  :disabled="userInfo.AccountType == 'FAT2' || !validateForm"
                  icon-pack="feather"
                  @click="EditCompanyProfile"
                  class="mr-4 p-3"
                  icon="icon-edit"
                  >{{ $t("SaveChanges") }}</vs-button
                >
              </div>
              <!-- Back -->
              <div class="mb-2 mt-2 ">
                <vs-button
                  type="border"
                  color="warning"
                  icon-pack="feather"
                  @click="Back"
                  class="mr-4 p-3"
                >
                  {{ $t("Back") }}</vs-button
                >
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>
<script>
import moduleCompany from "@/store/company/moduleCompany.js";
import moduleGeneral from "@/store/General/moduleGeneral.js";

export default {
  data() {
    return {
      ID_Not_Found: false,
      item: {},
      company_data: {},
      CompanyModel: {
        CompanyId: "",
        CompanyName: "",
        PhoneNo: "",
        Email: "",
        TaxID: "",
        CommercialRegistrationID: "",
        Addres: "",
        City: "",
        State: "",
        ZibCode: ""
      },
      isValid: true,
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
      },
      userInfo: {}
    };
  },
  computed: {
    StateWithLocale() {
      let State = "admin1Name_en";
      if (this.$i18n.locale == "ar") {
        State = "admin1Name_ar";
      }
      return State;
    },
    CityWithLocale() {
      let City = "admin2Name_en";
      if (this.$i18n.locale == "ar") {
        City = "admin2Name_ar";
      }
      return City;
    },
    validateForm() {
      return (
        !this.errors.any() &&
        this.CompanyModel.CompanyName !== "" &&
        this.CompanyModel.PhoneNo != ""
      );
    },
    State() {
      return this.$store.state.General.State;
    },
    City() {
      return this.$store.state.General.City;
    }
  },
  methods: {
    GetCityList(State) {
      let model = {};
      model.StateName = State;
      this.$store.dispatch("General/GetCityList", model);
    },

    onInput({ number, isValid, country }) {
      this.bindProps.number = number;
      this.isValid = isValid;
      this.bindProps.country = country;
    },
    Back() {
      this.$router.go(-1);
    },
    EditCompanyProfile() {
      if (!this.validateForm) {
        window.showFillData();
        return;
      }
      this.$vs.loading();
      this.$store
        .dispatch("Company/editCompanyDetails", this.CompanyModel)
        .then(() => {
          this.$vs.loading.close();
          window.showSuccess();
          this.Back();
        })
        .catch(Error => {
          if (Error.status == 400) {
            window.showError();
          } else {
            window.showError();
          }
          this.$vs.loading.close();
        });
    },
    fetchData() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      window.userTypeNotAllowedToAccessCurrentPage(this.userInfo.AccountType);
      var company = {};
      company.CompanyId = this.$route.params.Id;

      this.$store
        .dispatch("Company/fetchCompanyDetails", company)
        .then(res => {
          this.company_data = res.data;
          if (this.company_data.State) {
            this.GetCityList(this.company_data.State);
          }
          this.CompanyModel.CompanyId = this.company_data.id;
          this.CompanyModel.CompanyName = this.company_data.CompanyName;
          this.CompanyModel.PhoneNo = this.company_data.PhoneNo;
          this.CompanyModel.Email = this.company_data.Email;
          this.CompanyModel.TaxID = this.company_data.TaxID;
          this.CompanyModel.CommercialRegistrationID = this.company_data.CommercialRegistrationID;
          this.CompanyModel.Address = this.company_data.Address;
          this.CompanyModel.City = this.company_data.City;
          this.CompanyModel.State = this.company_data.State;
          this.CompanyModel.ZibCode = this.company_data.ZibCode;
          this.$vs.loading.close();
        })
        .catch(err => {
          if (err.response.status === 404) {
            this.ID_Not_Found = true;
            return;
          }
          this.ID_Not_Found = true;
          this.$vs.loading.close();
        });
    }
  },
  created() {
    if (!moduleGeneral.isRegistered) {
      this.$store.registerModule("General", moduleGeneral);
      moduleGeneral.isRegistered = true;
    }
    debugger;
    // let item = {};
    this.item.CountryCode = "EG";
    this.$store.dispatch("General/GetStateList", this.item);

    if (!moduleCompany.isRegistered) {
      this.$store.registerModule("Company", moduleCompany);
      moduleCompany.isRegistered = true;
    }

    this.fetchData();
  }
};
</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}
#page-client-view {
  table {
    td {
      vertical-align: baseline !important;
      min-width: 140px;
      padding-bottom: 0.8rem;
      word-break: break-all;
    }
    &:not(.permissions-table) {
      td {
        @media screen and (max-width: 370px) {
          display: block;
        }
      }
    }
  }
}
@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
</style>
