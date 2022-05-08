<template>
  <div v-if="yarnCount > 0 || favoritePatternCount > 0 || yarnUsedCount > 0">
    <badges-list :yarnCount="yarnCount" :favoritePatternCount="favoritePatternCount" :yarnUsedCount="yarnUsedCount" :authUser="authUser"></badges-list>
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
      yarnCount: 0,
      favoritePatternCount: 0,
      yarnUsedCount: 0,
    }
  },
  firestore() {
    db.collection('crafters').doc(this.authUser.uid).get()
        .then((doc) => {
          let data = doc.data();
          this.yarnCount = data.yarnCount;
          this.favoritePatternCount = data.favoritePatternCount;
          this.yarnUsedCount = data.yarnUsed;
        });
  }
}
</script>

<style scoped>

</style>