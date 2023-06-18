<template>
  <div class="flex w-full bg-img vx-row no-gutter justify-center">
    <div class="vx-col sm:w-1/2 md:w-1/2 lg:w-3/4 xl:w-3/5 sm:m-0 m-4">
      <br />
      <vx-card>
        <div slot="no-body" class="full-page-bg-color">
          <div class="vx-row no-gutter">
            <div
              class="vx-col hidden sm:hidden md:hidden lg:block lg:w-1/2 mx-auto self-center"
            >
              <img
                src="@/assets/images/pages/Biadjo Vectors_Fleet Signup.png"
                alt="register"
                class="mx-auto"
              />
            </div>
            <div
              class="vx-col sm:w-full md:w-full lg:w-1/2 mx-auto self-center  d-theme-dark-bg"
            >
              <div class="px-8 pt-6 register-tabs-container">
                <div class="vx-card__title">
                  <vs-button
                    type="border"
                    to="/user/login/login"
                    class="px-4 md:w-auto float-right mt-2"
                    >{{ $t("BackToLogin") }}</vs-button
                  >
                  <h4 class="mb-2">{{ $t("CreateAccount") }}</h4>
                  <p>{{ $t("CreateAccountTitle") }}</p>
                </div>
                <RegisterJWT></RegisterJWT>
                <br />
              </div>
            </div>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import RegisterJWT from "./RegisterJWT.vue";

export default {
  components: {
    RegisterJWT
  }
};
</script>

<style lang="scss">
.register-tabs-container {
  min-height: 577px;

  .con-tab {
    padding-bottom: 23px;
  }
}
</style>
