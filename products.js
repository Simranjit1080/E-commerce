var express=require("express");
var fs=require("fs");
var app=express();
// var cors=require("cors");
app.use(express.json());
fs.readFile("products.txt",(err,fdata)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("products:");
			console.log(JSON.parse(fdata));
		}		
	});
fs.readFile("cart.txt",(err,fdata)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{
			console.log("cart:");
			console.log(JSON.parse(fdata));
		}		
	});
app.use(express.static("shop"));
app.use(express.urlencoded({isextended:false}));

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
			var filedata=JSON.parse(fdata);
			
			// filedata.push(bodydata);
			// console.log(data.toString());
	fs.writeFile("cart.txt",JSON.stringify(bodydata),(err,data)=>{
		if(err)
		{
			console.log(err);
		}
		else
		{   
			
			res.send("appended");

		}
	});
	console.log("cart:");
	console.log(bodydata);
	}
	});
});

app.listen(4000,function(error){
	console.log(error,"start at 4000")
});