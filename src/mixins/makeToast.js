export const makeToast = {
    methods: {
        makeToast(message, title, color) {
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 4000,
                variant: color,
                appendToast: true
            })
        }
    }
}