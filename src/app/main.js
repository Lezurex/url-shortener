import Header from "./components/Top.js";
import Login from "./components/Login.js";
import Dashboard from "./components/Dashboard.js";

const app = Vue.createApp({
    data() {
        return {
            loggedin: null
        }
    },
    template: `
        <login :main="this" v-if="loggedin === false"></login>
        <dashboard :main="this" v-if="loggedin === true"></dashboard>
        
    `,
    methods: {},
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

const mountedApp = app.mount("app");