export default {
  props: {},
  data() {
    return {
      username: "",
      password: "",
      status: "",
    };
  },
  template: `
      <h1>Account</h1>
      <p>Change the username and password of the account.</p>
      <div class="form-floating mb-3">
      <input v-model="username" type="text" class="form-control" id="floatingInput" placeholder="Username">
      <label for="floatingInput">Username</label>
      </div>
      <div class="form-floating">
      <input v-model="password" type="password" class="form-control" id="floatingPassword" placeholder="Password">
      <label for="floatingPassword">New password</label>
      <br>
      <button @click="save" class="btn btn-success">Save</button>
      <p style="color: var(--bs-success); margin-top: 1rem">{{status}}</p>
      </div>
    `,
  methods: {
    save() {
      let data = {
        data: [
          {
            username: this.username,
            password: this.password,
          },
        ],
      };

      const that = this;

      const request = new XMLHttpRequest();
      request.open("PUT", window.location.origin + "/api/auth/credentials");
      request.addEventListener("load", function () {
        if (request.status === 200) {
          let data = JSON.parse(request.responseText).data[0];
          if (data.status === "success") {
            that.status = "Credentials saved successfully!";
            that.password = "";
            that.$emit(
              "notification",
              "Credentials updated successfully!",
              true
            );
          } else {
            that.$emit(
              "notification",
              "An error occurred while updating the credentials! Try again!",
              false
            );
          }
        }
      });
      request.send(JSON.stringify(data));
    },
  },
  mounted: function () {
    const that = this;
    let request = new XMLHttpRequest();
    request.open("GET", window.location.origin + "/api/auth/info");
    request.addEventListener("load", function () {
      if (request.status === 200) {
        let data = JSON.parse(request.responseText).data[0];
        that.username = data.username;
      } else {
        that.$emit(
          "notification",
          "An error occurred while fetching data! Try again!",
          false
        );
      }
    });
    request.send();
  },
};
