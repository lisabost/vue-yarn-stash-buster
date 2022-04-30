<template>
  <div class="search-results-display">
    <pattern-list :patterns="searchResults" @add-to-favorites="addToFavorites"></pattern-list>
  </div>
</template>

<script>
import PatternList from "@/components/PatternList";
export default {
  name: "SearchResultsDisplay",
  components: {PatternList},
  props: {
    searchResults: {type: Array}
  },
  methods: {
    addToFavorites(pattern) {
      this.$emit('add-to-favorites', pattern);
    }
  },
}
</script>

<style scoped>

</style>