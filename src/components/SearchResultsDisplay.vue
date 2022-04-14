<template>
  <div class="search-results-display">
    <h2 class="content-heading">Search Results</h2>
    <pattern-card :patterns="searchResults"></pattern-card>
  </div>
</template>

<script>
import PatternCard from "@/components/PatternCard";
export default {
  name: "SearchResultsDisplay",
  components: {PatternCard},
  props: {
    searchResults: {type: Array}
  }
}
</script>

<style scoped>

</style>