export default {
    props: {
        main: {}
    },
    emits: [
        "logout"
    ],
    data() {
        return {
            currentPage: "Links",
            pages: [
                "Links",
                "Account"
            ]
        }
    },
    template: `
        <top @logout="logout"></top>
        <main>
          <aside>
            <sidebar @changepage="changePage" :currentPage="currentPage" :pages="pages"></sidebar>
          </aside>
          <div id="main-content">
            <links v-if="currentPage === 'Links'"></links>
            <account v-if="currentPage === 'Account'"></account>
          </div>
        </main>
    `,
    methods: {
        changePage(page) {
            this.currentPage = page;
        },
        logout() {
            this.$emit('logout');
        }
    }
}