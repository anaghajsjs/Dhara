function Login()
{
    var username = document.getElementById("usrname").value;
    var pwd = document.getElementById("pwd").value;
    
    var data = SHA1(pwd);
    
    
    if(username == '' || pwd == '')
    {
        alert("Please fill all the login fields");
    }
    else
    {
        var strurl = 'http://www.zenaspirations.com/clients/dara/services/customer_login/'+username+'/'+SHA1(pwd);
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", strurl, false );
        xmlHttp.send( null );
    
        var jsonData = jQuery.parseJSON(xmlHttp.responseText);
        
        if(jsonData.id)
        {
            localStorage.setItem("userid", jsonData.id);
            
            document.location.href = "category.html";
        }
    }
}

function Register()
{
    var username = document.getElementById("usrname").value;
    var name = document.getElementById("name").value;
    var pwd = document.getElementById("pwd").value;
    
    if(username == '' || pwd == '')
    {
        alert("Please fill all the login fields");
    }
    else
    {
        var strurl = 'http://www.zenaspirations.com/clients/dara/services/customer_register/'+username+'/'+SHA1(pwd)+'/'+name;
        
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", strurl, false );
        xmlHttp.send( null );
    
        var jsonData = jQuery.parseJSON(xmlHttp.responseText);
        
        if(jsonData.id)
        {
            localStorage.setItem("userid", jsonData.id);
            
            document.location.href = "category.html";
        }  
    }
}

function GetcategoryList()
{
    var category_id = [];
    var category_name = [];
    var category_pic = [];
            
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/productcategories_list';
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
    
    var jsonData = JSON.parse(xmlHttp.responseText);
    $.each( jsonData, function ( key, value )
    {
        category_id.push(value.id);
        category_name.push(value.name);
        category_pic.push(value.picture);
    });    
    localStorage.setItem("categoryids", category_id);
    localStorage.setItem("categorynames", category_name);
    localStorage.setItem("categorypics", category_pic);
    
    
    
    var $ul = $( '<ul id="cgrylist">' );
    $('#cgrylist').empty();
    for(i=0; i < category_id.length; i++)
    {
        $("#cgrylist").append('<li id="menuli" name="head"><a href="sublist.html" rel="external"><div class="firstdiv"><img src="'+category_pic[i]+'" class="imground" alt=""/></div><div class="middlediv"><h2 id="cgryname"> '+category_name[i]+' </h2></div><div class="lastdiv"><img src="images/plus.png" class="plusclass" alt=""/></div></li>' );
    }
    $('#cgrylist').listview('refresh');
    
    $('#cgrylist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("categoryindex", index);
    });
}

function GetProductList()
{
    var cgryindex;
    cgryindex=localStorage.getItem("categoryindex");
    
    var catgname = localStorage.getItem("categorynames");
    var namelist = new Array();
    namelist = catgname.split(",");
    var cgtry_id = localStorage.getItem("categoryids");
    var idlist = new Array();
    idlist = cgtry_id.split(",");
    
    document.getElementById("producthead").innerHTML = namelist[cgryindex];
    
    var product_id = [];
    var product_name = [];
    var product_pic = [];
    
    var categoryid = 11;
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/productsofcat/'+idlist[cgryindex];
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
    
    var jsonData = JSON.parse(xmlHttp.responseText);
    $.each( jsonData, function ( key, value )
    {
        product_id.push(value.id);
        product_name.push(value.name);
        product_pic.push(value.picture);
    });    
    localStorage.setItem("productids", product_id);
    localStorage.setItem("productnames", product_name);
    localStorage.setItem("productpics", product_pic);
    
    var $ul = $( '<ul id="productlist">' );
    $('#productlist').empty();
    for(i=0; i < product_id.length; i++)
    {
        $("#productlist").append('<li id="menuli" name="head"><a href="product.html" data-transition="slide" rel="external"><div class="firstdiv"><img src="'+product_pic[i]+'" class="imground" alt=""/></div><div class="middlediv"><h2 id="prodname"> '+product_name[i]+' </h2><p id="proddesc"> '+product_name[i]+' </p></div><div class="lastdiv"><img src="images/plus.png" class="plusclass" alt=""/></div></li>' );
    }
    $('#productlist').listview('refresh');
    
    $('#productlist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("productindex", index);
    });
}

function Getcategorydetails()
{
    var categoryid = 10;
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/productcategory/'+categoryid;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
}

