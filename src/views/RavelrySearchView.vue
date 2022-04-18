<template>
  <div>
    <ravelry-search @search-finished="displaySearchResults"></ravelry-search>
    <search-results-display :searchResults="displayResults"></search-results-display>
  </div>
</template>

<script>
import SearchResultsDisplay from "@/components/SearchResultsDisplay";
import RavelrySearch from "@/components/RavelrySearch";
import Pattern from "@/models/Pattern";

export default {
  name: "RavelrySearchView",
  components: {SearchResultsDisplay, RavelrySearch,},
  data() {
    return {
      displayResults: []
    }
  },
  methods: {
    displaySearchResults(searchResults) {
      if(this.displayResults.length > 0){
        this.clearResults();
      }
      for (const i in searchResults) {
        this.displayResults.push(Object.assign(new Pattern, searchResults[i]))
      }
    },
    clearResults() {
      while(this.displayResults.length > 0) {
        this.displayResults.pop();
      }
    }
  }
}
</script>

<style scoped>

</style>