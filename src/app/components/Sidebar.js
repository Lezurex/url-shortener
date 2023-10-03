export default {
  props: {
    pages: Array,
    currentPage: String,
  },
  data() {
    return {};
  },
  template: `
      <nav>
      <ul>
        <li @click="changePage(page)" v-for="page in pages" :class="currentPage === page ? 'active' : ''">{{ page }}</li>
      </ul>
      </nav>

    `,
  methods: {
    changePage(page) {
      this.$emit("changepage", page);
    },
  },
};
