import Vue from "vue";
import { AclInstaller, AclCreate, AclRule } from "vue-acl";
import router from "./../router";
Vue.use(AclInstaller);

let initialRole = "Anonymous";
let userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo && userInfo.AccountType) {
  initialRole = userInfo.AccountType;
}

export default new AclCreate({
  initial: initialRole,
  notfound: "/pages/Error404",
  router,
  acceptLocalRules: true,
  globalRules: {
    Owner: new AclRule("Owner")
      .or("FAT0")
      .or("FAT1")
      .generate(),
    Anonymous: new AclRule("Anonymous")
      .or("FAT0")
      .or("FAT1")
      .or("FAT2")
      .generate()
  }
});
