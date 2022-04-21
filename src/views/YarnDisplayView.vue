<template>
  <div>
    <yarn-list></yarn-list>
    <yarn-modal :ok-button-text="'Add Yarn'" :modalId="modalId">Add Yarn to Your Stash</yarn-modal>
  </div>
</template>

<script>
import YarnList from "@/components/YarnList";
import YarnModal from "@/components/YarnModal";
export default {
  name: "YarnDisplayView",
  components: {YarnModal, YarnList},
  data() {
    return {
      modalId: 'add-yarn-modal'
    }
  }
}
</script>

<style scoped>

</style>