function Getproductdetails()
{
    var id;
    var name;
    var descr;
    var price;
    var unit;
    var unitid;
    var minlot;
    var picture;
    var status;
    var productid = 1;
    
    var prodindex;
    prodindex=localStorage.getItem("productindex");
    
    var prodnames = localStorage.getItem("productnames");
    var namelist = new Array();
    namelist = prodnames.split(",");
    var prod_ids = localStorage.getItem("productids");
    var idlist = new Array();
    idlist = prod_ids.split(",");
    
   // document.getElementById("producthead").innerHTML = namelist[prodindex];
    
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/product/'+idlist[prodindex];
    
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
    var jsonData = JSON.parse(xmlHttp.responseText);
    
    id = jsonData.id;
    name = jsonData.name;
    descr = jsonData.descr;
    price = jsonData.price;
    unit = jsonData.unit;
    minlot = jsonData.minlot;
    picture = jsonData.picture;
    status = jsonData.status;
    unitid = jsonData.unitid;
           
    localStorage.setItem("selectedid", id);
    localStorage.setItem("selectedname", name);
    localStorage.setItem("selecteddescr", descr);
    localStorage.setItem("selectedprice", price);
    localStorage.setItem("selectedunit", unit);
    localStorage.setItem("selectedunitid", unitid);
    localStorage.setItem("selectedminlot", minlot);
    localStorage.setItem("selectedpic", picture);
    localStorage.setItem("selectedstatus", status);

    document.getElementById("prodimg").src=picture;
    document.getElementById("prodname").innerHTML = name;
    document.getElementById("prodprice").innerHTML = price;
}

function AddtoCart()
{
    if(isNaN(myForm.quantity.value))
    {
        alert("Invalid data format.\n\nOnly numbers are allowed.");
        myForm.quantity.focus();
    }
    
    var selid = localStorage.getItem("selectedid");
    var userid = localStorage.getItem("userid");
    var unitid = localStorage.getItem("selectedunitid");
    var ordermasterid;
 /*   var idlist = [];
    var piclist = [];
    var prodlist = [];
    var qtylist = [];
    var pricelist = []; 
    
    if(localStorage.getItem("addedids"))
    {
        idlist.push(localStorage.getItem("addedids"));
        piclist.push(localStorage.getItem("addedpics"));
        prodlist.push(localStorage.getItem("addednames"));
        qtylist.push(localStorage.getItem("addedqtys"));
        pricelist.push(localStorage.getItem("addedprices"));      
    }*/
                
    var product = document.getElementById("prodname").innerHTML;
    var price = document.getElementById("prodprice").innerHTML;
    var qty = document.getElementById("quantity").value;
    var totalprice;
    totalprice = price * qty;
    var unit = 'kg';

  /*   idlist.push(localStorage.getItem("selectedid"));
    piclist.push(localStorage.getItem("selectedpic"));
    prodlist.push(document.getElementById("prodname").innerHTML);
    pricelist.push(totalprice);
    qtylist.push(document.getElementById("quantity").value);
    
    
    localStorage.setItem("addedids", idlist);
    localStorage.setItem("addednames", prodlist);
    localStorage.setItem("addedqtys", qtylist);
    localStorage.setItem("addedprices", pricelist);
    localStorage.setItem("addedpics", piclist);*/
  
    var ormid = localStorage.getItem("ordermasterid");
  
    if (ormid)
    {
        ordermasterid = ormid;
    
        var strurl = 'http://www.zenaspirations.com/clients/dara/services/order_addtocart/'+ordermasterid+'/'+userid+'/'+selid+'/'+qty+'/'+unitid+'/'+totalprice;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", strurl, false );
        xmlHttp.send( null );

        
        var jsonDatanew = jQuery.parseJSON(xmlHttp.responseText);
       
        if(jsonDatanew.id)
        {
            alert ('Item Added to cart successfully');
            document.location.href = "cart.html";
        }
    }
    else
    {
        var strurl = 'http://www.zenaspirations.com/clients/dara/services/order_comit/'+userid;
    
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", strurl, false );
        xmlHttp.send( null );
    
        var jsonData = jQuery.parseJSON(xmlHttp.responseText);
        
        if(jsonData.id)
        {
            ordermasterid = jsonData.id;
            localStorage.setItem("ordermasterid", jsonData.id);
            
            var strurl = 'http://www.zenaspirations.com/clients/dara/services/order_addtocart/'+ordermasterid+'/'+userid+'/'+selid+'/'+qty+'/'+unitid+'/'+totalprice;
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", strurl, false );
            xmlHttp.send( null );

            
            var jsonDatanew = jQuery.parseJSON(xmlHttp.responseText);
       
            if(jsonDatanew.id)
            {
                alert ('Item Added to cart successfully');
                document.location.href = "cart.html";
            }
        }
    }
}

