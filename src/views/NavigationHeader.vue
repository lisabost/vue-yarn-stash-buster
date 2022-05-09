<template>
  <div class="navigation-header fixed-top bg-primary">
    <b-navbar variant="primary" toggleable="lg" id="nav-bar">
      <b-navbar-brand class="site-brand" href="#" to="/"><h2>STASH BUSTER!</h2></b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/stash">Yarn Stash</b-nav-item>
          <b-nav-item to="/search">Search</b-nav-item>
          <b-nav-item v-if="authUser" to="/favorites">Favorites</b-nav-item>
          <b-nav-item v-if="authUser" to="/badges">Achievements</b-nav-item>
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
  </div>
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

<style scoped lang="scss">
$myBlue : #BEEFF7;
.site-brand {
  font-family: 'EB Garamond', serif;
}
.navbar-dark .navbar-nav .nav-link {
  font-family: 'Quicksand', sans-serif;
}
#nav-bar {
  padding-bottom: 0;
  border-bottom: 5px black;
  box-shadow: 0 0 10px -2px rgba(0,0,0,3);

  margin-bottom: -60px;
}
.navigation-header {
  min-height: 60px;
}
</style>