import {db} from "@/firebase";
import {makeToast} from "@/mixins/makeToast";

export const checkForNewAchievements = {
    props: {
      authUser: {required: true},
    },
    data() {
        return {
            yarnCount: 0,
            yarnUsedCount: 0,
            favoritePatternCount: 0
        }
    },
    mixins: [makeToast],
    methods: {
        checkYarnCountForAchievement() {
            if(this.yarnCount === 1 || this.yarnCount === 5 || this.yarnCount === 10 || this.yarnCount === 15 ||
                this.yarnCount === 20 || this.yarnCount === 30) {
                if(this.yarnCount === 1) {
                    this.makeToast(this.yarnCount + ' Yarn Added', 'Achievement Earned!', 'primary')
                }
                else {
                    this.makeToast(this.yarnCount +' Yarns Added', 'Achievement Earned!', 'primary');
                }
            }
        },
        checkYarnUsedForAchievement() {
            if(this.yarnUsedCount === 1 || this.yarnUsedCount === 5 || this.yarnUsedCount === 10 || this.yarnUsedCount === 15 ||
                this.yarnUsedCount === 20 || this.yarnUsedCount === 30) {
                if(this.yarnUsedCount === 1) {
                    this.makeToast(this.yarnUsedCount + ' Yarn Used', 'Achievement Earned!', 'primary')
                }
                else {
                    this.makeToast(this.yarnUsedCount +' Yarns Used', 'Achievement Earned!', 'primary');
                }
            }
        },
        checkForPatternsSavedAchievement() {
            if(this.favoritePatternCount === 1 || this.favoritePatternCount === 5 || this.favoritePatternCount === 10 || this.favoritePatternCount === 15 ||
                this.favoritePatternCount === 20 || this.favoritePatternCount === 30) {
                if(this.favoritePatternCount === 1) {
                    this.makeToast(this.favoritePatternCount + ' Pattern Saved', 'Achievement Earned!', 'primary')
                }
                else {
                    this.makeToast(this.favoritePatternCount +' Pattern Saved', 'Achievement Earned!', 'primary');
                }
            }
        }
    },
    firestore() {
        db.collection('crafters').doc(this.authUser.uid)
            .onSnapshot((doc) => {
                let data = doc.data();
                this.yarnCount = data.yarnCount;
                this.yarnUsedCount = data.yarnUsed;
                this.favoritePatternCount = data.favoritePatternCount;
            })
    }
}