import badges from "@/models/badges";

export const awardBadges = {
    props: {
        yarnCount: {type: Number},
        favoritePatternCount: {type: Number},
        yarnUsedCount: {type: Number},
    },
    data() {
        return {
            badgeList: [],
        }
    },
    methods: {
        awardBadges(yarnCount, favoritePatternCount, yarnUsedCount) {
            // yarn stash badges
            if(yarnCount >= 1) { this.badgeList.push(badges.oneYarn); }
            if(yarnCount >= 5) { this.badgeList.push(badges.fiveYarn); }
            if(yarnCount >= 10) { this.badgeList.push(badges.tenYarn); }
            if(yarnCount >= 15) { this.badgeList.push(badges.fifteenYarn); }
            if(yarnCount >= 20) { this.badgeList.push(badges.twentyYarn); }
            if(yarnCount >= 30){ this.badgeList.push(badges.thirtyYarn); }

            // favorite pattern badges
            if(favoritePatternCount >= 1) { this.badgeList.push(badges.onePattern); }
            if(favoritePatternCount >= 5) { this.badgeList.push(badges.fivePattern); }
            if(favoritePatternCount >= 10) { this.badgeList.push(badges.tenPattern); }
            if(favoritePatternCount >= 15) { this.badgeList.push(badges.fifteenPattern); }
            if(favoritePatternCount >= 20) { this.badgeList.push(badges.twentyPattern); }
            if(favoritePatternCount >= 30) { this.badgeList.push(badges.thirtyPattern); }

            // yarn used badges
            if(yarnUsedCount >= 1) { this.badgeList.push(badges.oneUsed); }
            if(yarnUsedCount >= 5) { this.badgeList.push(badges.fiveUsed); }
            if(yarnUsedCount >= 10) { this.badgeList.push(badges.tenUsed); }
            if(yarnUsedCount >= 15) { this.badgeList.push(badges.fifteenUsed); }
            if(yarnUsedCount >= 20) { this.badgeList.push(badges.twentyUsed); }
            if(yarnUsedCount >= 30) { this.badgeList.push(badges.thirtyUsed); }
        }
    },
}