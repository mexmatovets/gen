//

//"QI:{3B0A4445-3F70-4a9d-8AA0-6CF7A61EFFBF}"

//var


var bracket_parse=function(txt,b,c,parser1,parser0)
{
   b=(b)?b:"'''";
   c=(c)?c:b;
   var parser1=(parser1)?parser1:JSON.stringify;
   
   var parser0=(parser0)?parser0:function(s){   
      return parser1(s.substr(lb,s.length-lb-lc));
     }
   

   var lb=b.length,lc=c.length;
   re= new RegExp('('+b+')(([.]|[^.])*?)('+c+')','g')
    return txt.replace(re,parser0);
}


var clone_object=function(o) {
   var i;
  var __clone__=arguments.callee;
  var newObj = (o instanceof Array) ? [] : {};
  for (i in o) 
  if(o.hasOwnProperty(i)) 
  {
    if (o[i] && typeof o[i] == "object") {
      newObj[i] = __clone__(o[i]);
    } 
	else newObj[i] = o[i];
  } 
  return newObj;
};


 this.JSON_marshal=function(context,_JSON)
{
    var _this=this;
	_JSON=(_JSON)?_JSON:JSON; 
	//var sctxt=((_context instanceof Object)&&(_context))?'_context.factories':'';
	var sctxt='_context.factories.';
	
	var _context=(function(context)
	{
	
       if(!context ) context ={};
	   
	   if(!context.factories)
	            context={factories:context};
				
	   if(!context.marshaler) context.marshaler=_this;
	   if(!context._JSON) context._JSON=_JSON;          
	    return context;
	})(context);
	
	
	
	
	
var zzoff=function(s) {  
 var i=s.indexOf('\0');
 return (i<0)?s:s.substr(0,i); 
}

var tozz=function(o)
{
  if(typeof(o)=="string") return o;
  var s='';
  for(var k in o)
   if(o.hasOwnProperty(k))
     s+=k+'='+o[k].toString()+'\0';                
   return s;
}

var tozz_escape=function(o)
{
  if(typeof(o)=="string") o=argzz(o);
  var s='';
  for(var k in o)
   if(o.hasOwnProperty(k))
     s+=encodeURIComponent(k)+'='+encodeURIComponent(o[k].toString())+';';                
     return s;
}

var argzz =function (str,eq,zero)
{
    //==
     eq=(eq)?eq:'\\=';
     zero=(zero)?zero:'\0';
     var re=new RegExp(eq);
     var sp=str.split(zero);       
      var o={};
     for( var n=0;n<sp.length;++n)
        if(re.exec(sp[n])&&(RegExp.leftContext)&&(!o.hasOwnProperty(RegExp.leftContext)))
            if(RegExp.leftContext[0]!=zero)
                  o[RegExp.leftContext]=RegExp.rightContext;   
      return o;
}

var argzz_1=function (str,zero)
{
       
     var re=new RegExp('\\=');
	 zero=(zero)?zero:'\0';
     var sp=str.split(zero);       
      var o=[sp[0]];
	 
     for( var n=1;n<sp.length;++n)
        if(re.exec(sp[n])&&(RegExp.leftContext))
            if(RegExp.leftContext[0]!='zero')
                  o[RegExp.leftContext]=RegExp.rightContext;   
      return o;
}

     
	if (!JSON_marshal.prototype.zzoff) {
	  JSON_marshal.prototype.zzoff=zzoff;
	  JSON_marshal.prototype.tozz=tozz;
	  JSON_marshal.prototype.tozz_escape=tozz_escape;
	  JSON_marshal.prototype.argzz_1=argzz_1;
	  JSON_marshal.prototype.argzz=argzz;
	  JSON_marshal.zzoff=zzoff;
	  JSON_marshal.tozz=tozz;
	  JSON_marshal.tozz_escape=tozz_escape;
	  JSON_marshal.argzz_1=argzz_1;
	  JSON_marshal.argzz=argzz;
	  	}
		
		
		
	var decode_filter=function(k,v)
	{
	    if(!(v&&v.__jsonclass__)) return v;
		
        var unmarshal=eval(sctxt+v.__jsonclass__[0]);
       var vo=unmarshal.apply(_context,v.__jsonclass__[1])
	   return vo;
	}

	

	var encode_filter=function(k,v)
	{
	   //ss= JSON.stringify(continents, function(k,v){ return (v instanceof Float32Array)?{"__jsonclass__":["fmo_constructor.unmarshal",[1]]}:v})
	       
       // if( v  instanceof Object) 
	   if( typeof(v)=='object') 
       {
		   
		   var factories=_context.factories;
		      
		   
		   for(var k in factories)
		      if(factories.hasOwnProperty(k))
		      {
			    var f=factories[k];
				if((f.query_marshal_class)&&(f.query_marshal_class(v)))
				{
     			     var params=f.marshal_key(v,_context.data);
					 
					 params=(v instanceof Array)?params:[params];//?? Xren kakato!!
					 var o={__jsonclass__:[k+".unmarshal",params]};
					 return o;					  
					 
     			 }
		   
			  }
       }	   
		   return v;
	       
	}
	
	
	
	_this.encode=function(o)
	{
	
	/*
	   var MarshalArray=function(){ }
	   
	   MarshalArray.prototype=new Array;
	   MarshalArray.prototype.pack=function(f,_JSON){ return pack(this,f,_JSON); }
	   
	   
	   var data=new MarshalArray(),str;
	   data.push('');
	   */
	   var data=[''];
	   
	   data.pack=function(f,_JSON){ return pack(this,f,_JSON);}
	   data.s_pack=function(_JSON){ return s_pack(this,_JSON);}
	   data.jspack=function(_JSON){ return jspack(this,_JSON);}
	   
	   
	   try
		{
		_context.data=data;
	      data[0]=_JSON.stringify(o,encode_filter);
		}
		finally
		{
	     _context.data=undefined;
        }
		
	   return data;
	}
	
	var pack=function(data,fno,_JSON)
	{
	  
	  for(var n=1;n<data.length;++n)
	    data[n]=n+'='+data[n].marshal(data[n].o,_JSON);
		return (fno)? data:data.join('\0');
	}
	
	var jspack=function(data,_JSON)
	{
	   if(!_JSON) _JSON=JSON;
	  for(var n=1;n<data.length;++n)
	    data[n]=data[n].marshal(data[n].o,_JSON);
		return data;
		 //data='["'+data.join('","')+'"]';
		 //return _JSON.stringifity(data);
	}
	var s_pack=function(data,_JSON)
	{
	  var sdata=[];
	  for(var n=1;n<data.length;++n)
	    sdata[n]=n+'='+data[n].marshal(data[n].o,_JSON);
		 data[0]=sdata.join('\0');
		 return data;		 
	}
	_this.pack=pack;
	_this.jspack=jspack;
	
	_this.decode=function(s,data)
	{
	   var o;
	   if(s instanceof Array)
	   {
	     data=s;
		 s=data[0];
	   }
	   else
	    {
         	   if(data)  s=zzoff(s);
			   else 
			   { 
			   //if(typeof(s)=='string')
			   data=argzz_1(s);
			   s=data[0];
		       }
		}
		
		try
		{
		_context.data=data;
	    o=_JSON.parse(s,decode_filter);
		 return o;
		}
		finally
		{
	     _context.data=undefined;
        }
		
	}
	
	_this.factories=function(){ return _context.factories; }
	
	

}

 new  JSON_marshal;
    

