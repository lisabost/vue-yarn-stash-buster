<template>
  <div>
    <ravelry-search @search-finished="displaySearchResults" @clear-search="clearResults"></ravelry-search>
    <search-results-display :searchResults="displayResults" @add-to-favorites="addToFavorites" :authUser="authUser"></search-results-display>
  </div>
</template>

<script>
import SearchResultsDisplay from "@/components/SearchResultsDisplay";
import RavelrySearch from "@/components/RavelrySearch";
import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";

export default {
  name: "RavelrySearchView",
  components: { SearchResultsDisplay, RavelrySearch,},
  props: {
    authUser: {required: false}
  },
  mixins: [makeToast],
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
        this.displayResults.push(searchResults[i])
      }
    },
    clearResults() {
      while(this.displayResults.length > 0) {
        this.displayResults.pop();
      }
    },
    addToFavorites(pattern) {
      db.collection('crafters').doc(this.authUser.uid).collection('favorites')
        .add(pattern.toFirestore())
        .then(docRef => {
          console.log('Pattern saved', docRef);
          this.makeToast(pattern.name +' pattern saved to favorites', 'Pattern Saved', 'success');
        })
        .catch(error => {
          console.error('Error saving pattern to favorites', error);
          this.makeToast('Error saving pattern to favorites', 'Pattern Save Failure', 'danger');
        })

    },
  }
}
</script>

<style scoped>

</style>