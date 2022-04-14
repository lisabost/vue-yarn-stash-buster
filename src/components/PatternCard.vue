<template>
  <b-row>
      <b-card-group deck v-for="pattern in patterns" :key="pattern.id" class="col-12 col-md-3">
        <b-card :title="pattern.name" :img-src="pattern.first_photo.medium_url" :img-alt="pattern.name" img-top class="my-2Ce">
          <b-card-text>
            Designer: {{pattern.designer.name}}
          </b-card-text>
          <template #footer>
            <small class="text-muted">Last updated 3 mins ago</small>
          </template>
        </b-card>
      </b-card-group>
  </b-row>

</template>

<script>
export default {
  name: "PatternCard",
  props: {
    patterns: {type: Array}
  }
}
</script>

<style scoped>

</style>