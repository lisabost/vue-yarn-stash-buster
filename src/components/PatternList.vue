<template>
  <b-row>
    <b-card-group deck v-for="(pattern, i) in patterns" :key="i" class="col-12 col-md-3 pattern-card-deck">
      <card-body>
        <template>
          <b-card-img class="pattern-image" :src="pattern.first_photo.medium_url" :alt="pattern.name"></b-card-img>
          <b-card-title>{{pattern.name}}</b-card-title>
          <b-card-sub-title>Designer: {{pattern.designer.name}}</b-card-sub-title>
        </template>
        <template v-slot:footer>
          <popup-modal :item="pattern">More Details</popup-modal>
        </template>
      </card-body>
    </b-card-group>
  </b-row>
</template>

<script>
import CardBody from "@/components/CardBody";
import PopupModal from "@/components/PopupModal";
export default {
  name: "PatternList",
  components: {PopupModal, CardBody},
  props: {
    patterns: {type: Array}
  }
}
</script>

<style scoped>
.pattern-image {
  max-height: 200px;
  object-fit: cover;
}
</style>