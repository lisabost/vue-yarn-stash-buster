<template>
  <div class="home">
    <h1 class="welcome-title">Welcome to Stash Buster</h1>
    <div class="image-holder">
      <img alt="Yarn ball" src="../assets/free-ball-of-wool.png" class="mx-auto d-block home-image" >
    </div>
    <b-row class="d-flex flex-row justify-content-around home-button-row">
      <b-button type="button" v-if="authUser" class="mt-3 btn-outline-tertiary home-buttons" variant="secondary" size="lg" @click="viewStash">View Your Stash</b-button>
      <b-button type="button" v-else class="mt-3 ml-3 btn-outline-tertiary home-buttons" variant="secondary" size="lg" @click="login">Sign in to Manage Your Stash</b-button>
      <b-button type="button" class="ml-3 mt-3 btn-outline-tertiary home-buttons" variant="secondary" size="lg" @click="redirectToSearch">Search for Patterns</b-button>
    </b-row>
  </div>
</template>

<script>
import {auth, firebase} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";

export default {
  name: 'HomeView',
  props: {
    authUser: {required: false}
  },
  data() {
    return {
    }
  },
  components: {
  },
  methods: {
    redirectToSearch() {
      this.$router.push('search');
    },
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
          .catch(error => {
            console.error('Error logging in', error);
            this.makeToast('Error logging in', 'Log in Failed', 'danger')
          });

      this.viewStash();
    },
    viewStash() {
      this.$router.push('stash');
    }
  },
  mixins: [makeToast],
}
</script>

<style scoped>
.welcome-title {
  font-family: "EB Garamond", serif;
}
.home-buttons{
  border: none;
  color: black;
}
.home-image {
  max-width: 100%;
  height: auto;
}
</style>