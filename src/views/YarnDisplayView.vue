<template>
  <div class="yarn-stash-page">
    <h2 class="mt-2 stash-title">Yarn Stash</h2>
    <div v-if="loggedIn" class="stash">
      <yarn-modal :authUser="authUser" :ok-button-text="'Add Yarn'" :modalId="modalId">Add Yarn to Your Stash</yarn-modal>
      <user-yarn-list :authUser="authUser"></user-yarn-list>
    </div>
    <div v-else>
      <b-alert variant="danger" class="mt-5 w-100" show>Please log in to see your stash.</b-alert>
    </div>
  </div>
</template>

<script>
import YarnModal from "@/components/YarnModal";
import UserYarnList from "@/components/UserYarnList";

export default {
  name: "YarnDisplayView",
  components: {UserYarnList, YarnModal},
  props: {
    authUser: {required: true},
  },
  data() {
    return {
      modalId: 'add-yarn-modal',
    }
  },
  methods: {
  },
  computed: {
    loggedIn() {
      return (this.authUser && this.authUser.uid);
    }
  },
}
</script>

<style scoped>
.stash-title {
  font-family: "EB Garamond", serif;
}
.stash > .create-yarn-modal > button {
  font-size: 1.25em;
}
</style>