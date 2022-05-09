<template>
  <div class="search-results-display">
    <pattern-list :patterns="searchResults" :authUser="authUser"></pattern-list>
  </div>
</template>

<script>
import PatternList from "@/components/PatternList";
export default {
  name: "SearchResultsDisplay",
  components: {PatternList},
  props: {
    searchResults: {type: Array},
    authUser: {required: false},
  },
  methods: {
  },

}
</script>

<style scoped>

</style>