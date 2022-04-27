<template>
  <div class="home">
    <h1>Welcome to Stash Buster</h1>
    <img alt="Yarn ball" src="../assets/free-ball-of-wool.png">

    <b-row>
      <b-button v-if="authUser" class="mt-3">View Your Stash</b-button>
      <b-button v-else class="mt-3 ml-3">Sign in to Manage Your Stash</b-button>
      <b-button class="ml-3 mt-3">Search for Patterns</b-button>
    </b-row>
  </div>
</template>

<script>



export default {
  name: 'HomeView',
  props: {
    authUser: {required: false}
  },
  components: {

  }
}
</script>
