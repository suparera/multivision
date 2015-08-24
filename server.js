/**
 * Created by suparera on 21/08/2015.
 */
var express = require('express');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.configure(function() {
    app.set('views', _dirname + "/server/views");
    app.set('view engine', 'jade');

});

app.get('*/courses', function(req,res){
    res.render('index');
});