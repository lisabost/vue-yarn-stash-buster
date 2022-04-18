<template>
  <div class="search-results-display">
    <h2 class="content-heading mt-3">Search Results</h2>
    <pattern-list :patterns="searchResults"></pattern-list>
  </div>
</template>

<script>
import PatternList from "@/components/PatternList";
export default {
  name: "SearchResultsDisplay",
  components: {PatternList},
  props: {
    searchResults: {type: Array}
  }
}
</script>

<style scoped>

</style>