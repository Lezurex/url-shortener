export default {
    props: {
        username: String,
    },
    template: `
      <header>
          <div><b>{{hostname}} URL-Shortener</b></div>
          <div>
            <button class="btn btn-danger">Logout</button>
          </div>
      </header>
    `,
    computed: {
        hostname() {
            return window.location.hostname;
        }
    }
}