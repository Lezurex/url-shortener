import Link from "../objects/Link.js";

export default {
  props: {
    allLinks: {},
    link: Link,
  },
  data() {
    return {
      expanded: false,
      errorMsg: "",
      deleteConfirm: false,
      deleteText: "Delete",
    };
  },
  template: `
      <li class="card">
      <div class="card-header">
        <div class="link-element-header-container">
          <div>
            <a target="_blank" :href="link.getShortURL()">{{ link.getShortURL() }}</a>
            <input class="copy-box" :id="link.uuid + '-shortInput'" :value="link.getShortURL()" type="text">
            &rarr;
            <a :href="link.link">{{ link.link }}</a>
          </div>
          <div>
            <button @click="copyShort" class="btn btn-secondary">Copy</button>
            <button @click="toggleExpand" class="btn btn-primary">{{ expanded ? "&uarr;" : "&darr;" }}</button>
          </div>
        </div>
      </div>
      <div v-if="expanded" class="card-body">
        <label :for="link.uuid + '-shortened'" class="form-label">Shortened URL</label>
        <div class="input-group mb-3">
          <span class="input-group-text">{{ getWindowOrigin() + "/" }}</span>
          <input @change="checkValues" @keyup="checkValues" v-model="link.short" type="text" class="form-control"
                 :id="link.uuid + '-shortened'">
          <button @click="randomShort" class="btn btn-outline-secondary" type="button" id="button-addon2">↻
          </button>
        </div>
        <div class="mb-3">
          <label :for="link.uuid + '-shortened'" class="form-label">Target URL</label>
          <input autocomplete="off" @change="checkValues" @keyup="checkValues" v-model="link.link"
                 placeholder="https://" type="url" class="form-control" :id="link.uuid + '-link'">
        </div>
        <div class="form-check form-switch">
          <input v-model="link.noPreview" class="form-check-input" type="checkbox" :id="link.uuid + '-noPreview'">
          <label class="form-check-label" :for="link.uuid + '-noPreview'" data-bs-toggle="tooltip" data-bs-placement="top" title="When sent in a chat app like Discord or WhatsApp, there will be no preview.">Rickroll mode</label>
        </div>
        
        <p class="error-msg" v-html="errorMsg"></p>
        <div class="d-flex flex-row-reverse">

        </div>
        <button @click="deleteLink" style="margin-right: 1rem" class="btn btn-danger">{{deleteText}}</button>
        <button @click="save" :id="link.uuid + '-save'" class="btn btn-success">Save</button>
        <hr>
        <b>Statistics</b>
        <ul>
          <li>Clicks: {{ link.statistics.clicks }}</li>
        </ul>
      </div>
      </li>
    `,
  methods: {
    getWindowOrigin() {
      return window.location.origin;
    },
    checkValues() {
      this.errorMsg = "";
      const shortInput = document.getElementById(this.link.uuid + "-shortened");
      const linkInput = document.getElementById(this.link.uuid + "-link");
      const button = document.getElementById(this.link.uuid + "-save");

      shortInput.classList.remove("is-invalid");
      linkInput.classList.remove("is-invalid");
      button.removeAttribute("disabled");

      if (this.link.short) {
        for (const key in this.allLinks) {
          let enumLink = this.allLinks[key];
          if (enumLink.uuid !== this.link.uuid) {
            if (enumLink.short === this.link.short) {
              shortInput.classList.add("is-invalid");
              this.errorMsg += "<p>This short link does already exist!</p>";
              break;
            }
          }
        }
      } else {
        shortInput.classList.add("is-invalid");
        this.errorMsg += "<p>The short link may not be empty!</p>";
      }

      if (this.link.short.length < 4) {
        shortInput.classList.add("is-invalid");
        this.errorMsg +=
          "<p>The short link may have more than 4 characters!</p>";
      }

      if (!this.onlyLettersAndNums(this.link.short)) {
        shortInput.classList.add("is-invalid");
        this.errorMsg +=
          "<p>The short link may only contain letters (A-Z, a-z) and numbers (0-9)!</p>";
      }

      if (!this.validURL(this.link.link)) {
        linkInput.classList.add("is-invalid");
        this.errorMsg += "<p>This is not a valid URL!</p>";
      }

      if (this.link.link.includes(window.location.origin)) {
        linkInput.classList.add("is-invalid");
        this.errorMsg += "<p>You cannot shorten an already shortened link!</p>";
      }
      if (this.errorMsg !== "") {
        button.setAttribute("disabled", "disabled");
      }

      return this.errorMsg === "";
    },
    save() {
      if (!this.checkValues()) return;
      let saveRequest = new XMLHttpRequest();
      saveRequest.open(
        "PUT",
        window.location.origin + "/api/links/" + this.link.uuid
      );
      const that = this;
      saveRequest.addEventListener("load", function () {
        if (saveRequest.status === 200) {
          that.emitNotification("Link saved successfully!", true);
        } else {
          that.emitNotification(
            "An error occurred while saving the link! Try again!",
            false
          );
        }
      });
      let body = JSON.stringify({
        data: [
          {
            link: this.link.link,
            short: this.link.short,
            noPreview: this.link.noPreview,
          },
        ],
      });
      saveRequest.send(body);
    },
    randomShort() {
      this.link.short = this.makeId(8);
    },
    makeId(length) {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      let that = this;
      setTimeout(function () {
        that.checkValues();
      }, 20);
      return result;
    },
    validURL(str) {
      var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
          "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
          "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
          "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
          "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
          "(\\#[-a-z\\d_]*)?$",
        "i"
      ); // fragment locator
      return !!pattern.test(str);
    },
    copyShort() {
      const linkElement = document.getElementById(
        this.link.uuid + "-shortInput"
      );
      linkElement.style.display = "block";
      linkElement.select();
      document.execCommand("copy");
      linkElement.style.display = "none";
    },
    onlyLettersAndNums(str) {
      return str.match("^[A-Za-z0-9]+$");
    },
    deleteLink() {
      if (this.deleteConfirm) {
        let that = this;
        let deleteRequest = new XMLHttpRequest();
        deleteRequest.open(
          "DELETE",
          window.location.origin + "/api/links/" + this.link.uuid
        );
        deleteRequest.addEventListener("load", function () {
          if (deleteRequest.status === 200) {
            that.$emit("updatelinks");
            that.emitNotification("Link deleted successfully!", true);
          } else {
            that.emitNotification(
              "An error occurred while deleting the link! Try again!",
              false
            );
          }
        });
        deleteRequest.send();
      } else {
        this.deleteConfirm = true;
        this.deleteText = "Confirm?";
      }
    },
    toggleExpand() {
      this.expanded = !this.expanded;
      if (this.expanded) {
        var tooltipTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="tooltip"]')
        );
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      }
    },
    emitNotification(text, success) {
      this.$emit("notification", text, success);
    },
  },
  created: function () {},
};
