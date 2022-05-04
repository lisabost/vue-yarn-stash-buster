<template>
  <div v-if="yarnCollection.length > 0 && patternCollection.length > 0">
    <badges-list :yarnCollection="yarnCollection" :patternCollection="patternCollection" :authUser="authUser"></badges-list>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import BadgesList from "@/components/BadgesList";
import {db} from "@/firebase";
export default {
  name: "UserBadgesList",
  components: {BadgesList},
  props: {
    authUser: {required: true}
  },
  data() {
    return {
      yarnCollection: [],
      patternCollection: [],
    }
  },
  firestore() {
    return {
      yarnCollection: db.collection('crafters').doc(this.authUser.uid).collection('yarn'),
      patternCollection: db.collection('crafters').doc(this.authUser.uid).collection('favorites')
    }

  }
}
</script>

<style scoped>

</style>