function GetcartItems()
{
  /*  if(localStorage.getItem("addedids"))
    {
        var id = localStorage.getItem("addedids");
        var idlist = new Array();
        idlist = id.split(",");
    
        var pics = localStorage.getItem("addedpics");
        var piclist = new Array();
        piclist = pics.split(",");
    
        var product = localStorage.getItem("addednames");
        var prodlist = new Array();
        prodlist = product.split(",");
    
        var qty = localStorage.getItem("addedqtys");
        var qtylist = new Array();
        qtylist = qty.split(",");
    
        var totalprice = localStorage.getItem("addedprices");
        var pricelist = new Array();
        pricelist = totalprice.split(",");
    }
    else
    {
        alert('Cart Empty');
    }*/
  
    document.getElementById("PlaceOrder").style.display='none';
  
    var i;
    var idlist = [];
    var unitlist = [];
    var prodlist = [];
    var qtylist = [];
    var pricelist = [];
    var piclist = []; 
  
    var userid = localStorage.getItem("userid");
  
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/viewcart/'+userid;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
        
    var jsonData = JSON.parse(xmlHttp.responseText);
    
    $.each( jsonData, function ( key, value )
    {
        idlist.push(value.product_id);
        unitlist.push(value.unit);
        prodlist.push(value.product);
        qtylist.push(value.qty);
        pricelist.push(value.price);
    });
       
    if (idlist.length == 0)
    {
        alert('Cart Empty');
    }
    else
    {
        for (i = 0; i < idlist.length; i++)
        {
            var strurl = 'http://www.zenaspirations.com/clients/dara/services/product/'+idlist[i];
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "GET", strurl, false );
            xmlHttp.send( null );
            var jsonData = JSON.parse(xmlHttp.responseText);
            piclist.push(jsonData.picture);
        }
    }
    
    var $ul = $( '<ul id="cartlist">' );
    $('#cartlist').empty();
    for(i=0; i < idlist.length; i++)
    {
        $("#cartlist").append('<li id="menuli" name="head"><a href="Order.html" data-transition="slide" rel="external"><div class="firstdiv"><img src="'+piclist[i]+'" class="imground" alt=""/></div><div class="middlediv"><h2 id="prodname"> '+prodlist[i]+' </h2><p id="proddesc"> '+'Price:'+pricelist[i]+' Rs'+' </p></div><div class="lastdiv"><img src="images/plus.png" class="plusclass" alt=""/></div></li>' );
    }
    
    $('#cartlist').listview('refresh');
    
    $('#cartlist').delegate('li', 'tap', function ()
    {
        var index = $(this).index();
        localStorage.setItem("cartindex", index);
    });
 
 if (idlist.length != 0)
 {
    document.getElementById("PlaceOrder").style.display='block';
 }
 
  /*  var strurl = 'http://www.zenaspirations.com/clients/dara/services/viewcart/'+ordermasterid;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
    
 */
 
}

function GetCartDetails()
{
    var cartindex;
    cartindex=localStorage.getItem("cartindex");
    
    var id = localStorage.getItem("addedids");
    var idlist = new Array();
    idlist = id.split(",");
    
    var pics = localStorage.getItem("addedpics");
    var piclist = new Array();
    piclist = pics.split(",");
    
    var product = localStorage.getItem("addednames");
    var prodlist = new Array();
    prodlist = product.split(",");
    
    var qty = localStorage.getItem("addedqtys");
    var qtylist = new Array();
    qtylist = qty.split(",");
    
    var totalprice = localStorage.getItem("addedprices");
    var pricelist = new Array();
    pricelist = totalprice.split(",");
    
    localStorage.setItem("orderprodid", idlist[cartindex]);
    document.getElementById("producthead").innerHTML = prodlist[cartindex];
    document.getElementById("prodimg").src=piclist[cartindex];
    document.getElementById("prodname").innerHTML = prodlist[cartindex];
    document.getElementById("prodqty").innerHTML = qtylist[cartindex];
    document.getElementById("prodtprice").innerHTML = pricelist[cartindex];
}

function Placeshipto()
{
    document.location.href = "shipping.html";
}

function PlaceOrder()
{
    var id;
    var name;
    var price;
    var qty;
    
    var ormid = localStorage.getItem("ordermasterid");
    
    var name = document.getElementById("name").value;
    var address = document.getElementById("address").value;
    var phone = document.getElementById("phone").value;
    var email = document.getElementById("email").value;
    
    if(name == '' || address == '' || phone == '' || email == '')
    {
        alert("Please fill all the fields");
    }
    else
    {
        var fuladress = name + ',' + address;
    
        var address = 'addrss';
    
        var strurl = 'http://www.zenaspirations.com/clients/dara/services/order_checkout/'+ormid+'/'+fuladress+'/'+phone;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", strurl, false );
        xmlHttp.send( null );
    
        var jsonData = jQuery.parseJSON(xmlHttp.responseText);

        if (jsonData.status)
        {
            localStorage.removeItem("ordermasterid");
            document.location.href = "category.html";
        }
    }
}

