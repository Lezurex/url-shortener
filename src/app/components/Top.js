export default {
    props: {
        username: String,
    },
    template: `
      <header>
          <div><b>{{hostname}} URL-Shortener</b></div>
          <div>
            <button @click="logout" class="btn btn-danger">Logout</button>
          </div>
      </header>
    `,
    methods: {
        logout() {
            let that = this;
            let request = new XMLHttpRequest();
            request.open("POST", window.location.origin + "/api/auth/logout");
            request.addEventListener("load", function () {
                if (JSON.parse(request.responseText).data[0].status === "success") {
                    that.$emit("logout");
                }
            });
            request.send();
        }
    },
    computed: {
        hostname() {
            return window.location.hostname;
        }
    }
}