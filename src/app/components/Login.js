export default {
    props: {
        main: {}
    },
    data() {
        return {
            errorMsg: "",
            username: "",
            password: ""
        }
    },
    template: `
      <div id="container-login">
      <div class="card">
        <div class="card-header">
          Login
        </div>
        <div class="card-body">
          <div class="form-floating mb-3">
            <input @keyup.enter.native="login" v-model="username" type="text" class="form-control" id="username" placeholder="Username">
            <label for="username">Username</label>
          </div>
          <div class="form-floating mb-3">
            <input @keyup.enter.native="login" v-model="password" type="password" class="form-control" id="password" placeholder="Password">
            <label for="username">Password</label>
          </div>
          <p v-if="errorMsg" class="error-msg">{{errorMsg}}</p>
          <button @click="login" class="btn btn-success">Login</button>
        </div>
      </div>
      </div>
    `,
    methods: {
        login() {
            this.errorMsg = "";
            let that = this;

            if (this.username && this.password) {
                let request = new XMLHttpRequest();
                request.open("POST", window.location.origin + "/api/auth/login");
                let body = JSON.stringify({
                    "data": [
                        {
                            "username": this.username,
                            "password": this.password
                        }
                    ]
                });
                request.addEventListener("load", function (event) {
                    let data = JSON.parse(request.responseText).data;
                    if (data[0].status === "success") {
                        that.main.loggedin = true;
                        that.$emit("notification", "Login successful", true);
                    } else {
                        that.errorMsg = "The provided credentials are invalid!";
                    }
                });
                request.send(body);
            } else
                this.errorMsg = "Please fill out all fields!";
        }
    }
}