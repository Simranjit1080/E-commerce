var products=[]; 
var cart=[];
var pid=0;
var panel=document.getElementById("prpanel");
var panellink=document.getElementById("panellink");
var link=document.getElementById("list");
var btns=document.getElementById("btns");
var cartdiv=document.getElementById("cart");
var cartlink=document.getElementById("cartlink");
var carthead=document.getElementById("carthead");
var btns2=document.getElementById("btns2");

var po;
var flag1=0;
var flag2=0;
var flag3=0;
var flag7=0;
var flagj=0;
// var  urls = {
// 	c:"/cart",
// 	p:"/products"
// }
var d=JSON.parse(localStorage.getItem("Products"));

if(d)
{
for(var i=0;i<d.length;i++)
{
	var k=new Object();
	k.name=d[i].name;
	k.desc=d[i].desc;
	k.price=d[i].price;
	k.quan=d[i].quan;
	products.push(k);
	var h=document.createElement("h4");
	var name=products[i].name;
	var desc=products[i].desc;
	var price=parseInt(products[i].price);
	var quan=parseInt(products[i].quan);
	var j=document.createTextNode("Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan);
	h.appendChild(j);
	var h1=document.createElement("h4");
	var del=document.createElement("button");
	del.innerHTML="Delete";
	del.setAttribute("class","dbtn");
	var upd=document.createElement("button");
	upd.innerHTML="Update";
	upd.setAttribute("class","ubtn");
	var atc=document.createElement("button");
	atc.innerHTML="Add to Cart";
	atc.setAttribute("class","atcbtn");
	h1.appendChild(del);
	h1.appendChild(upd);
	h1.appendChild(atc);
	list.appendChild(h);
	btns.appendChild(h1);
	pid++;
	del.addEventListener("click",function(event){
						delbtn(event);
	});
	upd.addEventListener("click",function(event){
						updbtn(event);
	});
	atc.addEventListener("click",function(event){
						
						atcbtn(event);	
						});
	pid++;
}
sendToServer(products);
}
var cartst=JSON.parse(localStorage.getItem("Cart"));
if(cartst)
{
	for(var i=0;i<cartst.length;i++)
	{
		var k=new Object();
	k.name=cartst[i].name;
	k.desc=cartst[i].desc;
	k.price=cartst[i].price;
	k.quan=cartst[i].quan;
	cart.push(k);
	}
	sendToCartServer(cart);
}
function paneldom()
{
	// unhide(panel);
	hide(panellink);
	var label=document.createElement("h3");
	label.innerHTML="ADD PRODUCT";
	panel.appendChild(label);
 var form=document.createElement("form");
form.setAttribute("action","javascript:void(0)");
form.setAttribute("onSubmit","addTojson();addToList();deleteNewProductPanel();unhide(panellink)");
	var textname=document.createElement("input");
	textname.setAttribute("type","text");
	textname.setAttribute("id","name");
	textname.setAttribute("placeholder","Enter the name of the product");
	textname.setAttribute("style","width:250px");
	textname.setAttribute("required","true");
	form.appendChild(textname);

 	blankline(form);
 	blankline(form);

 	var textdesc=document.createElement("input");
	textdesc.setAttribute("type","text");
	textdesc.setAttribute("id","desc");
	textdesc.setAttribute("placeholder","Enter the description");
	textdesc.setAttribute("style","width:250px");
	form.appendChild(textdesc);

	blankline(form);
 	blankline(form);

 	var textprice=document.createElement("input");
	textprice.setAttribute("type","number");
	textprice.setAttribute("id","price");
	textprice.setAttribute("min","0");
	textprice.setAttribute("placeholder","Enter the price");
	textprice.setAttribute("style","width:250px");
	textprice.setAttribute("required","true");
	form.appendChild(textprice);

	blankline(form);
 	blankline(form);

 	var textquan=document.createElement("input");
	textquan.setAttribute("type","number");
	textquan.setAttribute("id","quan");
	textquan.setAttribute("min","0");
	textquan.setAttribute("placeholder","Enter the quantity");
	textquan.setAttribute("style","width:250px");
	textquan.setAttribute("required","true");
	form.appendChild(textquan);

	blankline(form);
 	blankline(form);

 	var btn=document.createElement("button");
 	btn.setAttribute("type","submit");
 	btn.setAttribute("class","btn");
 	btn.innerHTML="SUBMIT";
 	form.appendChild(btn);

 	panel.appendChild(form);
}
function paneldom2(i)
{
	// unhide(panel);
	hide(panellink);
	po=i;
	flag1=1;
	var label=document.createElement("h3");
	label.innerHTML="UPDATE PRODUCT";
	panel.appendChild(label);
 var form=document.createElement("form");
form.setAttribute("action","javascript:void(0)");
form.setAttribute("onSubmit","upjson(po);deleteNewProductPanel();unhide(panellink);flag1=0");
	var textname=document.createElement("input");
	textname.setAttribute("type","text");
	textname.setAttribute("id","name2");
	textname.setAttribute("value",products[i].name);
	textname.setAttribute("style","width:250px");
	textname.setAttribute("required","true");
	form.appendChild(textname);

 	blankline(form);
 	blankline(form);

 	var textdesc=document.createElement("input");
	textdesc.setAttribute("type","text");
	textdesc.setAttribute("id","desc2");
	textdesc.setAttribute("value",products[i].desc);
	textdesc.setAttribute("style","width:250px");
	form.appendChild(textdesc);

	blankline(form);
 	blankline(form);

 	var textprice=document.createElement("input");
	textprice.setAttribute("type","number");
	textprice.setAttribute("id","price2");
	textprice.setAttribute("min","0");
	textprice.setAttribute("value",products[i].price);
	textprice.setAttribute("style","width:250px");
	textprice.setAttribute("required","true");
	form.appendChild(textprice);

	blankline(form);
 	blankline(form);

 	var textquan=document.createElement("input");
	textquan.setAttribute("type","number");
	textquan.setAttribute("id","quan2");
	textquan.setAttribute("min","0");
	textquan.setAttribute("value",products[i].quan);
	textquan.setAttribute("style","width:250px");
	textquan.setAttribute("required","true");
	form.appendChild(textquan);

	blankline(form);
 	blankline(form);

 	var btn=document.createElement("button");
 	btn.setAttribute("type","submit");
 	btn.setAttribute("class","btn");
 	btn.innerHTML="SUBMIT";

 	form.appendChild(btn);

 	panel.appendChild(form);


}
function deleteNewProductPanel()
{
   var childNodes = panel.childNodes;
   panel.removeChild(childNodes[1]);
   panel.removeChild(childNodes[1]);
}
function hide(i)
{
i.setAttribute("style","visibility:hidden")
}
function unhide(i)
{
i.setAttribute("style","visibility:visible");
}
function blankline(i)
{
	var j=document.createElement("br");
	i.appendChild(j);
}
function addTojson()
{
	for(var i=0;i<products.length;i++)
	{
	if(document.getElementById("name").value==products[i].name && document.getElementById("desc").value==products[i].desc && document.getElementById("price").value==products[i].price)
	{

		products[i].quan=parseInt(document.getElementById("quan").value)+parseInt(products[i].quan);
		var l=JSON.stringify(products);
		sendToServer(products);
		localStorage.setItem("Products",l);
		return;
		break;

	}
	}
	var ob=new Object();	
	ob.name=document.getElementById("name").value;
	ob.desc=document.getElementById("desc").value;
	ob.price=parseInt(document.getElementById("price").value);
	ob.quan=parseInt(document.getElementById("quan").value);
	products.push(ob);
	var json=JSON.stringify(products);
	sendToServer(products);
	localStorage.setItem("Products",json);

}
function upjson(l)
{

	
	products[l].name=document.getElementById("name2").value;
	products[l].desc=document.getElementById("desc2").value;
	products[l].price=parseInt(document.getElementById("price2").value);
	products[l].quan=parseInt(document.getElementById("quan2").value);
	var json=JSON.stringify(products);
	sendToServer(products);
	localStorage.setItem("Products",json);
	uplist(l);

}
function upjson2(l)
{

	
	// products[l].name=cart[l].name;
	// products[l].desc=cart[l].desc;
	// products[l].price=parseInt(cart[l].price);
	// products[l].quan=parseInt(cart[l].quan)
	flagj=0;
	var c;
	if(products.length>=1)
	{
	for(c=0;c<products.length;c++)
	{
		if(cart[l].name==products[c].name&&cart[l].desc==products[c].desc&&cart[l].price==products[c].price)
		{
			products[c].quan=products[c].quan+cart[l].quan;
			flagj=1;
			break;
		}
	}
	}
	if(flagj==0)
	{
	var lk=new Object();
	lk.name=cart[l].name;
	lk.desc=cart[l].desc;
	lk.price=parseInt(cart[l].price);
	lk.quan=parseInt(cart[l].quan);
	products.push(lk);
}
	var json=JSON.stringify(products);
	sendToServer(products);
	localStorage.setItem("Products",json);
	

	var h=document.createElement("h4");
	var name=cart[l].name;
	var desc=cart[l].desc;
	var price=parseInt(cart[l].price);
	var quan=parseInt(cart[l].quan);
	if(flagj==0)
	{
	var j=document.createTextNode("Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan);
	h.appendChild(j);
	var h1=document.createElement("h4");
	var del=document.createElement("button");
	del.innerHTML="Delete";
	del.setAttribute("class","dbtn");
	var upd=document.createElement("button");
	upd.innerHTML="Update";
	upd.setAttribute("class","ubtn");
	var atc=document.createElement("button");
	atc.innerHTML="Add to Cart";
	atc.setAttribute("class","atcbtn");
	h1.appendChild(del);
	h1.appendChild(upd);
	h1.appendChild(atc);
	list.appendChild(h);
	btns.appendChild(h1);
	pid++;
	del.addEventListener("click",function(event){
						delbtn(event);
	});
	upd.addEventListener("click",function(event){
						updbtn(event);
	});
	atc.addEventListener("click",function(event){
						atcbtn(event);
							
						});
}
else
{
	var parent = event.target.parentNode.parentNode;
						var child=event.target.parentNode;
						var k=Array.prototype.indexOf.call(parent.children,child);
						var lichi=list.childNodes;
						lichi[c+1].textContent="Name="+products[c].name+" Description="+products[c].desc+" Price="+products[c].price+" Quantity="+products[c].quan;
}
	var lichi2=cartdiv.childNodes;
	cartdiv.removeChild(lichi2[l]);
						var btchi2=btns2.childNodes;
						btns2.removeChild(btchi2[l]);
						cart.splice(l,1);
						
						var json=JSON.stringify(cart);
						sendToCartServer(cart);
						localStorage.setItem("Cart",json);

}
function uplist(k)
{
						var name=products[k].name;
						var desc=products[k].desc;
						var price=products[k].price;
						var quan=products[k].quan;
						var lichi=list.childNodes;
						lichi[k+1].textContent="Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan;
}
function addToList()
{
	for(var i=0;i<pid;i++)
	{
	if(document.getElementById("name").value==products[i].name && document.getElementById("desc").value==products[i].desc && document.getElementById("price").value==products[i].price)
	{
		var c=list.childNodes;
		if(c[i+1])
		{
		var name=document.getElementById("name").value;
		var desc=document.getElementById("desc").value;
		var price=parseInt(document.getElementById("price").value);
		var quan=parseInt(products[i].quan);
		if(c[i+1])

		c[i+1].textContent="Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan;
		return;
		break;
	}
	else
	{
		break;
	}

	}
	}
	var h=document.createElement("h4");
	var name=document.getElementById("name").value;
	var desc=document.getElementById("desc").value;
	var price=parseInt(document.getElementById("price").value);
	var quan=parseInt(document.getElementById("quan").value);
	var j=document.createTextNode("Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan);
	h.appendChild(j);
	var h1=document.createElement("h4");
	var del=document.createElement("button");
	del.innerHTML="Delete";
	del.setAttribute("class","dbtn");
	var upd=document.createElement("button");
	upd.innerHTML="Update";
	upd.setAttribute("class","ubtn");
	var atc=document.createElement("button");
	atc.innerHTML="Add to Cart";
	atc.setAttribute("class","atcbtn");
	h1.appendChild(del);
	h1.appendChild(upd);
	h1.appendChild(atc);
	list.appendChild(h);
	btns.appendChild(h1);
	pid++;
	del.addEventListener("click",function(event){
						delbtn(event);
	});
	upd.addEventListener("click",function(event){
						updbtn(event);
	});
	atc.addEventListener("click",function(event){
						
							atcbtn(event);
						});
}
function showCart()
{
	 if(flag2==0)

	{	
			carthead.innerHTML="CART";
	}		
	if(cart.length>=1)
	{
		cartdiv.innerHTML="";
		btns2.innerHTML="";
		for(var i=0;i<cart.length;i++)
		{
			var h=document.createElement("h4");
			var name=cart[i].name;
			var desc=cart[i].desc;
			var price=cart[i].price;
			var quan=cart[i].quan;
			var kl=document.createTextNode("Name="+name+" Description="+desc+" Price="+price+" Quantity="+quan);
			h.appendChild(kl);

			cartdiv.appendChild(h);
	 var h1=document.createElement("h4");
	var del=document.createElement("button");
	del.innerHTML="Delete";
	del.setAttribute("class","dbtn");
	h1.appendChild(del);
	btns2.appendChild(h1);
	del.addEventListener("click",function (event){
						var parent = event.target.parentNode.parentNode;
						var child=event.target.parentNode;
						var k=Array.prototype.indexOf.call(parent.children,child);
						upjson2(k);
						

	});
}
}
hide(cartlink);
	 flag2=1;
}
function delbtn(event)
{
	var parent = event.target.parentNode.parentNode;
						var child=event.target.parentNode;
						var k=Array.prototype.indexOf.call(parent.children,child);
						var lichi=list.childNodes;
						list.removeChild(lichi[k+1]);
						var btchi=btns.childNodes;
						btns.removeChild(btchi[k+1]);
						products.splice(k,1);
						sendToServer(products);
						var json=JSON.stringify(products);
						localStorage.setItem("Products",json);
						pid--;
}
function updbtn(event)
{
	var parent = event.target.parentNode.parentNode;
						var child=event.target.parentNode;
						var k=Array.prototype.indexOf.call(parent.children,child);
						if(flag1==0)
						{
						paneldom2(k);
					}
}
function atcbtn(event)
{
	var parent = event.target.parentNode.parentNode;
						var child=event.target.parentNode;
						var k=Array.prototype.indexOf.call(parent.children,child);
						flag7=0;
						if(products[k].quan>0)
						{
							var j=new Object();
							j.name=products[k].name;
							j.desc=products[k].desc;
							j.price=products[k].price;
							j.quan=1;
						if(cart.length>=1)
						{
							for(var b=0;b<cart.length;b++)
							{
								if(products[k].name==cart[b].name&&products[k].desc==cart[b].desc&&products[k].price==cart[b].price)
									{
										cart[b].quan=cart[b].quan+1;
										flag7=1;
										break;
									}
							}
						}
						if(flag7==0)
						{
						cart.push(j);
					}
						sendToCartServer(cart);
						var l=JSON.stringify(cart);
						localStorage.setItem("Cart",l);
						var lichi=list.childNodes;
						products[k].quan--;
						
						lichi[k+1].textContent="Name="+products[k].name+" Description="+products[k].desc+" Price="+products[k].price+" Quantity="+products[k].quan;
						var json=JSON.stringify(products);
						sendToServer(products);
						localStorage.setItem("Products",json);
					
						// flag2=0;
						// flag3=1;
						if(flag2==1)
						{
							showCart();

						}
					}
						
						else
						{
							alert("The product is out of stock!");
						}
}


  function sendToServer(i)
{
// xhttp.open("GET","http://api.github.com/repositories");
// xhttp.open("GET","http://localhost:4000/test?name=simran&age=19");
var xhttp = new XMLHttpRequest();
xhttp.open("POST","http://localhost:4000/addProduct");
xhttp.setRequestHeader("Content-type","application/json");
xhttp.send(JSON.stringify(i));
}
function sendToCartServer(i)
{
// xhttp.open("GET","http://api.github.com/repositories");
// xhttp.open("GET","http://localhost:4000/test?name=simran&age=19");
var xhttp = new XMLHttpRequest();
xhttp.open("POST","http://localhost:4000/addToCart");
xhttp.setRequestHeader("Content-type","application/json");
xhttp.send(JSON.stringify(i));
}