<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#">STASH BUSTER!</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item to="/">Yarn Stash</b-nav-item>
        <b-nav-item to="/search">Search</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">

        <b-nav-item v-if="authUser" href="#" @click.prevent="logout">Logout</b-nav-item>
        <b-nav-item v-else href="#" @click.prevent="login">Login</b-nav-item>
        <div v-if="authUser">
          <b-img :src="authUser.photoURL" class="avatar"></b-img>
        </div>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import {auth} from "@/firebase";
import {firebase} from "@/firebase";

export default {
  name: "NavigationHeader",
  props: {
    authUser: {required: true}
  },
  methods: {
    login() {
      let provider = new firebase.auth.GoogleAuthProvider();

      auth.signInWithPopup(provider)
          .catch(error => {
            console.error('Error logging in', error);
            //TODO: let the user know use makeToast or mixin
          })
    },
    logout() {
        auth.signOut();
    },
  }
}
</script>

<style scoped>

</style>