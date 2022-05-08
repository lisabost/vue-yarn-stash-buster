<template>
  <div class="search-results-display">
    <div v-if="authUser">
      <pattern-list :patterns="searchResults" :authUser="authUser"></pattern-list>
    </div>
    <div v-else>
      <pattern-list :patterns="searchResults"></pattern-list>
    </div>
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