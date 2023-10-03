import Link from "../objects/Link.js";

export default {
  props: {},
  data() {
    return {
      links: {},
      addNewLinkState: false,
    };
  },
  template: `
      <h1>Links</h1>
      <p>Manage all your shortened links in one place!</p>
      <button @click="addNewLinkState = !addNewLinkState" class="btn btn-primary">+ Add new link</button>
      <linkAdder @notification="emitNotification" @close="addNewLinkState = false" @updatelinks="getLinks" :allLinks="links" v-if="addNewLinkState"></linkAdder>
      <hr>
      <ul id="links-list">
        <linkElement @notification="emitNotification" @updatelinks="getLinks" v-for="link in links" :key="link.uuid" :link="link" :allLinks="links"></linkElement>
      </ul>
    `,
  methods: {
    getLinks() {
      let that = this;
      let linksRequest = new XMLHttpRequest();
      linksRequest.open("GET", window.location.origin + "/api/links/");
      linksRequest.addEventListener("load", function (event) {
        if (linksRequest.status === 200) {
          let data = JSON.parse(linksRequest.responseText).data;
          that.links = {};
          data.forEach((linkData) => {
            let link = Link.fromObject(linkData);
            that.links[link.uuid] = link;
          });
        } else {
          that.emitNotification(
            "An error occurred while fetching data! Try again!"
          );
        }
      });
      linksRequest.send();
    },
    emitNotification(text, success) {
      this.$emit("notification", text, success);
    },
  },
  mounted: function () {
    this.getLinks();
  },
};
