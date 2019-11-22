var express=require("express");
var fs=require("fs");
var app=express();
// var cors=require("cors");
app.use(express.json());
app.use(express.urlencoded({isextended:false}));
app.use(express.static("shop"));
app.post("/addProduct",function(req,res){
	var bodydata=req.body;
	fs.readFile("products.txt",(err,fdata)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{   
	fs.writeFile("products.txt",JSON.stringify(bodydata),(err,data)=>{
		if(err)
		{
			console.log(err);
		}
	});
	console.log("products:");
	console.log(bodydata);
	}
	});
	res.end();
});
app.post("/addToCart",function(req,res){
	var bodydata=req.body;
	fs.readFile("cart.txt",(err,fdata)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{ 
	fs.writeFile("cart.txt",JSON.stringify(bodydata),(err,data)=>{
		if(err)
		{
			console.log(err);
		}
	});
	console.log("cart:");
	console.log(bodydata);
	}
	});
	res.end();
});

app.listen(4000,function(error){
	console.log(error,"start at 4000")
});