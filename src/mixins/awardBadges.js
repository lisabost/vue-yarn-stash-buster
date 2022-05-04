import badges from "@/models/badges";

export const awardBadges = {
    props: {
        yarnCollection: {type: Array},
        patternCollection: {type: Array},
    },
    data() {
        return {
            badgeList: []
        }
    },
    methods: {
        awardBadges(yarnCollection, patternCollection) {
            let yarnLength = yarnCollection.length;
            let patternLength = patternCollection.length;
            if(yarnLength >= 1) {
                this.badgeList.push(badges.oneYarn);
            }
            if(yarnLength >= 5) {
                this.badgeList.push(badges.fiveYarn);
            }
            if(yarnLength >= 10) {
                this.badgeList.push(badges.tenYarn);
            }
            if(yarnLength >= 15) {
                this.badgeList.push(badges.fifteenYarn);
            }
            if(yarnLength >= 20) {
                this.badgeList.push(badges.twentyYarn);
            }
            if(yarnLength >= 30) {
                this.badgeList.push(badges.thirtyYarn);
            }

            if(patternLength >= 1) {
                this.badgeList.push(badges.onePattern);
            }
            if(patternLength >= 5) {
                this.badgeList.push(badges.fivePattern);
            }
            if(patternLength >= 10) {
                this.badgeList.push(badges.tenPattern);
            }
            if(patternLength >= 15) {
                this.badgeList.push(badges.fifteenPattern);
            }
            if(patternLength >= 20) {
                this.badgeList.push(badges.twentyPattern);
            }
            if(patternLength >= 30) {
                this.badgeList.push(badges.thirtyPattern);
            }
        }
    },
}