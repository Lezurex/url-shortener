import Header from "./components/Top.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";
import Sidebar from "./components/Sidebar.js";
import Links from "./components/Links.js";
import LinkElement from "./components/LinkElement.js";
import LinkAdder from "./components/LinkAdder.js";

const app = Vue.createApp({
    data() {
        return {
            loggedin: null
        }
    },
    template: `
      
        <login :main="this" v-if="loggedin === false"></login>
        <dashboard @logout="loggedin = false" :main="this" v-if="loggedin === true"></dashboard>
    `,
    methods: {

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
    }
});

app.component("top", Header);
app.component("login", Login);
app.component("dashboard", Dashboard);
app.component("sidebar", Sidebar);
app.component("links", Links);
app.component("linkElement", LinkElement);
app.component("linkAdder", LinkAdder);

const mountedApp = app.mount("app");