// App uses itunes api ( no key needed ) 
// Below app gets an artist name from user and gives the search results of albums by the artist from itunes store.

var express=require("express");
var app=express();
var request=require("request");
app.set("view engine", "ejs"); 

app.use(express.static('public'));

app.get("/",function(req,res){                      
    res.render("search_comments");
});


app.get("/results",function(req,res){
 var searchword=req.query.word;                    
 var url='https://itunes.apple.com/search?term='+searchword+'&limit=10';

 request(url,function(error,response,body){        
     if(!error && response.statusCode == 200){
       var parsedData = JSON.parse(body);           
       // res.send(parsedData);
       res.render("albumapp_comments",{parsedData:parsedData});   
     };
 });
});

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("server has started"); 
});