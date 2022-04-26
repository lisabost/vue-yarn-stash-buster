<template>
  <div>
    <yarn-modal :ok-button-text="'Add Yarn'" :modalId="modalId">Add Yarn to Your Stash</yarn-modal>
    <b-button class="btn-primary" type="button" @click="searchWithYarnList(yarnCollection)">Search for Patterns for your Yarn</b-button>
    <yarn-list :yarn-collection="yarnCollection"></yarn-list>
  </div>
</template>

<script>
import YarnList from "@/components/YarnList";
import YarnModal from "@/components/YarnModal";
import {db} from "@/firebase";

export default {
  name: "YarnDisplayView",
  components: {YarnModal, YarnList},
  props: {
    user: {type: Object}
  },
  data() {
    return {
      modalId: 'add-yarn-modal',
      yarnCollection: [],
    }
  },
  methods: {
    searchWithYarnList(collection) {
      this.$router.push({name: 'search', params: {listOfYarns: collection}})
    }
  },
  firestore: {
    yarnCollection: db.collection('yarn')
  },
}
</script>

<style scoped>

</style>