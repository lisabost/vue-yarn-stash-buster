export const makeToast = {
    methods: {
        makeToast(message, title, color) {
            this.$bvToast.toast(message, {
                title: title,
                autoHideDelay: 3000,
                variant: color,
                appendToast: true
            })
        }
    }
}