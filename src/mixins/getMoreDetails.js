import axios from "axios";
import Pattern from "@/models/Pattern";

export const getMoreDetails = {
    props: {
        item: {Object},
    },
    data() {
        return {
            pattern: {}
        }
    },
    methods: {
        getMoreDetails(item) {
            if(item.id) {
                // build search arguments
                let patternId = item.id;
                let url = `https://api.ravelry.com/patterns/${patternId}.json`;
                let config = {
                    auth: {
                        username: 'd94df3344302c08b7079c71041d90bbb',
                        password: '01-eZUS5Q6kykGn0bribecD3ARfRU8stkMuOVi2I'
                    }
                }
                // execute ajax request
                axios.get(url, config)
                    .then(response => {
                        if(response != null) {
                            this.pattern = Object.assign(new Pattern, response.data.pattern)
                        }
                        else {
                            this.pattern = new Pattern();
                        }
                    })
                    .catch(error => {
                        console.log('Error finding pattern', error)
                    });
            }
        },
    }

}