<template>
  <div>
    <b-form @submit.prevent="search" id="ravelry-search-form" class="mt-3">
      <b-form-group id="search-term-input" label="Search Ravelry" label-for="search-term" description="Example search terms: hat, socks, blanket, etc.">
        <b-form-input id="search-term" v-model="searchTerm" type="text" placeholder="Enter search term" required></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
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
      searchResults: []
    }
  },
  methods: {
    search() {
      if(this.searchTerm) {
        this.$emit('searching');
        // build request arguments
        let url = 'https://api.ravelry.com/patterns/search.json';
        let config = {
          params: {
            query: this.searchTerm,
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
              //console.log('Search Results: ' + this.searchResults);
              //console.log('first search result: ' + this.searchResults[0].name);
            })
      }
    }
  }
}
</script>

<style scoped>

</style>