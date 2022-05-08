<template>
  <div class="user-yarn-list">
    <div v-if="yarnCollection">
      <yarn-list :yarn-collection="yarnCollection" :authUser="authUser"></yarn-list>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
import YarnList from "@/components/YarnList";
import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";

export default {
  name: "UserYarnList",
  components: {YarnList},
  props: {
    authUser: {required: true},
  },
  mixins: [makeToast],
  data() {
    return {
      yarnCollection: [],
    }
  },
  methods: {
  },
  firestore() {
    return {yarnCollection: db.collection('crafters').doc(this.authUser.uid).collection('yarn')}
  },

}
</script>

<style scoped>

</style>