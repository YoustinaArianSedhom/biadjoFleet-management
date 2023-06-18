<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <vs-table ref="table" :data="docTypes">
      <template slot="thead">
        <vs-th sort-key="name">{{ $t("DocumentName") }}</vs-th>

        <vs-th>{{ $t("Actions") }}</vs-th>
      </template>

      <template slot-scope="{ data }">
        <tbody>
          <vs-tr :data="tr" :key="Key" v-for="(tr, Key) in data">
            <vs-td>
              <p class="product-name font-medium truncate">{{ $t(tr) }}</p>
            </vs-td>
            <vs-td>
              <span :key="Key" v-for="(tr1, Key) in AccountStatus">
                <span
                  v-if="(tr + 'Status' == Key) & (tr1 == 'DS2' || tr1 == 'DS3')"
                >
                  <vs-chip color="success">
                    <vs-avatar
                      color="success"
                      icon-pack="feather"
                      icon="icon-check"
                    />
                    Uploaded
                  </vs-chip>
                </span>
                <span
                  v-if="(tr + 'Status' == Key) & (tr1 == 'DS1' || tr1 == 'DS4')"
                >
                  <div class="btn-group mb-2 mt-2 ">
                    <input
                      type="file"
                      class="hidden"
                      ref="updateImgInput"
                      @change="updateCurrImg"
                      accept="image/*"
                    />
                    <vs-button
                      icon-pack="feather"
                      @click="$refs.updateImgInput[0].click()"
                      v-on:click="getDocumentType(tr)"
                      >{{ $t("UpdateImage") }}</vs-button
                    >
                  </div>
                </span>
              </span>
            </vs-td>
          </vs-tr>
        </tbody>
      </template>
    </vs-table>
    <div class="vx-col w-full " id="account-manage-buttons">
      <div class="flex flex-wrap m-4">
        <div class="btn-group mb-2 mt-2 ">
          <vs-button
            icon-pack="feather"
            class="mr-4"
            @click="UpdateDriverAccountStatus"
            :disabled="disable"
            icon="icon-users"
            >{{ $t("Submit") }}</vs-button
          >
        </div>

        <div class="btn-group mb-2 mt-2 ">
          <vs-button
            type="border"
            color="warning"
            icon-pack="feather"
            @click="Back"
            class="mr-4"
          >
            {{ $t("Back") }}</vs-button
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import moduleDriver from "@/store/driver/moduleDriver.js";
import FileEncryptionHandler from "@/http/requests/auth/jwt/FileEncryptionHandler.js";

export default {
  data() {
    return {
      Biadjo: {},
      disable: false,
      Model: {
        AccountStatus: "",
        PhoneNumber: ""
      },
      DocType: null,
      DriverData: {},
      docTypes: null,
      AccountStatus: {}
      // PersonalPictureStatus: "",
      // PersonalIDFrontStatus: "",
      // PersonalIDBackStatus: "",
      // PassportStatus: "",
      // DriverLicenseFrontStatus: "",
      // DriverLicensebackStatus: "",
      // CarRegistrationStatus: "",
      // CarRegistrationBackStatus: "",
      // LicensePlateFrontStatus: "",
      // LicensePlateBackStatus: "",
      // CarPictureStatus: "",
      // CarInsuranceDocStatus: "",
      // CargoInsuranceDocStatus: "",
      // BackgroundCheckStatus: "",
      // DrugTestStatus: ""
    };
  },
  components: {
    // check(){
    //
    //  let driver = {};
    // driver.DriverID = this.$route.params.Id;
    //
    // this.$store
    //   .dispatch("DriverList/GetDocTypeStatus", driver)
    //   .then(response => {
    //     this.AccountStatus = response.data[0];
    //     if(
    //     response.data[0].BackgroundCheckStatus != 'DS2' &&
    //       response.data[0].CarInsuranceDocStatus != 'DS2' &&
    //       response.data[0].CarPictureStatus != 'DS2' &&
    //       response.data[0].CarRegistrationBackStatus != 'DS2' &&
    //       response.data[0].CarRegistrationStatus != 'DS2' &&
    //       response.data[0].CargoInsuranceDocStatus != 'DS2' &&
    //       response.data[0].DriverLicenseFrontStatus != 'DS2' &&
    //       response.data[0].DriverLicensebackStatus != 'DS2' &&
    //       response.data[0].DrugTestStatus != 'DS2' &&
    //       response.data[0].LicensePlateBackStatus != 'DS2' &&
    //       response.data[0].LicensePlateFrontStatus != 'DS2' &&
    //       response.data[0].PassportStatus != 'DS2' &&
    //       response.data[0].PersonalIDBackStatus != 'DS2' &&
    //       response.data[0].PersonalIDFrontStatus != 'DS2' &&
    //       response.data[0].PersonalPictureStatus != 'DS2'){this.disable = true}
    //       else {this.disable = false }
    //   });}
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    getDocumentType(tr) {
      this.DocType = tr;
    },
    UpdateDriverAccountStatus() {
      this.$vs.loading();

      this.Model.AccountStatus = "AS6";
      this.$store
        .dispatch("DriverList/UpdateDriverAccountStatus", this.Model)
        .then(res => {
          if (res.status == 200) {
            window.showSuccess();
            this.$router.push({ name: "ViewDrivers" });
            this.$vs.loading.close();
          }
        })
        .catch(err => {
          window.showError();
          this.$vs.loading.close();
        });
    },
    async updateCurrImg(input) {
      this.DocType;
      this.$vs.loading();
      if (input.target.files && input.target.files[0]) {
        const file = event.target.files[0];
        var newFile = await FileEncryptionHandler.encrypt(file);
        this.$store
          .dispatch("DriverList/UploadDoc", {
            params: {
              DriverID: this.$route.params.Id,
              DocType: this.DocType,
              file: newFile
            }
          })
          .then(res => {
            if (res.status == 200) {
              this.$vs.loading.close();
              window.showSuccess();

              location.reload("/");
            }
            // this.company_data.CompanyLogo = res.data;
            this.$vs.loading.close();
          })
          .catch(() => {
            this.$vs.loading.close();
            window.showError();
          });
      }
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
      // this.DriverData = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/GitDocList")
        .then(response => {
          if (response.status === 200) {
            this.docTypes = response.data;
            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
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
      let driver = {};
      driver.DriverID = this.$route.params.Id;

      this.$store
        .dispatch("DriverList/GetDocTypeStatus", driver)
        .then(response => {
          this.AccountStatus = response.data[0];
          const values = Object.values(this.AccountStatus);
          for (let index = 0; index < values.length; index++) {
            if (values[index] == "DS2" || values[index] == "DS3") {
              this.disable = false;
            } else {
              this.disable = true;
              break;
            }
          }
        });
      let d = {};
      d.DriverId = this.$route.params.Id;
      this.$store.dispatch("DriverList/GetDriverById", d).then(response => {
        if (response.status == 200) {
          this.Model.PhoneNumber = response.data.PhoneNumber;
        }
      });
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  },
  mounted() {}
};
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {
    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
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
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
          }
          &.img-container {
            // width: 1rem;
            // background: #fff;

            span {
              display: flex;
              justify-content: flex-start;
            }

            .product-img {
              height: 110px;
            }
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
