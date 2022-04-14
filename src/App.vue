<template>
  <div id="app">
    <navigation-header></navigation-header>
    <b-container>
      <ravelry-search></ravelry-search>
    </b-container>

<!--    <nav>-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </nav>-->
<!--    <router-view/>-->
  </div>
</template>

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
<script>
import NavigationHeader from "@/views/NavigationHeader";
import RavelrySearch from "@/components/RavelrySearch";
export default {
  components: {RavelrySearch, NavigationHeader}
}
</script>