function OrderAddToCart()
{
    var ordermasterid = 2;
    var customerid = 181;
    var productid = 4;
    var unit = 1;
    var price = 250;
    var qty = 10;
    
   /* id = localStorage.getItem("orderprodid");
    name = document.getElementById("prodname").innerHTML;
    qty = document.getElementById("prodqty").innerHTML;
    price = document.getElementById("prodtprice").innerHTML;*/
    
    var strurl = 'http://www.zenaspirations.com/clients/dara/services/order_addtocart/'+ordermasterid+'/'+customerid+'/'+productid+'/'+qty+'/'+unit+'/'+price;
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", strurl, false );
    xmlHttp.send( null );
    
    
}




function SHA1(msg)
{
  function rotate_left(n,s)
  {
    var t4 = ( n<<s ) | (n>>>(32-s));
    return t4;
  };
  
  function lsb_hex(val)
  {
    var str="";
    var i;
    var vh;
    var vl;
    for( i=0; i<=6; i+=2 )
    {
      vh = (val>>>(i*4+4))&0x0f;
      vl = (val>>>(i*4))&0x0f;
      str += vh.toString(16) + vl.toString(16);
    }
    return str;
  };
  
  function cvt_hex(val)
  {
    var str="";
    var i;
    var v;
    for( i=7; i>=0; i-- )
    {
      v = (val>>>(i*4))&0x0f;
      str += v.toString(16);
    }
    return str;
  };
  
  function Utf8Encode(string)
  {
    string = string.replace(/\r\n/g,"\n");
    var utftext = "";
    for (var n = 0; n < string.length; n++)
    {
      var c = string.charCodeAt(n);
      if (c < 128)
      {
        utftext += String.fromCharCode(c);
      }
      else if((c > 127) && (c < 2048))
      {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      }
      else
      {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  };
  
  var blockstart;
  var i, j;
  var W = new Array(80);
  var H0 = 0x67452301;
  var H1 = 0xEFCDAB89;
  var H2 = 0x98BADCFE;
  var H3 = 0x10325476;
  var H4 = 0xC3D2E1F0;
  var A, B, C, D, E;
  var temp;
  msg = Utf8Encode(msg);
  var msg_len = msg.length;
  var word_array = new Array();
  for( i=0; i<msg_len-3; i+=4 )
  {
    j = msg.charCodeAt(i)<<24 | msg.charCodeAt(i+1)<<16 |
    msg.charCodeAt(i+2)<<8 | msg.charCodeAt(i+3);
    word_array.push( j );
  }
  
  switch( msg_len % 4 )
  {
    case 0:
      i = 0x080000000;
    break;
    case 1:
      i = msg.charCodeAt(msg_len-1)<<24 | 0x0800000;
    break;
    case 2:
      i = msg.charCodeAt(msg_len-2)<<24 | msg.charCodeAt(msg_len-1)<<16 | 0x08000;
    break;
    case 3:
      i = msg.charCodeAt(msg_len-3)<<24 | msg.charCodeAt(msg_len-2)<<16 | msg.charCodeAt(msg_len-1)<<8  | 0x80;
    break;
  }
  
  word_array.push( i );
  while( (word_array.length % 16) != 14 ) word_array.push( 0 );
  word_array.push( msg_len>>>29 );
  word_array.push( (msg_len<<3)&0x0ffffffff );
  for ( blockstart=0; blockstart<word_array.length; blockstart+=16 )
  {
    for( i=0; i<16; i++ ) W[i] = word_array[blockstart+i];
    for( i=16; i<=79; i++ ) W[i] = rotate_left(W[i-3] ^ W[i-8] ^ W[i-14] ^ W[i-16], 1);
    A = H0;
    B = H1;
    C = H2;
    D = H3;
    E = H4;
    for( i= 0; i<=19; i++ )
    {
      temp = (rotate_left(A,5) + ((B&C) | (~B&D)) + E + W[i] + 0x5A827999) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=20; i<=39; i++ )
    {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0x6ED9EBA1) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=40; i<=59; i++ )
    {
      temp = (rotate_left(A,5) + ((B&C) | (B&D) | (C&D)) + E + W[i] + 0x8F1BBCDC) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    for( i=60; i<=79; i++ )
    {
      temp = (rotate_left(A,5) + (B ^ C ^ D) + E + W[i] + 0xCA62C1D6) & 0x0ffffffff;
      E = D;
      D = C;
      C = rotate_left(B,30);
      B = A;
      A = temp;
    }
    H0 = (H0 + A) & 0x0ffffffff;
    H1 = (H1 + B) & 0x0ffffffff;
    H2 = (H2 + C) & 0x0ffffffff;
    H3 = (H3 + D) & 0x0ffffffff;
    H4 = (H4 + E) & 0x0ffffffff;
  }
  var temp = cvt_hex(H0) + cvt_hex(H1) + cvt_hex(H2) + cvt_hex(H3) + cvt_hex(H4);

  return temp.toLowerCase();
}