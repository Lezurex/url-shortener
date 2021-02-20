import Link from "../objects/Link.js";

export default {
    props: {

    },
    data() {
        return {
            links: {}
        }
    },
    template: `
      <h1>Links</h1>
      <p>Manage all your shortened links in one place!</p>
      <ul id="links-list">
        <linkElement v-for="link in links" :link="link" :allLinks="links"></linkElement>
      </ul>
    `,
    methods: {

    },
    mounted: function () {
        let that = this;
        let linksRequest = new XMLHttpRequest();
        linksRequest.open("GET", window.location.origin + "/api/links/")
        linksRequest.addEventListener("load", function (event) {
            if (linksRequest.status === 200) {
                let data = JSON.parse(linksRequest.responseText).data;
                data.forEach(linkData => {
                    let link = Link.fromObject(linkData);
                    that.links[link.uuid] = link;
                });
            }
        });
        linksRequest.send();
    }
}