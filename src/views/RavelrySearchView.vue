<template>
  <div>
    <ravelry-search @search-finished="displaySearchResults" @clear-search="clearResults"></ravelry-search>
    <search-results-display :searchResults="displayResults" :authUser="authUser"></search-results-display>
  </div>
</template>

<script>
import SearchResultsDisplay from "@/components/SearchResultsDisplay";
import RavelrySearch from "@/components/RavelrySearch";
import {makeToast} from "@/mixins/makeToast";
import {getMoreDetails} from "@/mixins/getMoreDetails";
import Pattern from "@/models/Pattern";

export default {
  name: "RavelrySearchView",
  components: { SearchResultsDisplay, RavelrySearch,},
  props: {
    authUser: {required: false}
  },
  mixins: [makeToast, getMoreDetails],
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
      this.displayResults.splice(0);
    },
  }
}
</script>

<style scoped>

</style>