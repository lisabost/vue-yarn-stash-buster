<template>
  <div class="badges-page">
    <h2 class="badges-title">Your Achievements</h2>
    <div v-if="loggedIn">
      <user-badges-list :authUser="authUser"></user-badges-list>
    </div>
    <div v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Log in to see your achievements</b-alert>
    </div>
  </div>
</template>

<script>
import UserBadgesList from "@/components/UserBadgesList";
export default {
  name: "BadgesView",
  components: {UserBadgesList},
  props: {
    authUser: {required: true},
  },
  computed: {
    loggedIn() {
      return (this.authUser && this.authUser.uid);
    }
  },
}
</script>

<style scoped>
.badges-title {
  font-family: "EB Garamond", serif;
}
</style>