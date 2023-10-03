import Header from "./components/Top.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Sidebar from "./components/Sidebar.js";
import Links from "./components/Links.js";
import LinkElement from "./components/LinkElement.js";
import LinkAdder from "./components/LinkAdder.js";
import Account from "./components/Account.js";
import Notifications from "./components/Notifications.js";

const app = Vue.createApp({
  data() {
    return {
      loggedin: null,
      notification: {
        text: "",
        visible: false,
        success: false,
        timeout: undefined,
      },
    };
  },
  template: `
        <notifications :notification="notification"></notifications>
        <login @notification="showNotification" :main="this" v-if="loggedin === false"></login>
        <dashboard @notification="showNotification" @logout="logout" :main="this" v-if="loggedin === true"></dashboard>
    `,
  methods: {
    logout() {
      this.loggedin = false;
      this.showNotification("Logout successful", true);
    },
    showNotification(text, success) {
      this.notification.text = text;
      this.notification.success = success;
      this.notification.visible = true;
      const that = this;
      clearTimeout(this.notification.timeout);
      this.notification.timeout = setTimeout(function () {
        that.notification.visible = false;
      }, 5000);
    },
  },
  mounted: function () {
    let that = this;
    let loggedinRequest = new XMLHttpRequest();
    loggedinRequest.open("GET", window.location.origin + "/api/auth/status");
    loggedinRequest.addEventListener("load", function (event) {
      let data = JSON.parse(loggedinRequest.responseText).data;
      that.loggedin = data[0].loggedin;
    });
    loggedinRequest.send();
  },
});

app.component("top", Header);
app.component("login", Login);
app.component("dashboard", Dashboard);
app.component("sidebar", Sidebar);
app.component("links", Links);
app.component("linkElement", LinkElement);
app.component("linkAdder", LinkAdder);
app.component("account", Account);
app.component("notifications", Notifications);

const mountedApp = app.mount("app");
