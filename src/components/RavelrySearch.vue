<template>
  <div>
    <b-form @submit.prevent="search" id="ravelry-search-form" class="mt-3">
      <b-form-group id="search-term-input" label="Search Ravelry:" label-for="search-term" description="Example search terms: hat, socks, blanket, etc.">
        <b-form-input id="search-term" v-model="searchObject.searchTerm" type="text" placeholder="Enter search term"></b-form-input>
      </b-form-group>
      <p v-if="yarnForSearch">You are searching for patterns with: {{yarnForSearch.name}}, {{yarnForSearch.color}}</p>
      <b-button type="button" @click="previousPage" class="mt-3">Previous Page</b-button>
      <b-button type="button" @click="nextPage" class="ml-2 mt-3">Next Page</b-button>
      <b-button type="button" @click="newSearch" class="ml-2 mt-3">New Search</b-button>
      <b-button type="submit" variant="primary" class="ml-2 mt-3 float-right">Search for Patterns</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';
import {makeToast} from "@/mixins/makeToast";
import Pattern from "@/models/Pattern";

export default {
  name: "RavelrySearch",
  props: {
    searchWithYarn: Object,
  },
  data() {
    return {
      searchObject: {
        searchTerm: '',
      },
      searchResults: [],
      lastSearchTerm: '',
      lastSearchLength: '',
      searchList: [],
      yarnForSearch: null,
      page: 1,
      detailedResults: [],
      newPatternWithDetails : {
        pattern: null,
        details: null,
      }
    }
  },
  mixins: [makeToast],
  methods: {
    checkForNewSearch() {
      // if the search term is new or the search length is new clear out results for new results
      if(this.searchObject.searchTerm !== this.lastSearchTerm) {
        return true;
      }
      this.lastSearchTerm = this.searchObject.searchTerm;
    },
    search() {
        let isNewSearch = this.checkForNewSearch();
        if (isNewSearch) {
          // clear out the display
          this.clearSearchResults();
          // reset our page count
          this.$emit('page-reset');
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
                // put our data in our results array
                this.searchResults.push(response.data.patterns[i].id);
              }
              this.getDetailedInformation();
            } else {
              this.searchResults = [];
              this.$emit('no-search-results-found');
            }
          })
          .catch(error => {
            console.log('AJAX SEARCH ERROR', error);
            // Put error message into toast for user
            this.makeToast('AJAX search error', 'AJAX search Failure', 'danger');
          })
    },
    async getDetailedInformation() {
      await Promise.all(
          this.searchResults.map(async (id) => {
            const response = await axios.get(`https://api.ravelry.com/patterns/${id}.json`,
                  {auth: {
                      username: 'd94df3344302c08b7079c71041d90bbb',
                      password: '01-eZUS5Q6kykGn0bribecD3ARfRU8stkMuOVi2I'
                    }})
            // console.log(response.data.pattern)
            this.detailedResults.push(Object.assign(new Pattern, response.data.pattern));
          })
      )
      this.$emit('search-finished', this.detailedResults)
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
      if(this.page > 1) {
        this.page--;
      }
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