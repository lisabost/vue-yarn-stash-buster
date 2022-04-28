<template>
  <yarn-list :yarn-collection="yarnCollection" :authUser="authUser"></yarn-list>
</template>

<script>
import YarnList from "@/components/YarnList";
import {db} from "@/firebase";
export default {
  name: "UserYarnList",
  components: {YarnList},
  props: {
    authUser: {required: true},
  },
  data() {
    return {
      yarnCollection: []
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