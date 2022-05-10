<template>
  <card-body>
    <template v-slot:header>
      <b-card-title class="yarn-card-title">{{yarn.name}}</b-card-title>
    </template>
    <template v-slot:body>
          <b-row>
            <b-col cols="4">
              <b-img fluid :src="yarn.image" :alt="yarn.name" class="m-3 yarn-image"></b-img>
            </b-col>
            <b-col class="mt-3 ml-3">
              <p class="text-capitalize" v-if="yarn.color">Color: {{yarn.color}}</p>
              <p class="text-capitalize">Length: {{yarn.length}} yards</p>
              <p class="text-capitalize">Weight: {{yarn.weight}}</p>
              <p class="text-capitalize" v-if="yarn.fiber">Fiber type: {{yarn.fiber}}</p>
            </b-col>
          </b-row>
    </template>
    <template v-slot:footer>
      <b-row class="yarn-button-row d-flex flex-row justify-content-around">
        <b-button variant="danger" class="m-2 btn-outline-tertiary yarn-card-button float-right ml-3" @click="removeYarn">Remove Yarn</b-button>
        <yarn-modal :auth-user="authUser" :ok-button-text="'Edit Yarn'" :currentlyEditing="editing"
                    :yarn="yarn" :modalId="getModalId" :yarnId="yarn.id" class="ml-3">Edit Yarn</yarn-modal>
        <b-button @click="findAPattern(yarn)" class="m-2 yarn-card-button btn-outline-tertiary" variant="secondary">Find a Pattern!</b-button>
      </b-row>
    </template>
  </card-body>
</template>

<script>
import CardBody from "@/components/CardBody";
import {db, storage} from "@/firebase";
import YarnModal from "@/components/YarnModal";
import {makeToast} from "@/mixins/makeToast";
import firebase from "firebase";
import {checkForNewAchievements} from "@/mixins/checkForNewAchievements";
export default {
  name: "YarnCard",
  data() {
    return {
      editing: true
    }
  },
  components: {YarnModal, CardBody},
  props: {
    yarn: {type: Object, required: true},
    authUser: {required: true},
  },
  mixins: [makeToast, checkForNewAchievements],
  methods: {
    removeYarn() {
      // remove image from storage
      if(this.yarn.image) {
        storage.child('yarn').child(this.yarn.id)
            .delete()
            .catch(error => {
              console.error('Error deleting yarn', error)
              this.makeToast('There was a problem deleting the yarn from your stash. Please try again.', 'Error Deleting Yarn!', 'danger');
            });
      }
      // remove yarn from database
      db.collection('crafters').doc(this.authUser.uid).collection('yarn')
        .doc(this.yarn.id)
        .delete()
        .catch(error => {
          console.error('Error deleting yarn', error);
          this.makeToast('There was a problem deleting the yarn from your stash. Please try again.', 'Error Deleting Yarn!', 'danger');
        })
      .finally(() => {
        this.makeToast(this.yarn.name + ', ' + this.yarn.color + ' removed from your stash', 'Yarn Deleted', 'success' );
        this.lowerYarnCount();
      })
    },
    findAPattern(yarn) {
      this.$router.push({name: 'search', params: {searchWithYarn: yarn}})
    },
    lowerYarnCount() {
      db.collection('crafters').doc(this.authUser.uid)
          .update({yarnUsed: firebase.firestore.FieldValue.increment(1)});
      this.checkYarnUsedForAchievement();
    }
  },
  computed: {
    getModalId() {
      return 'edit-yarn' + this.yarn.id;
    }
  }
}
</script>

<style scoped lang="scss">
$primary: #AA96DA;

.yarn-button-row {
  margin-right: 0;
  margin-left: 0;
  font-family: "EB Garamond", serif;
}
.yarn-card-title {
  font-family: "EB Garamond", serif;
}
.yarn-card-button {
  border: none;
  color: black;
}
//.yarn-image {
//  max-height: 50%;
//}
.info-row {
  max-height: 288px;
}
</style>