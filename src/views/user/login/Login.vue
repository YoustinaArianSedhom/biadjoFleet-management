<!-- =========================================================================================
    File Name: Login.vue
    Description: Login Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div
    class="h-auto flex w-full bg-img vx-row no-gutter items-center justify-center"
    id="page-login"
  >
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0">
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter justify-center items-center">
            <div class="vx-col hidden lg:block lg:w-1/2">
              <img
                src="@/assets/images/pages/Biadjo Vectors_Login.png"
                alt="login"
                class="mx-auto"
              />
            </div>

            <div class="vx-col sm:w-full md:w-full lg:w-1/2 d-theme-dark-bg">
              <div class="px-8 pt-8 login-tabs-container">
                <div class="vx-card__title mb-4">
                  <h4 class="mb-4">{{ $t("Login") }}</h4>
                  <p>{{ $t("LoginTitle") }}</p>
                </div>
                <login-jwt></login-jwt>
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import LoginJwt from "./LoginJWT.vue";

export default {
  components: {
    LoginJwt
  }
};
</script>

<style lang="scss">
.login-tabs-container {
  min-height: 500px;
  .con-tab {
    padding-bottom: 14px;
  }
  .con-slot-tabs {
    margin-top: 1rem;
  }
}
</style>
