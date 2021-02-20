import Link from "../objects/Link.js";

export default {
    props: {
        allLinks: {},
        link: Link,
    },
    data() {
        return {
            expanded: false,
            errorMsg: ""
        }
    },
    template: `
      <li class="card">
      <div class="card-header">
        <div class="link-element-header-container">
          <div>
            <a target="_blank" :href="link.getShortURL()">{{ link.getShortURL() }}</a>
            &rarr;
            <a :href="link.link">{{ link.link }}</a>
          </div>
          <button @click="expanded = !expanded" class="btn btn-primary">{{ expanded ? "&uarr;" : "&darr;" }}</button>
        </div>
      </div>
      <div v-if="expanded" class="card-body">
        <label for="shortened" class="form-label">Shortened URL</label>
        <div class="input-group mb-3">
          <span class="input-group-text">{{ getWindowOrigin() + "/" }}</span>
          <input @change="checkValues" @keyup="checkValues" v-model="link.short" type="text" class="form-control"
                 id="shortened">
          <button @click="randomShort" class="btn btn-outline-secondary" type="button" id="button-addon2">↻
          </button>
        </div>
        <div class="mb-3">
          <label for="link" class="form-label">Target URL</label>
          <input autocomplete="off" @change="checkValues" @keyup="checkValues" v-model="link.link" placeholder="https://" type="url" class="form-control" id="link">
        </div>
        <p class="error-msg" v-html="errorMsg"></p>
        <div class="d-flex flex-row-reverse">
          
        </div>
        <button class="btn btn-success">Save</button>
        <hr>
        <b>Statistics</b>
        <ul>
          <li>Clicks: {{link.statistics.clicks}}</li>
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
            const shortInput = document.getElementById("shortened");
            const linkInput = document.getElementById("link");

            shortInput.classList.remove("is-invalid");
            linkInput.classList.remove("is-invalid");

            if (this.link.short) {
                for (const key in this.allLinks) {
                    let enumLink = this.allLinks[key];
                    if (enumLink.uuid !== this.link.uuid) {
                        if (enumLink.short === this.link.short) {
                            shortInput.classList.add("is-invalid")
                            this.errorMsg += "<p>This short link does already exist!</p>";
                            break;
                        }
                    }
                }
            } else {
                shortInput.classList.add("is-invalid")
                this.errorMsg += "<p>The short link may not be empty!</p>"
            }


            if (!this.validURL(this.link.link)) {
                linkInput.classList.add("is-invalid");
                this.errorMsg += "<p>This is not a valid URL!</p>";
            }
        },
        randomShort() {
            this.link.short = this.makeid(8);
        },
        makeid(length) {
            var result = '';
            var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            let that = this;
            setTimeout(function () {that.checkValues();}, 20);
            return result;
        },
        validURL(str) {
            var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
            return !!pattern.test(str);
        }
    },
    mounted: function () {
    }
}