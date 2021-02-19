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
    `,
    mounted: function () {
        let linksRequest = new XMLHttpRequest();
    }
}