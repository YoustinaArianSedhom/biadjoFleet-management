<template>
  <div class="p-2">
    <vx-card class="mb-base p-2">
      <div class="vx-row">
        <vs-button
          icon-pack="feather"
          class="m-2"
          @click="confirmUpdateStatus"
          icon="icon-edit"
          v-if="!DisableUpdateStatus"
          >{{
            $t("UpdateStatus") + " " + $t("To") + " " + $t(nextBiadjoStatus())
          }}</vs-button
        >
        <vs-button
          icon-pack="feather"
          class="m-2"
          v-if="!disableAssignDriver"
          @click="GetDriverList"
          v-scroll-to="'#Scroll'"
          icon="icon-users"
          >{{ $t("AssignToDriver") }}</vs-button
        >
        <vs-button
          class=" m-2"
          @click="Back"
          type="border"
          color="warning"
          icon-pack="feather"
        >
          {{ $t("Back") }}
        </vs-button>
      </div>
      <vs-divider />
      <div class="vx-row">
        <div class="vx-col w-full sm:w-full md:w-2/3 lg:w-2/3 xl:w-2/3 ">
          <!-- First Row -->
          <div class="vx-row flex items-center justify-between pl-2">
            <table>
              <tr>
                <td>
                  <span>
                    {{ $t("BiadjoNumber") }} :
                    <span class="font-semibold">
                      {{ FormData.id }}
                    </span>
                  </span>
                </td>
              </tr>
            </table>

            <table class="vx-row flex items-center justify-between pr-50">
              <tr>
                <td>
                  <vs-chip color="primary"> {{ $t(FormData.Status) }}</vs-chip>
                </td>
              </tr>
            </table>
          </div>
          <!-- First Row END-->
          <!-- Second Row -->
          <div class="vx-row flex items-center justify-right pl-10">
            <table>
              <tr>
                <td>
                  <feather-icon
                    icon="CalendarIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top">
                    {{ $t("Schedual") }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold  ">
                  {{ FormData.Schedual | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
              <tr>
                <td>
                  <feather-icon
                    icon="TruckIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top"> {{ $t("VehicleType") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold ">
                  {{ $t(FormData.VehicleType) }}
                </td>
              </tr>
            </table>

            <table>
              <tr>
                <td>
                  <feather-icon
                    icon="ClockIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top">
                    {{ $t("TripDuration") }}
                  </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold  ">
                  {{ duration }}
                </td>
              </tr>
              <tr>
                <td>
                  <feather-icon
                    icon="MapPinIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top"> {{ $t("TripDistance") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold  ">
                  {{ distance }}
                </td>
              </tr>
            </table>
          </div>
          <!-- Second Row End-->
          <div
            v-if="FormData.NumberOfWorkers > 0"
            class="vx-row  ml-auto mr-auto"
          >
            <table>
              <tr>
                <td class=" mr-2 ml-4 mr-4 text-dark text-xl">
                  {{ $t("NumberOfWorkers") }} :
                </td>
                <td class="font-semibold text-xl mr-2 ml-2 pr-4 pl-4">
                  {{ FormData.NumberOfWorkers }}
                </td>
              </tr>
            </table>
          </div>
          <vs-divider />
          <!-- type & description -->
          <div class="vx-row flex items-center justify-right ">
            <table>
              <tr>
                <td class="font-semibold pr-10 pl-10">
                  <feather-icon
                    icon="PackageIcon"
                    class="IconsColor ml-1 mr-1"
                    svgClasses="w-8 h-8"
                  />
                  <span class="align-top">
                    {{ FormData.CargoType }}
                  </span>
                </td>
              </tr>
              <tr v-if="FormData.CargoDescription">
                <td class="font-semibold  pr-10 pl-10">
                  <pre
                    style="white-space:pre-line !important"
                    class="align-top text-sm"
                  >
                  {{ FormData.CargoDescription }}
                </pre
                  >
                </td>
              </tr>
            </table>
          </div>

          <div class="vx-row flex items-center justify-right pl-10">
            <table>
              <tr>
                <td>
                  {{ $t("CargoWeight") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold  ">
                  {{ FormData.CargoWeight | numFormat("###,##0.00") }}
                  {{ $t(FormData.CargoWeightUnit) }}
                </td>
              </tr>
            </table>

            <!-- rating -->
            <table>
              <tr>
                <td>
                  {{ $t("Rating") }}
                </td>
              </tr>
              <tr>
                <td class="font-semibold ">
                  <star-rating
                    v-model="FormData.Rating"
                    v-bind:max-rating="5"
                    inactive-color="gray"
                    active-color="orange"
                    v-bind:read-only="true"
                    v-bind:show-rating="false"
                    v-bind:round-start-rating="false"
                    v-bind:star-size="20"
                  >
                  </star-rating>
                </td>
              </tr>
            </table>

            <!-- CargoInsurance -->
          </div>

          <div
            v-if="selecting"
            class="vx-row flex items-center justify-right pl-10 "
          >
            <!-- PaymentMethod -->
            <table>
              <tr>
                <td class="pb-4">
                  {{ $t("PaymentMethod") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold  ">
                  {{ $t(FormData.PaymentMethod) }}
                </td>
              </tr>
            </table>

            <!-- Paymentstatus -->
            <table>
              <tr>
                <td>
                  <span class="align-top"> {{ $t("PaymentStatus") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold ">
                  {{ $t(FormData.PaymentStatus) }}
                </td>
              </tr>
            </table>

            <!-- amount -->
            <table>
              <tr>
                <td class="pb-4">
                  {{ $t("Amount") }}
                </td>
              </tr>

              <tr>
                <td class="font-semibold  ">
                  {{ FormData.Price | numFormat("###,##0.00") }}
                  {{ $t(FormData.CountryCode + "_Currency") }}
                </td>
              </tr>
            </table>

            <table v-if="FormData.Status == 'BS14'">
              <tr>
                <td>
                  <span class="align-top">{{ $t("ClosingDate") }} </span>
                </td>
              </tr>
              <tr>
                <td class="font-semibold">
                  {{ FormData.ClosingDate | formatDate("yyyy/MM/dd HH:mm") }}
                </td>
              </tr>
            </table>
          </div>

          <!-- driver -->
          <div class="ml-2 mr-2" v-if="FormData.DriverId">
            <vs-divider />
            <div class="vx-row">
              <table>
                <tr>
                  <td color="primary" class="font-semibold ">
                    <span class="text-xl text-primary">
                      {{ $t("DriverDetails") }}
                    </span>
                  </td>
                </tr>
              </table>
            </div>

            <div class="vx-row pl-10">
              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("DriverName") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    {{ driverData.firstName }} {{ driverData.lastName }}
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("PhoneNumber") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    <a
                      :href="`tel:${driverData.PhoneNumber}`"
                      :dir="$vs.rtl ? 'ltr' : 'ltr'"
                    >
                      {{ driverData.PhoneNumber }}</a
                    >
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("LicensePlate") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    {{ $t(driverData.LicensePlate) }}
                  </td>
                </tr>
              </table>
            </div>

            <div class="vx-row pl-10">
              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleMake") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    {{ $t(driverData.VehicleMake) }}
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleModel") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    {{ $t(driverData.VehicleModel) }}
                  </td>
                </tr>
              </table>

              <table>
                <tr>
                  <td class="pb-4">
                    {{ $t("VehicleColor") }}
                  </td>
                </tr>

                <tr>
                  <td class="font-semibold  ">
                    {{ $t(driverData.VehicleColor) }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>

        <!-- the right side -->
        <div class="vx-col w-full sm:w-full md:w-1/3 lg:w-1/3 xl:w-1/3 ">
          <div class="vx-row">
            <div class="vx-col ">
              <table>
                <tr>
                  <td>
                    <feather-icon
                      icon="CircleIcon"
                      class="IconsColor ml-1 mr-1"
                      svgClasses="w-4 h-4"
                    />
                    <span class="align-top">{{ $t("StartAddress") }} </span>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold  break-normal">
                    {{ FormData.StPlaceDesicription }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <vs-divider position="right">
                      <feather-icon
                        icon="XIcon"
                        class="IconsColor"
                        svgClasses="w-4 h-4"
                      />
                      <span class="align-top">
                        {{ $t(FormData.NumberOfTrips) }}
                        {{ $t("Trips") }}
                      </span>
                    </vs-divider>
                  </td>
                </tr>
                <div v-if="FormData.Stops">
                  <div v-for="(item, index) in FormData.Stops" :key="index">
                    <tr>
                      <td>
                        <feather-icon
                          icon="CircleIcon"
                          class="IconsColor ml-1 mr-1"
                          svgClasses="w-2 h-2"
                        />
                        <span class="align-top  text-danger"
                          >{{ $t("TripNo") }} {{ index + 1 }}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td class="font-semibold break-normal">
                        {{ item.PlaceDescription }}
                      </td>
                    </tr>
                  </div>
                </div>
                <tr>
                  <td>
                    <feather-icon
                      icon="CircleIcon"
                      class="IconsColor ml-1 mr-1"
                      svgClasses="w-4 h-4"
                    />
                    <span class="align-top">{{ $t("EndAddress") }} </span>
                  </td>
                </tr>
                <tr>
                  <td class="font-semibold  break-normal">
                    {{ FormData.EnPlaceDesicription }}
                  </td>
                </tr>

                <!-- divider -->
              </table>
            </div>
          </div>
        </div>
      </div>
    </vx-card>

    <div class="w-full" id="Scroll">
      <vx-card v-if="DriversList.length > 0">
        <div id="data-list-list-view" class="data-list-container">
          <vs-table
            ref="table"
            :data="DriversList"
            pagination
            :max-items="itemsPerPage"
          >
            <template slot="thead">
              <vs-th sort-key="first Name">{{ $t("FullName") }}</vs-th>
              <vs-th sort-key="Phone Number">{{ $t("PhoneNumber") }}</vs-th>
              <vs-th sort-key="Country">{{ $t("Country") }}</vs-th>
              <vs-th sort-key="Driver Balance">{{ $t("DriverBalance") }}</vs-th>
              <vs-th sort-key="Account Status">{{ $t("AccountStatus") }}</vs-th>

              <vs-th>{{ $t("Actions") }}</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td>
                    <p class="product-name font-medium truncate">
                      {{ tr.firstName }} {{ tr.lastName }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      <span :dir="$vs.rtl ? 'ltr' : 'ltr'">
                        {{ tr.UserName }}
                      </span>
                    </p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">{{ tr.country }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      {{ tr.DriverBalance | numFormat("###,##0.00") }}
                      {{ $t(tr.countrycode + "_Currency") }}
                    </p>
                  </vs-td>
                  <vs-td>
                    <vs-chip
                      :color="getOrderStatusColor(tr.AccountStatus)"
                      class="AccountStatus"
                      v-if="tr.AccountStatus"
                    >
                      {{ $t(tr.AccountStatus) }}
                    </vs-chip>
                  </vs-td>

                  <vs-td class="whitespace-no-wrap">
                    <vs-button
                      class="text-lg"
                      size="small"
                      :disabled="disableAssignDriver"
                      @click="confirmAssignBiadjoToDriver(tr.Id)"
                    >
                      {{ $t("Select") }}
                    </vs-button>
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
/* eslint-disable */
import moduleBiadjo from "@/store/biadjo/moduleBiadjo.js";
import moduleDriver from "@/store/driver/moduleDriver.js";

import StarRating from "vue-star-rating";

export default {
  data() {
    return {
      Stops: [],

      selecting: false,
      driverData: {},
      FormData: {
        VehicleType: "",
        VehicleOption: "",
        NumberOfTrips: "",
        Height: "",
        Length: "",
        StLongitude: "",
        StLatitude: "",
        StPlaceId: "",
        StartCity: "",
        StartCountry: "",
        StartCountryCode: "",
        StartState: "",
        StPlaceDesicription: "",
        EnLongitude: "",
        EnLatitude: "",
        EnPlaceId: "",
        EndCountry: "",
        EndCountryCode: "",
        EndCity: "",
        EndState: "",
        EnPlaceDesicription: "",
        PaymentStatus: ""
      },
      DriversList: [],
      distance: "",
      duration: "",
      driverID: "",
      Biadjo_not_found: false,
      disableAssignDriver: false,
      itemsPerPage: 10,
      DisableUpdateStatus: false,
      MapFullLoaded: false,
      Model2: {
        DriverId: "",
        Offer: "",
        UserId: "",
        BiadjoId: ""
      },

      disable: false,
      CompaneyId: "",
      StartLink: "https://maps.google.com/maps?q=@",
      EndLink: "&17z",
      Model: {
        CountryCode: "",
        StartLatitude: "",
        StartLongitude: "",
        VehicleType: "",
        VehicleOption: ""
      },

      BiadjoFees: {
        CountryCodeOfBiadjo: "",
        BiadjoStatus: "",
        BiadjoPrice: "",
        BiadjoID: null
      }
    };
  },
  components: {
    StarRating
  },
  computed: {},
  methods: {
    getOrderStatusColor(status) {
      if (status == "AS1") {
        return "success";
      }
      if (status == "AS2") {
        return "danger";
      }
      if (status == "AS3") {
        return "warning";
      }
      return "primary";
    },
    GetDriverList() {
      this.$vs.loading();
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.CompaneyId = this.userInfo.CompaneyId;
      var Obj = {};
      // Obj.CompanyId = this.userInfo.CompaneyId;
      Obj.CompanyId = this.CompaneyId;
      Obj.VehicleType = this.FormData.VehicleType;
      Obj.BiadjoID = this.FormData.id;

      if (this.FormData.VehicleOption) {
        Obj.VehicleOption = this.FormData.VehicleOption;
      } else {
        Obj.VehicleOption = "";
      }

      this.$store
        .dispatch("BiadjoList/GetDriversListForBiadjoinCompany", Obj)
        .then(response => {
          if (response.data.length > 0) {
            this.$vs.loading.close();
            this.DriversList = response.data;
          } else {
            this.$vs.loading.close();

            window.showNoDrivers();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },
    confirmUpdateStatus() {
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text:
          this.$t("YouAreAboutToUpdateBiadjoStatus") +
          " " +
          this.$t(this.nextBiadjoStatus()) +
          this.$t("QMark"),
        cancelText: this.$t("Cancel"),
        accept: this.UpdateBiadjoStatus,
        acceptText: this.$t("Save")
      });
    },
    Back() {
      this.$router.go(-1);
    },

    fetchDistance(origin, dest) {
      return new Promise(async (resolve, reject) => {
        let response;
        let origin1 = origin;
        let destinationA = dest;
        const waypts = [];
        var DirectionsService = new google.maps.DirectionsService();
        if (this.Stops.length > 0) {
          for (let i = 0; i < this.Stops.length; i++) {
            waypts.push({
              location: new google.maps.LatLng(
                this.Stops[i].Latitude,
                this.Stops[i].Longitude
              ),
              stopover: true
            });
          }

          DirectionsService.route(
            {
              origin: await {
                lat: Number(origin.lat),
                lng: Number(origin.lng)
              },
              destination: await {
                lat: Number(dest.lat),
                lng: Number(dest.lng)
              },
              // avoidHighways: false,
              // avoidTolls: false,
              waypoints: waypts,
              optimizeWaypoints: true,
              // drivingOptions: {
              //   departureTime: new Date(Date.now() + 1000), // for the time N milliseconds from now.
              //   trafficModel: "optimistic"
              // },
              unitSystem: google.maps.UnitSystem.METRIC,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
            },
            (response, status) => {
              if (status === "OK") {
                this.distance = 0;
                this.duration = 0;
                var myroute = response.routes[0];
                for (let i = 0; i < myroute.legs.length; i++) {
                  this.distance += myroute.legs[i].distance.value;
                  this.duration += myroute.legs[i].duration.value;
                }
                var num = this.duration / 60;
                var hours = num / 60;
                var rhours = Math.floor(hours);
                var minutes = (hours - rhours) * 60;
                var rminutes = Math.round(minutes);
                let X;
                if (rhours > 0) {
                  X =
                    rhours +
                    " " +
                    this.$t("Hour") +
                    " " +
                    rminutes +
                    " " +
                    this.$t("Minute");
                } else {
                  X = rminutes + " " + this.$t("Minute");
                }
                this.duration = X;
                this.distance = this.distance / 1000 + " " + this.$t("KM");
              }
            }
          );
        } else {
          var service = new google.maps.DistanceMatrixService();
          service.getDistanceMatrix(
            {
              origins: await [origin1],
              destinations: await [destinationA],
              travelMode: "DRIVING",
              unitSystem: google.maps.UnitSystem.METRIC,
              avoidHighways: false,
              avoidTolls: false
            },
            (resp, status) => {
              if (status !== google.maps.DistanceMatrixStatus.OK) {
                response = reject(status);
                this.distance = "";
                this.duration = "";
              } else {
                response = resolve(resp);
                this.distance = resp.rows[0].elements[0].distance.text;
                this.duration = resp.rows[0].elements[0].duration.text;
              }
            }
          );
        }
      });
      return response;
    },

    nextBiadjoStatus() {
      switch (this.FormData.Status) {
        case "BS4":
          return "BS5";
        case "BS5":
          return "BS6";
        case "BS6":
          return "BS7";
        case "BS7":
          return "BS8";
        case "BS8":
          return "BS9";
        case "BS9":
          return "BS10";
        default:
          return "BS11";
      }
    },
    confirmAssignBiadjoToDriver(driverID) {
      this.driverID = driverID;
      this.$vs.dialog({
        type: "confirm",
        color: "#27ABBE",
        title: this.$t("ConfirmChange"),
        text: this.$t("YouAreAboutToAssignBiadjoToDriver"),
        accept: this.AssignBiadjoToDriver,
        acceptText: this.$t("Save"),
        cancelText: this.$t("Cancel")
      });
    },
    UpdateBiadjoStatus() {
      var BiadjoStatus = {};
      BiadjoStatus.BiadjoID = this.FormData.id;

      switch (this.FormData.Status) {
        case "BS4":
          BiadjoStatus.Status = "BS5";
          break;
        case "BS5":
          BiadjoStatus.Status = "BS6";
          break;
        case "BS6":
          BiadjoStatus.Status = "BS7";
          break;
        case "BS7":
          BiadjoStatus.Status = "BS8";
          break;
        case "BS8":
          BiadjoStatus.Status = "BS9";
          break;
        case "BS9":
          BiadjoStatus.Status = "BS10";
          break;
        case "BS10":
          BiadjoStatus.Status = "BS11";
          break;
        default:
          BiadjoStatus.Status = "";
          break;
      }
      if (BiadjoStatus.Status != "") {
        this.$vs.loading();
        this.$store
          .dispatch("BiadjoList/UpdateBiadjoStatus", BiadjoStatus)
          .then(response => {
            this.$vs.loading.close();
            this.GetBiadjo();
            window.showSuccess();
          })
          .catch(() => {
            this.$vs.loading.close();
            this.GetBiadjo();
            window.showError();
          });
      }
    },
    async GetBiadjo() {
      this.$vs.loading();
      var Biadjo = {};
      Biadjo.BiadjoID = this.$route.params.Id;

      this.$store
        .dispatch("BiadjoList/GetBiadjoByid", Biadjo)
        .then(async response => {
          if (response.data) {
            if (response.data.Stops) {
              if (response.data.Stops.length > 0) {
                for (let i = 0; i < response.data.Stops.length; i++) {
                  const element = response.data.Stops[i];
                  let LatLngObj = {};
                  LatLngObj.Latitude = element.Latitude;
                  LatLngObj.Longitude = element.Longitude;
                  this.Stops.push(LatLngObj);
                }
              }
            }
            window.AllowToAccessCurrentBiadjo(response.data.FleetCompanyId);
            this.FormData = await response.data;
            // ====================
            if (
              response.data.Status != "BS1" ||
              response.data.Status != "BS2" ||
              response.data.Status != "BS3"
            ) {
              this.selecting = true;
            }
            // =====================
            if (response.data.DriverId) {
              this.GetDriver(response.data.DriverId);
            }
            if (
              this.FormData.StLongitude != 0 &&
              this.FormData.StLatitude != 0 &&
              this.FormData.EnLongitude != 0 &&
              this.FormData.EnLatitude != 0
            ) {
              let orgin = {
                lat: this.FormData.StLatitude,
                lng: this.FormData.StLongitude
              };
              let dest = {
                lat: this.FormData.EnLatitude,
                lng: this.FormData.EnLongitude
              };
              window
                .checkAndAttachMapScript()
                .then(response => this.fetchDistance(orgin, dest));
            }
            if (
              this.FormData.Status == "BS4" ||
              this.FormData.Status == "BS5" ||
              this.FormData.Status == "BS6" ||
              this.FormData.Status == "BS7" ||
              this.FormData.Status == "BS8" ||
              this.FormData.Status == "BS9" ||
              this.FormData.Status == "BS10"
            ) {
              this.disableAssignDriver = false;
              this.DisableUpdateStatus = false;
            } else {
              this.DisableUpdateStatus = true;
              this.disableAssignDriver = true;
            }

            this.$vs.loading.close();
          } else {
            this.$vs.loading.close();
            this.Biadjo_not_found = true;
            window.showError();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          this.Biadjo_not_found = true;
          window.showError();
        });
    },

    AssignBiadjoToDriver() {
      this.$vs.loading();
      var Obj = {};
      Obj.BiadjoId = this.FormData.id;
      Obj.DriverId = this.driverID;

      this.$store
        .dispatch("BiadjoList/AssignDriverToBiadjo", Obj)
        .then(response => {
          if (response.data == 1) {
            this.GetBiadjo();
            this.DriversList = [];
            this.$vs.loading.close();
            window.showSuccessfulyAssignedToDriver();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          window.showError();
        });
    },

    GetDriver(DriverId) {
      this.$vs.loading();
      let driver = {};
      driver.DriverId = DriverId;
      this.$store
        .dispatch("DriverList/GetDriverById", driver)
        .then(response => {
          if (response.status == 200) {
            this.driverData = response.data;
            this.$vs.loading.close();
          }
        })
        .catch(() => {
          this.$vs.loading.close();
          return;
        });
    }
  },
  created() {
    if (!moduleBiadjo.isRegistered) {
      this.$store.registerModule("BiadjoList", moduleBiadjo);
      moduleBiadjo.isRegistered = true;
    }
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.GetBiadjo();
  }
  // async mounted() {
  //   await window.checkAndAttachMapScript(this.fetchDistance);
  // }
};
</script>

<style lang="scss">
.IconsColor {
  color: #27abbe;
}
#avatar-col {
  width: 10rem;
}
table {
  td {
    vertical-align: top;
    min-width: 150px;
    padding-bottom: 10px !important;
    word-break: break-all;
  }
  tr {
    min-height: 38px;
    height: 38px;
  }

  &:not(.permissions-table) {
    td {
      @media screen and (max-width: 370px) {
        display: block;
      }
    }
  }
}

#page-user-list {
  .user-list-filters {
    height: 10px;

    .vs__actions {
      position: absolute;
      right: 0;
      top: 20%;
      height: 100px;
      transform: translateY(-58%);
    }
  }
}

#instant-search-demo {
  .header {
    .filters-label {
      width: calc(260px + 2.4rem);
    }
  }

  #content-container {
    .vs-sidebar {
      position: relative;
      float: left;
    }
  }

  .search-input-right-aligned-icon {
    padding: 1rem 1.5rem;
  }

  .price-slider {
    max-width: 80%;
  }

  .item-view-primary-action-btn {
    color: #2c2c2c !important;
    background-color: #f6f6f6;
    min-width: 50%;
  }

  .item-view-secondary-action-btn {
    min-width: 50%;
  }
}

.theme-dark {
  #instant-search-demo {
    #content-container {
      .vs-sidebar {
        background-color: #10163a;
      }
    }
  }
}

.autocomplete {
  position: relative;
  width: 100%;
}

.autocomplete-results {
  padding: 0;
  margin: 0;
  border: 1px solid #eeeeee;
  height: 120px;
  overflow: auto;
  width: 100%;
}

.autocomplete-result {
  list-style: none;
  text-align: left;
  padding: 4px 2px;
  cursor: pointer;
}

.autocomplete-result.is-active,
.autocomplete-result:hover {
  background-color: #4aae9b;
  color: white;
}

@media (min-width: 992px) {
  .vs-sidebar-rounded {
    .vs-sidebar {
      border-radius: 0.5rem;
    }

    .vs-sidebar--items {
      border-radius: 0.5rem;
    }
  }
}

@media (max-width: 992px) {
  #content-container {
    .vs-sidebar {
      position: fixed !important;
      float: left !important;
    }
  }
}

.grid-view-item {
  // height: 450px;

  .grid-view-img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    transition: 0.35s;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.25);

    .grid-view-img {
      opacity: 0.9;
    }
  }

  button.page-link {
    display: inline-block;
  }

  button.page-link {
    font-size: 20px;
    color: #29b3ed;
    font-weight: 500;
  }

  .offset {
    width: 500px !important;
    margin: 20px auto;
  }
}

@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }
}
.login-tabs-container {
  min-height: 495px;

  .con-tab {
    padding-bottom: 14px;
  }

  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
