var express = require('express');
var request = require('request');
var router = express.Router();

/*GET home page */
router.get('/', function(req, res, next) {
    res.sendFile('index.html', {root: 'public'});
});

/* GET cities page. */
router.get('/cities', function(req, res, next) {
    // res.sendFile('index.html', { root:  'public' });
    console.log("In Cities");
    console.log(req.query);
    console.log(req.query.q);
    var fs = require('fs');
    fs.readFile(__dirname + '/cities.dat.txt',function(err,data) {
        if(err) throw err;
        var cities = data.toString().split("\n");
        
        var myRe = new RegExp("^" + req.query.q);
        console.log(myRe);
        
        var jsonresult = [];
        for(var i = 0; i < cities.length; i++) {
          var result = cities[i].search(myRe); 
          if(result != -1) {
            console.log(cities[i]);
            jsonresult.push({city:cities[i]});
          } 
        }   
        console.log(jsonresult);
        res.status(200).json(jsonresult);
    });
});

router.get('/def', function(req, res, next) {
    // res.sendFile('index.html', { root:  'public' });
    console.log("In Owl");
    console.log(req.query);
    console.log(req.query.q);
    var owlurl = "https://owlbot.info/api/v1/dictionary/" + req.query.q + "?format=json";
    console.log(owlurl);
    request(owlurl).pipe(res);
});

module.exports = router;