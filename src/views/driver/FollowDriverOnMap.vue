<template>
  <div>
    <vs-button
      class="mr-3 mb-2"
      @click="Back"
      type="border"
      color="warning"
      icon-pack="feather"
    >
      {{ $t("Back") }}
    </vs-button>
    <div type="text" ref="search" id="location"></div>
  </div>
</template>

<script>
import moduleDriver from "@/store/driver/moduleDriver.js";
/* eslint-disable */
export default {
  data() {
    return {
      location: null,
      Hidden: false,
      latitude: null,
      longitude: null,
      marker: new google.maps.Marker(),
      map: new google.maps.Map(document.getElementById("location"))
    };
  },
  mounted() {
    this.openLoading();
  },
  methods: {
    Back() {
      this.$router.go(-1);
    },
    openLoading() {
      this.$vs.loading();
      setTimeout(() => {
        this.$vs.loading.close();
      }, 2000);
    },
    initLocationSearch() {
      var lat = Number(this.latitude);
      var lng = Number(this.longitude);

      setTimeout(function() {
        this.map = new google.maps.Map(document.getElementById("location"), {
          zoom: 17,
          center: {
            lat: lat,
            lng: lng
          },
          backgroundColor: "#3B6077",
          // noClear: true,
          maxZoom: 20,
          minZoom: 5,
          mapTypeId: "roadmap" //satellite //hybrid //terrain
          //  mapTypeControlOptions: {
          //     style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
          //     mapTypeIds: ['roadmap', 'terrain']
          //   }
        });
        //	  The following example displays a 45° view of downtown Portland, OR:

        //   map.setTilt(45);

        this.marker = new google.maps.Marker({
          position: {
            lat: lat,
            lng: lng
          },
          map: this.map,
          title: "Driver Location",
          draggable: false,
          clickable: true,
          animation: google.maps.Animation.DROP, //BOUNCE
          // label: {
          //   color: "#3B6077",
          //   fontWeight: "900",
          //   text: "Driver Location",
          //   fontSize: "24px",
          //   fontFamily: "Cairo"
          // },
          visiable: true,
          icon: { url: require("@/assets/images/DriverMarker.png") }
        });
        var contentString =
          '<div id="content">' + "<p><b>Driver Location</b>" + "</div>";

        marker.info = new google.maps.InfoWindow({
          content: contentString
        });
        google.maps.event.addListener(marker, "click", function() {
          marker.info.open(map, marker);
        });
        google.maps.event.addListener(map, "click", function() {
          marker.info.close(map, marker);
        });
      }, 1000);
    },
    refreshDriverLocation() {
      var Driver = {};

      Driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/getDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            this.latitude = response.data.latitude;
            this.longitude = response.data.longitude;
          }
        });
    },
    SetMarker() {
      //Remove previous Marker.
      if (marker != null) {
        marker.setMap(null);
      }
      //Set Marker on Map.
      var myLatlng = new google.maps.LatLng(this.latitude, this.longitude);
      marker = new google.maps.Marker({
        position: myLatlng,
        map: this.map,
        // title: "Hi",
        icon: { url: require("@/assets/images/DriverMarker.png") }
      });
      marker.setMap(map);
      //Set Marker on Map.
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
      var Driver = {};

      Driver.DriverID = this.$route.params.Id;
      this.$store
        .dispatch("DriverList/getDriverLocation", Driver)
        .then(response => {
          if (response.status == 200) {
            this.latitude = response.data.latitude;
            this.longitude = response.data.longitude;
            // window.checkAndAttachMapScript(this.initLocationSearch);
            window.checkAndAttachMapScript();
            window
              .checkAndAttachMapScript()
              // .then(response => alert("coooooool"))
              .then(response => this.initLocationSearch());
            // .catch(error => alert("error to load google script"));
          }
        });
      this.interval = setInterval(
        () => this.refreshDriverLocation(),
        3000
      ).then((this.interval = setInterval(() => this.SetMarker(), 3000)));
    }
  },
  created() {
    if (!moduleDriver.isRegistered) {
      this.$store.registerModule("DriverList", moduleDriver);
      moduleDriver.isRegistered = true;
    }
    this.fetchData();
  },
  beforeDestroy() {
    location.reload("/");
  }
};
</script>
<style>
#location {
  width: 1000px;
  height: 500px;
  margin: auto;
}
.my-custom-class-for-label {
  width: 50px;
  height: 20px;

  border: 1px solid #eb3a44;
  border-radius: 5px;
  background: #fee1d7;
  text-align: center;
  line-height: 20px;
  font-weight: bold;
  font-size: 14px;
  color: #eb3a44;
}
</style>
