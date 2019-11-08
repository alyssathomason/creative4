let app = new Vue({
    el: '#app',
    data: {
        cities: [],
        prefix: '',
        owlform: '',
        definition: []
    },
    methods: {
        fetchREST() {
            console.log("In Fetch " + this.prefix);
            var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
            console.log("URL " + url);
            fetch(url)
                .then((data) => {
                    return (data.json());
                })
                .then((citylist) => {
                    console.log("CityList");
                    console.log(citylist);
                    this.cities = [];
                    for (let i = 0; i < citylist.length; i++) {
                        console.log(citylist[i].city);
                        this.cities.push({ name: citylist[i].city });
                    };
                    console.log("Got Citylist");
                });
        },
        owlREST() {
            console.log("In Fetch " + this.owlform);
            var port = ":4200";
            var url = "http://labs.athomsites.com" + port + "/def/?q=" + this.owlform;
            // var url = "https://owlbot.info/api/v1/dictionary/" + this.owlform +"?format=json";
            console.log("URL " + url);
            fetch(url)
                .then((data) => {
                    return (data.json());
                })
                .then((def) => {
                    console.log("Definition");
                    console.log(def);
                    this.definition = [];
                    for (let i = 0; i < def.length; i++) {
                        this.definition.push({ type: def[i].type, definition: def[i].defenition, example: def[i].example });
                    };
                });
        },
        consoleClick() {
            console.log('Button clicked');
        },
        alertClick() {
            alert('Button clicked');
        }
    }
});