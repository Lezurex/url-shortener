export default {
    props: {
        main: {}
    },
    data() {
        return {
            currentPage: "Links",
            pages: [
                "Links",
                "Accounts"
            ]
        }
    },
    template: `
        <top></top>
        <main>
          <aside>
            <sidebar @changepage="changePage" :currentPage="currentPage" :pages="pages"></sidebar>
          </aside>
          <div id="main-content">
            <links v-if="currentPage === 'Links'"></links>
          </div>
        </main>
    `,
    methods: {
        changePage(page) {
            this.currentPage = page;
        }
    }
}