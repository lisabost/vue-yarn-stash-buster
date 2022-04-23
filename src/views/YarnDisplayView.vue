<template>
  <div>
    <yarn-modal :ok-button-text="'Add Yarn'" :modalId="modalId">Add Yarn to Your Stash</yarn-modal>
    <yarn-list></yarn-list>
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