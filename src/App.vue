<template>
  <div id="app">
    <navigation-header></navigation-header>
    <b-container>
      <ravelry-search @search-finished="displaySearchResults"></ravelry-search>
      <search-results-display :searchResults="displayResults"></search-results-display>
    </b-container>

<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
<!--    <router-view/>-->
  </div>
</template>

<script>
import NavigationHeader from "@/views/NavigationHeader";
import RavelrySearch from "@/components/RavelrySearch";
import SearchResultsDisplay from "@/components/SearchResultsDisplay";
import Pattern from "@/models/Pattern";
export default {
  components: {SearchResultsDisplay, RavelrySearch, NavigationHeader},
  data() {
    return {
      displayResults: []
    }
  },
  methods: {
    displaySearchResults(searchResults) {
      for (const i in searchResults) {
        this.displayResults.push(Object.assign(new Pattern, searchResults[i]))
      }
      console.log('The first display result is: ' + this.displayResults[0]);
    }
  }
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