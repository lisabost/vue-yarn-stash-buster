<template>
  <div>
    <b-button v-b-modal="modalId"><slot></slot></b-button>
    <b-modal scrollable centered :title="pattern.name" :id="modalId" class="more-details-modal">
      <template>
        <p v-if="pattern.price > 0">Price: {{pattern.price}} {{pattern.currency}}</p>
        <p>Get the Pattern:
          <a :href="`https://ravelry.com/patterns/library/${item.permalink}`">{{pattern.name}}</a>
        </p>
        <p class="my-4" v-html="pattern.notes_html"></p>
      </template>
    </b-modal>
  </div>
</template>

<script>
// import axios from "axios";
// import Pattern from "@/models/Pattern";

export default {
  name: "MoreDetailsModal",
  props: {pattern: {type: Object}},
  data() {
    return {
    }
  },
  methods: {
    // moreDetails() {
    //   if(this.item.id) {
    //     // build search arguments
    //     let patternId = this.item.id;
    //     let url = `https://api.ravelry.com/patterns/${patternId}.json`;
    //     let config = {
    //       auth: {
    //         username: 'd94df3344302c08b7079c71041d90bbb',
    //         password: '01-eZUS5Q6kykGn0bribecD3ARfRU8stkMuOVi2I'
    //       }
    //     }
    //     // execute ajax request
    //     axios.get(url, config)
    //           .then(response => {
    //             if(response != null) {
    //               this.pattern = Object.assign(new Pattern, response.data.pattern)
    //             }
    //             else {
    //               this.pattern = new Pattern();
    //             }
    //           })
    //           .catch(error => {
    //             console.log('Error finding pattern', error)
    //           });
    //   }
    // }
  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    },
  }
}
</script>

<style scoped>
.more-details-modal {
  width: 600px;
}
</style>