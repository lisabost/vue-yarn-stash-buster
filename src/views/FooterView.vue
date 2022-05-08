<template>
  <footer class="footer mt-auto py-3 fixed-bottom" id="footer">
    <div class="container">
      &copy; 2022 - Stash Buster!
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterView"
}
</script>

<style scoped lang="scss">
$primary: #AA96DA;
#footer {
  font-family: "EB Garamond", serif;
  font-size: 1.25em;
  border-top: 5px black;
  box-shadow: 0 0 10px -2px rgba(0,0,0,3);
  z-index: 2;
}
</style>