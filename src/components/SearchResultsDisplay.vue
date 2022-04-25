<template>
  <div class="search-results-display">
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