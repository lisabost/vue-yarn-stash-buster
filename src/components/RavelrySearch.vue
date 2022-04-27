<template>
  <div>
    <b-form @submit.prevent="search" id="ravelry-search-form" class="mt-3">
      <b-form-group id="search-term-input" label="Search Ravelry:" label-for="search-term" description="Example search terms: hat, socks, blanket, etc.">
        <b-form-input id="search-term" v-model="searchObject.searchTerm" type="text" placeholder="Enter search term"></b-form-input>
      </b-form-group>
      <p v-if="yarnForSearch != null">You are searching for patterns with: {{yarnForSearch.name}}, {{yarnForSearch.color}}</p>
      <b-button type="submit" @click="previousPage" class="mt-3">Previous Page</b-button>
      <b-button type="submit" @click="nextPage" class="ml-2 mt-3">Next Page</b-button>
      <b-button type="button" @click="newSearch" class="ml-2 mt-3">New Search</b-button>
      <b-button type="submit" variant="primary" class="ml-2 mt-3 float-right">Search for Patterns</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: "RavelrySearch",
  props: {
    searchWithYarn: Object
  },
  data() {
    return {
      searchObject: {
        searchTerm: '',
        searchLength: '',
      },
      searchResults: [],
      lastSearchTerm: '',
      lastSearchLength: '',
      page: 1,
      selectedYarn: Object,
      searchList: [],
      yarnForSearch: null
    }
  },
  methods: {
    checkForNewSearch() {
      // if the search term is new or the search length is new clear out results for new results!
      if(this.searchObject.searchTerm !== this.lastSearchTerm || this.searchObject.searchLength !== this.lastSearchLength) {
        return true;
      }
      this.lastSearchTerm = this.searchObject.searchTerm;
      this.lastSearchLength = this.searchObject.searchLength;
    },
    search() {
      // if(this.searchObject.searchTerm) {
        let isNewSearch = this.checkForNewSearch();
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
            query: this.searchObject.searchTerm,
            yardage_max: this.searchObject.searchLength,
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
      // }
    },
    newSearch() {
      //clear form
      this.searchObject.searchTerm = '';
      this.searchObject.searchLength = '';
      //clear results
      this.clearSearchResults();
      this.$emit('clear', this.searchResults);
    },
    clearSearchResults() {
      while(this.searchResults.length > 0) {
        this.searchResults.pop();
      }
    },
    nextPage() {
      this.page++;
      this.searchObject.searchTerm = this.lastSearchTerm;
      this.searchObject.searchLength = this.lastSearchLength;
      this.clearSearchResults();
      this.search();
    },
    previousPage() {
      this.page--;
      this.searchObject.searchTerm = this.lastSearchTerm;
      this.searchObject.searchLength = this.lastSearchLength;
      this.clearSearchResults();
      this.search();
    }
  },
  computed : {

  },
  mounted() {
    if(this.$route.params.searchWithYarn) {
      // store the yarn from the route, so we can display it to the user
      this.yarnForSearch = this.$route.params.searchWithYarn;
      // put the length into our search object for our search
      this.searchObject.searchLength = this.$route.params.searchWithYarn.length;
    }
  }
}
</script>

<style scoped>

</style>