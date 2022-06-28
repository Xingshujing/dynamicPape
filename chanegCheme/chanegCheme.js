new Vue({
  el: "#app",
  data: {
    theme: "default",
  },
  created() {
    this.theme = localStorage.getItem("theme") || "default";
  },
  methods: {
    changeCheme(val) {
      this.theme = val;
      localStorage.setItem("theme", val);
    },
  },
});
