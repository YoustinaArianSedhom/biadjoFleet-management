/*=========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
export default [
  {
    url: "/",
    name: "Home",
    slug: "home",
    show: JSON.parse(localStorage.getItem("userInfo")).AccountType,
    icon: "HomeIcon",
    i18n: "Home"
  },
  {
    url: null,
    name: "Drivers",
    slug: "Drivers",
    icon: "TruckIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).AccountType,
    i18n: "Drivers",
    submenu: [
      {
        url: "/ViewDrivers",
        name: "ViewDrivers",
        slug: "ViewDrivers",
        i18n: "ViewDrivers"
      },
      {
        url: "/AddDriver",
        name: "AddDriver",
        slug: "AddDriver",
        i18n: "AddDriver"
      }
    ]
  },

  {
    url: null,
    name: "Biadjo",
    tagColor: "primary",
    icon: "ActivityIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).AccountType,
    i18n: "Biadjo",
    submenu: [
      {
        url: "/CompanySubmittedOrder",
        name: "Biadjo Request",
        slug: "BiadjoRequest",
        icon: "ClipboardIcon",
        i18n: "BiadjoRequest"
      },

      {
        url: "/ScheduledBiadjosForCompany",
        name: "ScheduledBiadjosForCompany",
        slug: "ScheduledBiadjosForCompany",
        icon: "ClipboardIcon",
        i18n: "ScheduledBiadjosForCompany"
      },
      {
        url: "/CompanyBiadjosHistory",
        name: "Company Biadjos History",
        slug: "CompanyBiadjosHistory",
        icon: "ClipboardIcon",
        i18n: "History"
      }
    ]
  },
  {
    url: "/CompanyWallet",
    name: "Company Wallet",
    slug: "CompanyWallet",
    icon: "DollarSignIcon",
    show:
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT1" ||
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT0",
    i18n: "Wallet"
  },
  {
    url: null,
    name: "Company Users",
    tagColor: "primary",
    icon: "UsersIcon",
    i18n: "CompanyUsers",
    show:
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT1" ||
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT0",

    submenu: [
      {
        url: "/company/CompanyUsers",
        name: "CompanyUsers",
        slug: "ViewUsers",
        show:
          JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT1" ||
          JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT0",

        icon: "MenuIcon",
        i18n: "ViewUsers"
      },
      {
        url: "/company/CompanyUserRegister",
        name: "CompanyUserRegister",
        show:
          JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT1" ||
          JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT0",

        slug: "AddUser",
        icon: "UsersIcon",
        i18n: "AddUser"
      }
    ]
  },
  {
    url: "/company/CompanyProfile",
    name: "CompanyProfile",
    slug: "CompanyProfile",
    show:
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT1" ||
      JSON.parse(localStorage.getItem("userInfo")).AccountType == "FAT0",

    icon: "FileTextIcon",
    i18n: "CompanyProfile"
  },
  {
    url: "/general/ContactUs",
    name: "ContactUs",
    slug: "ContactUs",
    icon: "MailIcon",
    show: JSON.parse(localStorage.getItem("userInfo")).AccountType,
    i18n: "ContactUs"
  }
];
