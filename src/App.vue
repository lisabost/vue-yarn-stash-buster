<template>
  <div id="app">
    <navigation-header :auth-user="authUser"></navigation-header>
    <b-container fluid class="content-body">
      <router-view :auth-user="authUser"></router-view>
    </b-container>
    <footer-view></footer-view>
  </div>
</template>

<script>
import NavigationHeader from "@/views/NavigationHeader";
import router from "@/router/router";
import {firebase} from "@/firebase";
import User from "@/models/User";
import FooterView from "@/views/FooterView";

export default {
  name: 'App',
  router,
  components: {FooterView, NavigationHeader},
  data() {
    return {
      authUser: null,
    }
  },
  methods: {

  },
  created: function() {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        console.log('Signed in as: ', user);
        this.authUser = new User(user)
      }
      else {
        console.log('Not signed in');
        this.authUser = null;
      }

    })
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;

  /* Negative indent footer by its height */
  margin: 0 auto -60px;
  /* Pad bottom by footer height */
  padding: 0 0 60px;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
footer-view {
  height: 60px;
  position: fixed;
}
.content-body {
  margin-top: 70px;
  margin-bottom: 25px;
}
</style>