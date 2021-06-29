var express = require('express');
var mysql = require('mysql');
var bodyParser = require("body-parser");

var app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + "/public"));

var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   database: 'join_us'
});

// adding route

app.get('/', function(req, res)
{
    var q = 'SELECT COUNT(*) AS count FROM users;';
    
    connection.query(q, function(err, result)
    {
        if(err) throw err;
        
        var count = result[0].count;
        
        //res.send("We have " + count + " user(s)");    
        
        res.render("home", {count: count}); // render html file. (views/home.ejs)
    });
    console.log("SOMEONE REQUESTED main page.");
});

app.post('/register', function(req, res)
{
    var email = req.body.email;
    
    console.log("POST REQUEST SENT TO /register email is " + email);
    
    var person = {email:email};

    connection.query('INSERT INTO users SET ?', person, function(err, result)
    {
        if(err) throw err;
        console.log(result);
    });
    
    //res.send("Thanks for joining our wait list!");
    res.redirect("/");
});

// app.get('/joke', function(req, res)
// {
//     var joke = "<strong>What do you call a dog that does magic tricks?</strong><em> a labracadabrador.</em>";
//     res.send(joke);
//     console.log("SOMEONE REQUESTED /joke page.")
// });

// app.get('/random_num', function(req, res)
// {
//     var random_num = Math.floor(Math.random() * 10) + 1;
//     res.send("Your lucky number is " + random_num);
//     console.log("SOMEONE REQUESTED /random_num page.");
// });

// running server on port 8080.

app.listen(8080, function()
{
   console.log('Server running on 8080!');
});