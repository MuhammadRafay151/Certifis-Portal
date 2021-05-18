export default {
    data: () => {
        return {
            IsLoading: false,
            Error: "",
        }
    },
    methods: {

        ShowLoader() {
            this.IsLoading = true
        },
        ShowError(Msg) {
            this.Error = Msg
        },
        HideLoader() {
            this.IsLoading = false
        }
    }
}