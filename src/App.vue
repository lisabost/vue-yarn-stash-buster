<template>
  <div id="app">
    <navigation-header></navigation-header>
    <b-container>
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import NavigationHeader from "@/views/NavigationHeader";
// import Pattern from "@/models/Pattern";
import router from "@/router/router";
export default {
  name: 'App',
  router,
  components: {NavigationHeader},
  // data() {
  //   return {
  //     displayResults: []
  //   }
  // },
  // methods: {
  //   displaySearchResults(searchResults) {
  //     if(this.displayResults.length > 0){
  //       this.clearResults();
  //     }
  //     for (const i in searchResults) {
  //       this.displayResults.push(Object.assign(new Pattern, searchResults[i]))
  //     }
  //   },
  //   clearResults() {
  //     while(this.displayResults.length > 0) {
  //       this.displayResults.pop();
  //     }
  //   }
  // }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>