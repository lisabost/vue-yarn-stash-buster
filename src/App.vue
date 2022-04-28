<template>
  <div id="app">
    <navigation-header :auth-user="authUser"></navigation-header>
    <b-container>
      <router-view :auth-user="authUser"></router-view>
    </b-container>
  </div>
</template>

<script>
import NavigationHeader from "@/views/NavigationHeader";
import router from "@/router/router";
import {firebase} from "@/firebase";
import User from "@/models/User";

export default {
  name: 'App',
  router,
  components: {NavigationHeader},
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
</style>