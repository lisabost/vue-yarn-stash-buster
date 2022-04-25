<template>
  <div>
    <b-form @submit.prevent="search" id="ravelry-search-form" class="mt-3">
      <b-form-group id="search-term-input" label="Search Ravelry" label-for="search-term" description="Example search terms: hat, socks, blanket, etc.">
        <b-form-input id="search-term" v-model="searchTerm" type="text" placeholder="Enter search term" required></b-form-input>
      </b-form-group>
      <b-button type="submit" @click="nextPage">Next Page</b-button>
      <b-button type="submit" variant="primary" class="ml-2">Search for Patterns</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RavelrySearch",
  props: {},
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      lastSearchTerm: '',
      page: 1
    }
  },
  methods: {
    checkForNewSearchTerm() {
      if(this.searchTerm !== this.lastSearchTerm) {
        this.lastSearchTerm = this.searchTerm;
        return true;
      }
    },
    search() {
      if(this.searchTerm) {
        let isNewSearch = this.checkForNewSearchTerm();
        if (isNewSearch) {
          // clear out the display
          this.clearSearchResults();
          // reset our page count
          this.page = 1;
        }
        this.$emit('searching');
        // build request arguments
        let url = 'https://api.ravelry.com/patterns/search.json';
        let config = {
          params: {
            query: this.searchTerm,
            page_size: 20,
            page: this.page
          },
          auth: {
            username: 'd94df3344302c08b7079c71041d90bbb',
            password: '01-eZUS5Q6kykGn0bribecD3ARfRU8stkMuOVi2I'
          }
        }
        // execute ajax request using promises
        axios.get(url, config)
            .then(response => {
              if(response.data.patterns.length > 0) {
                for (const i in response.data.patterns) {
                  this.searchResults.push(response.data.patterns[i]);
                }
              } else {
                this.searchResults = [];
                this.$emit('no-search-results-found');
              }
            })
            .catch(error => {
              console.log('AJAX SEARCH ERROR', error);
              // TODO: Put error message into toast for user
            })
            .finally(() => {
              this.$emit('search-finished', this.searchResults)
            })
      }
    },
    clearSearchResults() {
      while(this.searchResults.length > 0) {
        this.searchResults.pop();
      }
    },
    nextPage() {
      this.page++;
      this.searchTerm = this.lastSearchTerm;
      this.clearSearchResults();
      this.search();
    },
    previousPage() {
      this.page--;
      this.searchTerm = this.lastSearchTerm;
      this.clearSearchResults();
      this.search();
    }
  }
}
</script>

<style scoped>

</style>