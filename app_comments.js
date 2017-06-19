// App uses itunes api ( no key needed ) 
// Below app gets an artist name from user and gives the search results of albums by the artist from itunes store.

var express=require("express");
var app=express();
var request=require("request");
app.set("view engine", "ejs"); 

app.use(express.static('public'));

app.get("/",function(req,res){                      //when root is hit in url , the form appears to user . user inputs search word on form .
    res.render("search_comments");
});


app.get("/results",function(req,res){
 var searchword=req.query.word;                    // note how search word is extracted from the form input from user. Why is this not req.body.word ????
 var url='https://itunes.apple.com/search?term='+searchword+'&limit=10';

 request(url,function(error,response,body){        // corresponding api is called to get the album list
     if(!error && response.statusCode == 200){
       var parsedData = JSON.parse(body);          // JSON.parse gives the body object 
       // res.send(parsedData);
       res.render("albumapp_comments",{parsedData:parsedData});   // the album list is rendered to the user by ejs 
     };
 });
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server has started"); 
});