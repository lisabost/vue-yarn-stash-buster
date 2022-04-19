<template>
  <div>
    <b-button v-b-modal="modalId" @click="moreDetails"><slot></slot></b-button>
    <basic-modal :title="pattern.name" :id="modalId">
      <template>
        <p class="my-4" v-html="pattern.notes_html"></p>
      </template>
    </basic-modal>
  </div>
</template>

<script>
import axios from "axios";
import Pattern from "@/models/Pattern";
import BasicModal from "@/components/BasicModal";

export default {
  name: "MoreDetailsModal",
  components: {BasicModal},
  props: {item: {type: Object}},
  data() {
    return {
      pattern: Object
    }
  },
  methods: {
    moreDetails() {
      if(this.item.id) {
        // build search arguments
        let patternId = this.item.id;
        let url = `https://api.ravelry.com/patterns/${patternId}.json`;
        let config = {
          // params: {
          //   id: this.item.id
          // },
          auth: {
            username: 'd94df3344302c08b7079c71041d90bbb',
            password: '01-eZUS5Q6kykGn0bribecD3ARfRU8stkMuOVi2I'
          }
        }
        // execute ajax request
        axios.get(url, config)
              .then(response => {
                if(response != null) {
                  this.pattern = Object.assign(new Pattern, response.data.pattern)
                }
                else {
                  this.pattern = new Pattern();
                }
              })
              .catch(error => {
                console.log('Error finding pattern', error)
              });
      }
    }
  },
  computed: {
    modalId() {
      return 'modal-' + this.item.id;
    }
  }
}
</script>

<style scoped>

</style>