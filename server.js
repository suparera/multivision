/**
 * Created by suparera on 21/08/2015.
 */
var express = require('express');
var stylus = require('stylus');
var mongoose = require('mongoose');



// tell  development mode , or production mode, set default to 'development'
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();
var logger = require('morgan');
var bodyParser = require('body-parser');

function compile(str, path) {
    return stylus(str).set('filename', path);

}

// configure: express V.4 no need configure function, just set  it.
app.set('views', __dirname + "/server/views");
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser());
app.use(stylus.middleware({
    src:__dirname+'/public',
    compile: compile
}));
app.use(express.static(__dirname + '/public'));

/**Mongoose db connection
 * depend on env
 */

if(env==='development') {
    mongoose.connect('mongodb://localhost/multivision');
} else {
    mongoose.connect('mongodb://suparera:34erdfcv@ds041663.mongolab.com:41663/multivision');
}

//

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error....'));
db.once('open', function callback() {
    console.log('multivision db opened.')
});
// get scheama from mongodb
var messageSchema = mongoose.Schema({message: String});
var Messages = mongoose.model('messages', messageSchema);
var mongoMessage;
Messages.findOne(function(err, messageDoc) {
    if(err){
        console.log('Mongo find error.');
    }
    console.log('find found, message=' + messageDoc.message);
    mongoMessage = messageDoc.message;
    console.log('mongoMessage = '+mongoMessage)
});



app.get('/partials/:partialPath', function (req, res) {
    console.log("server.js partials render..");
    res.render('partials/' + req.params.partialPath);
});


//index page : route

app.get('*', function(req,res){
    console.log("* response on server.");
    res.render('index', {
        'mongoMessage':mongoMessage
    });
});

var port = process.env.PORT ||3030;
app.listen(port);
console.log('Listening on port ' + port + '...');