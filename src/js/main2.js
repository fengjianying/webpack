require('../css/a.less');
require('../util/jqExtend');
var Handlebar = require('handlebars');
var source = $('#index').html();
var template = Handlebar.compile(source);
var data = {
    "name": "Alan",
    "hometown": "Somewhere, TX",
    "kids": [{
        "name": "Jimmy",
        "age": "12"
    }, {
        "name": "Sally",
        "age": "4"
    }]
};
var result = template(data);
$("#container").html(result);
console.log($.getObjectLength(data));