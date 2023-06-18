<!-- =========================================================================================
    File Name: Error404.vue
    Description: 404 Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="flex w-full bg-img">
    <div
      class="vx-col flex items-center justify-center flex-col sm:w-1/2 md:w-3/5 lg:w-3/4 xl:w-1/2 mx-auto text-center"
    >
      <!-- <img src="@/assets/images/pages/404.png" alt="graphic-404" class="mx-auto mb-4 max-w-full"> -->

      <lottie-player
        src="https://assets9.lottiefiles.com/packages/lf20_830fdC.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px;"
        loop
        autoplay
      ></lottie-player>
      <vs-button size="large" to="/">{{ $t("BackToHome") }}</vs-button>
    </div>
  </div>
</template>
<script>
/*eslint-disable */
export default {
  data() {
    return {
      db: null,
      request: null,
      cats: null
    };
  },
  // async created() {
  //   debugger;
  //   this.db = await this.getDb();
  //   debugger;

  //   this.cats = await this.getCatsFromDb();
  // },
  // methods: {
  //   getDb() {
  //     return new Promise((resolve, reject) => {
  //       let request = window.indexedDB.open("the_name", 2);
  //       request.onerror = e => {
  //         console.log("Error opening db", e);
  //         reject("Error");
  //       };

  //       request.onsuccess = e => {
  //         resolve(e.target.result);
  //       };
  //       request.onupgradeneeded = e => {
  //         console.log("onupgradeneeded");
  //         let db = e.target.result;
  //       };
  //     });
  //   },
  //   CCC() {
  //     return new Promise((resolve, reject) => {
  //       debugger;
  //       let trans = this.db.transaction(["customers"], "readonly");
  //       trans.oncomplete = e => {
  //         resolve(cats);
  //       };

  //       let store = trans.objectStore("customers");
  //       let cats = [];

  //       store.openCursor().onsuccess = e => {
  //         let cursor = e.target.result;
  //         if (cursor) {
  //           cats.push(cursor.value);
  //           cursor.continue();
  //         }
  //       };
  //     });
  //   }
  // },
  mounted() {
    let recaptchaScript = document.createElement("script");
    recaptchaScript.setAttribute(
      "src",
      "https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    );
    document.head.appendChild(recaptchaScript);
  }
};
</script>
