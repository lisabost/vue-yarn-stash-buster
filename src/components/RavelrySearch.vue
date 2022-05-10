<template>
  <div>
    <b-form @submit.prevent="search" id="ravelry-search-form" class="my-3">
      <b-row>
        <b-col>
          <b-form-group id="search-term-input" class="search-label" label="Search Ravelry:" for="search-term" description="Example search terms: hat, socks, blanket, etc.">
            <b-form-input id="search-term" v-model="searchObject.searchTerm" type="text" placeholder="Enter search term"></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group id="craft-type" label="Craft:" label-for="craft-type">
            <b-form-select id="craft-type" v-model="searchObject.craftType" :options="craftTypes"></b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <p v-if="yarnForSearch">You are searching for patterns with: {{yarnForSearch.name}}, {{yarnForSearch.color}}</p>
      <b-button type="button" @click="newSearch" size="lg" class="ml-2 mt-3 btn-secondary btn-outline-tertiary search-button buttons">New Search</b-button>
      <b-button type="submit" variant="primary" size="lg" class="ml-2 mt-3 float-right buttons">Search for Patterns</b-button>
    </b-form>

    <search-results-display :searchResults="displayResults" :authUser="authUser"></search-results-display>

    <b-row class="px-3 d-flex flex-row justify-content-between" v-if="displayResults.length > 0">
      <b-button type="button" @click="previousPage" size="lg" class="mt-3 buttons btn-outline-tertiary search-button">Previous Page</b-button>
      <b-button type="button" @click="nextPage" size="lg" class="ml-2 mt-3 buttons btn-outline-tertiary search-button">Next Page</b-button>
    </b-row>
  </div>
</template>

<script>
import axios from 'axios';
import {makeToast} from "@/mixins/makeToast";
import SearchResultsDisplay from "@/components/SearchResultsDisplay";
import Pattern from "@/models/Pattern";

export default {
  name: "RavelrySearch",
  components: {SearchResultsDisplay},
  props: {
    searchWithYarn: Object,
    authUser: {required: false},
  },
  data() {
    return {
      searchObject: {
        searchTerm: '',
        searchLength: '',
        searchWeight: '',
        craftType: null,
      },
      craftTypes: [{text: 'Select One', value: null}, 'Crochet', 'Knitting'],
      searchResults: [],
      lastSearchTerm: '',
      lastSearchLength: '',
      lastSearchCraft: '',
      searchList: [],
      yarnForSearch: null,
      page: 1,
      newPatternWithDetails : {
        pattern: null,
        details: null,
      },
      displayResults: []
    }
  },
  mixins: [makeToast],
  methods: {
    checkForNewSearch() {
      // if the search term is new or the search length is new clear out results for new results
      if(this.searchObject.searchTerm !== this.lastSearchTerm || this.searchObject.craftType !== this.lastSearchCraft) {
        this.lastSearchTerm = this.searchObject.searchTerm;
        this.lastSearchLength = this.searchObject.searchLength;
        this.lastSearchCraft = this.searchObject.craftType;
        return true;
      }
      this.lastSearchTerm = this.searchObject.searchTerm;
      this.lastSearchLength = this.searchObject.searchLength;
      this.lastSearchCraft = this.searchObject.craftType;
    },
    search() {
        let isNewSearch = this.checkForNewSearch();
        if (isNewSearch) {
          // clear out the display
          this.clearSearchResults();
          this.page = 1;
        }
        this.$emit('searching');
        // build request arguments
        let url = 'https://api.ravelry.com/patterns/search.json';
        let config = {
          params: {
            query: this.searchObject.searchTerm,
            yardage_max: this.searchObject.searchLength,
            craft: this.searchObject.craftType,
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
                let tempItem = response.data.patterns[i];
                tempItem.searchYarn = this.$route.params.searchWithYarn;
                this.searchResults.push(tempItem);
              }
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
          .finally(() => {
            if(this.displayResults.length > 0){
              this.displayResults.splice(0);
            }
            for (const i in this.searchResults) {
              this.displayResults.push(Object.assign(new Pattern, this.searchResults[i]))
            }
          })
    },
    newSearch() {
      // reset values
      this.searchObject.searchTerm = '';
      this.searchObject.searchLength = '';
      this.page = 1;
      //clear results
      this.clearSearchResults();
      this.$emit('clear', this.searchResults);
    },
    clearSearchResults() {
      this.searchResults.splice(0);
    },
    nextPage() {
      this.page++;
      this.searchObject.searchTerm = this.lastSearchTerm;
      this.searchObject.searchLength = this.lastSearchLength;
      this.clearSearchResults();
      this.search();
      window.scrollTo(0, 0)
    },
    previousPage() {
      if(this.page > 1) {
        this.page--;
      }
      this.searchObject.searchTerm = this.lastSearchTerm;
      this.searchObject.searchLength = this.lastSearchLength;
      this.clearSearchResults();
      this.search();
      window.scrollTo(0, 0)
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
      this.searchObject.searchWeight = this.$route.params.searchWithYarn.weight;
    }
  }
}
</script>

<style scoped>
.search-button {
  color: black;
}
.buttons {
  font-family: 'EB Garamond', serif;
  border: none;
}
</style>