this.JSON_class_factory=function(_iclass)
{
   var  iclass=_iclass;
    this.query_marshal_class = function(o){ return o instanceof iclass ;} 
    this.marshal_key=function(o){ return o.ref();} 
    this.unmarshal = function(ind) { return new iclass(ind,this) }

}

this.JSON_function_factory=function()
{
   
    this.query_marshal_class = function(o){
	return (typeof(o)=='function')&&(o.__jsonref__);
	} 
    this.marshal_key=function(o){ 
	return (typeof(o.__jsonref__)=='function')? o.__jsonref__():o.toString(); 
	} 
    this.unmarshal = function(ind) { 
	  var fu=eval('['+ind+'][0]'); 
	  fu.__jsonref__=1;
	  return fu;
	}

}



this.JSON_RPC_marshaler=function (factories,_JSON)
			{
			  var  _jm= new JSON_marshal(factories,_JSON);
			      
                  this.marshaler=function(){ return _jm};			  
			      this.decode = function(f) { 
				   if(f&&f.unmarshal)
				   {
				      var s=f.unmarshal(0);
					    return _jm.decode(s,f);
				   }
				   else   return _jm.decode(f);
				  }
				  this.encode = function(o,f) {
				  
				   if(f&&f.marshal)
				   {
				      
				      return f.marshal(_jm.encode(o).s_pack());
				   }
				    else return _jm.encode(o).pack(f);
				  }
				  this.push_factories=function(o){		
				     var fl=_jm.factories();
					 for(k in o)
					 if(o.hasOwnProperty(k))
					 {
					    fl[k]=o[k];
					 }
      				  return this;
				  }
				  this.save_to_file=function(filename,o,marshaller)
				  {
				       if(!marshaller) marshaller=function(o){return o.pack()};
				     if(WebKitBlobBuilder)
					 {
					   
					   var bb=new WebKitBlobBuilder;
					   var s;//=_jm.encode(o); 
					   //s=(fjspack)?s.jspack():s.pack();
		   			   s=marshaller(_jm.encode(o));
					   bb.append(s);
					   var blob=bb.getBlob();
					   var siz=blob.size;
					   if(window.saveAs) 
					   {
					     window.saveAs(blob,filename);
					   }
					   else
					   {
					   var url=webkitURL.createObjectURL(blob);
					   window.open(url,'').onload=function(){ webkitURL.revokeObjectURL(url)};   
                       }
					 }
					   return siz;    
				 }
				  
							 
			}

this.XHRJsonRPC=function XHRJsonRPC(opts)			
{
      // var xhr=new 

}
