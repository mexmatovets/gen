VT_EMPTY = 0;
VT_NULL = 1;
VT_I2 = 2;
VT_I4 = 3;
VT_R4 = 4;
VT_R8 = 5;
VT_CY = 6;
VT_DATE = 7;
VT_BSTR = 8;
VT_DISPATCH = 9;
VT_ERROR = 10;
VT_BOOL = 11;
VT_VARIANT = 12;
VT_UNKNOWN = 13;
VT_DECIMAL = 14;
VT_I1 = 16;
VT_UI1 = 17;
VT_UI2 = 18;
VT_UI4 = 19;
VT_I8 = 20;
VT_UI8 = 21;
VT_INT = 22;
VT_UINT = 23;
VT_VOID = 24;
VT_HRESULT = 25;
VT_PTR = 26;
VT_SAFEARRAY = 27;
VT_CARRAY = 28;
VT_USERDEFINED = 29;
VT_LPSTR = 30;
VT_LPWSTR = 31;
VT_RECORD = 36;
VT_INT_PTR = 37;
VT_UINT_PTR = 38;
VT_FILETIME = 64;
VT_BLOB = 65;
VT_STREAM = 66;
VT_STORAGE = 67;
VT_STREAMED_OBJECT = 68;
VT_STORED_OBJECT = 69;
VT_BLOB_OBJECT = 70;
VT_CF = 71;
VT_CLSID = 72;
VT_VERSIONED_STREAM = 73;
VT_BSTR_BLOB = 0x0fff;
VT_VECTOR = 0x1000;
VT_ARRAY = 0x2000;
VT_BYREF = 0x4000;
VT_RESERVED = 0x8000;
VT_ILLEGAL = 0x0ffff;
VT_ILLEGALMASKED = 0x0fff;
VT_TYPEMASK = 0x0fff;




var fmo_pair=[[VT_R8,Float64Array],[VT_R4,Float32Array],[VT_I4,Int32Array],[VT_I2,Int16Array],[VT_I1,Int8Array],[VT_UI4,Uint32Array],[VT_UI2,Uint16Array],[VT_UI1,Uint8Array]];




var fmo_array=function fmo_array(o,sizes)
{
     var _this=this;
if(!fmo_array.prototype.get_index)
{
	 var get_index=function(a)
		{ 
		   if(!( a instanceof Array) ) return a;
		   var l=a.length;
		   var indx=a[0];
		   if(l!=this.sizes.length) throw new Error('fmo_pair array index error'); 
		   for(var n=1;n<l;++n) 
		           indx+=this._index_cache[n]*a[n];
   		   return indx;
		}
fmo_array.prototype.get_index=get_index;
fmo_array.prototype.getElement=function(ind){  return this.array[this.get_index(ind)];}
fmo_array.prototype.setElement=function(ind,value){  return this.array[this.get_index(ind)]=value;}


}	
		
	 var buf;
	 _this.__port_constructor__='fmo_array';
	 
	 if(o.__port_constructor__=='fmo_array')
	 {
	    _this._index_cache=o._index_cache;
	    _this.array=o.array;
		_this.sizes=o.sizes;
		_this.vt=o.vt;
		return ;
		//_this.get_index=get_index;		
	 }
	 
	 var find_vt=function(o) {  
	 for(var n=0;n<fmo_pair.length;++n) 
	       	 if(o.__proto__.constructor==fmo_pair[n][1]) 
			      return fmo_pair[n][0];
				  
			    return 0;
			 }
			 
	var check_constructor=function(c) {  
	 for(var n=0;n<fmo_pair.length;++n) 
	       	 if(c===fmo_pair[n][1]) 
			      return fmo_pair[n][0];
				  
			    return 0;
			 }		 
			 
	var find_constructor=function(vt) {  
	 for(var n=0;n<fmo_pair.length;++n) 
	       	 if(vt==fmo_pair[n][0]) 
			      return fmo_pair[n][1];
			 ; throw new Error('fmo_pair constructor error'); 
			 }
     
		//this.get_index=get_index;

      
	  var init_index_cache=function()
	  {
	   var indx=[1];
		for(var n=0;n<_this.sizes.length-1;++n){
		   indx[n+1]=indx[n]*_this.sizes[n];
		}
		_this._index_cache=indx;
	  }
	  
	  
	  
	  
	  if(o instanceof Array)
	  {
	      var array_constructor=(sizes)?sizes:Float32Array;
		  	        		
			if( !(( typeof(array_constructor)==='function')&&(this.vt=check_constructor(array_constructor))) ) 
					   throw new Error('fmo_pair type error'); 
			var nn=1;
              for(var d=0;d<o.length;++d) nn*=o[d];
			this.array= new array_constructor(nn);
			this.sizes=o;
			init_index_cache();
			return;
	  	  
	  }
	  
	  
	  buf=o.buffer;		
	 if((buf)&&(buf instanceof ArrayBuffer))
	   {
	    ;
		if(!(this.vt=find_vt(o)) )  throw new Error('fmo_pair type error'); 
		this.array=o;
		this.sizes=(sizes)?sizes:[o.length];
			
      	}
		else
		{ 
    	  var oo=eval('['+o+'][0]');
	     var TypeXXArray=find_constructor(oo.vt);
	  
	    //buf=new ArrayBuffer(oo.mem_size);
        buf=base64_bin.decode(oo.data.substring(7));
	    this.array=new TypeXXArray(buf);
	    this.vt=oo.vt;
	    this.vb_type=oo.vb_type;
	    this.sizes=oo.sizes;
       }
	
	    init_index_cache();
	/*
	  var indx=[1];
		for(var n=0;n<this.sizes.length-1;++n){
		   indx[n+1]=indx[n]*this.sizes[n];
		}
		this._index_cache=indx;
	*/	
		//this.vt_type=find_vt;
}


//fmo_array.prototype.getElement=function(ind){  return this.array[this.get_index(ind)];}
//fmo_array.prototype.setElement=function(ind,value){  return this.array[this.get_index(ind)]=value;}

fmo_array.vt_type=function(o)
 {  
     if (o instanceof Object)
	 {
	          for(var n=0;n<fmo_pair.length;++n) 
	       	  if(o.__proto__.constructor==fmo_pair[n][1]) 
			      return fmo_pair[n][0];				
    }
			    return 0;
 }

var binary_array_factory=
{
  unmarshal: function(s)
  {
        return new fmo_array(s);
  },
  marshal: function(o,data)
  {
        if(!(o instanceof fmo_array))
		   o=new fmo_array(o);
	 var m={vt:o.vt,mem_size:o.array.buffer.byteLength,element_size:o.array.BYTES_PER_ELEMENT,dim:o.sizes.length,sizes:o.sizes};	
    	 m.data='base64:'+base64_bin.encode(o.array.buffer);
		 return JSON_bin.stringify(m);//toJSON_binString();
		   
  },
  query_marshal_class: function(o)
  {
      return  (o instanceof fmo_array)||(fmo_array.vt_type(o));	  
  }
  


}

binary_array_factory.is_array=binary_array_factory.query_marshal_class;
binary_array_factory.encode=binary_array_factory.marshal;
binary_array_factory.decode=binary_array_factory.unmarshal;

var fmo_array_factory_html5=
{

  unmarshal: function(ind)
  {
        return new fmo_array(this.data[ind]);
  }
  
  
  ,query_marshal_class: function(o)
  {
      return  (o instanceof fmo_array)||(fmo_array.vt_type(o));	  
  }
  
   , marshal: function(o,_JSON)
  {
        
        if(!(o instanceof fmo_array))
		   o=new fmo_array(o);
	 var m={vt:o.vt,mem_size:o.array.buffer.byteLength,element_size:o.array.BYTES_PER_ELEMENT,dim:o.sizes.length,sizes:o.sizes};	
    	 m.data='base64:'+base64_bin.encode(o.array.buffer);
		 return ((_JSON)?_JSON:JSON).stringify(m);//toJSON_binString();
  }
  

 ,marshal_key: function(o,data)
  {
     
	 for(var k=1; k<data.length;++k)	   
	 	       if(data[k].o==o) return k;
			   
		data.push({o:o,marshal:fmo_array_factory_html5.marshal});
  	   return data.length-1;
   }

}
var fmo_array_factory= fmo_array_factory_html5;

var Tic=function()
{
    var ticcount=function (){ return (new Date).getTime();},
	tic=function(){  return ticcount()-t;}
     var t=(new Date)
	 this.ticcount=ticcount;
	 this.tic=tic;
	 this.sec=function(){ return tic()/1000;}
}

var zzoff=function(s) {  
 var i=s.indexOf('\0');
 return (i<0)?s:s.substr(0,i); 
}

tozz=function(o)
{
  if(typeof(o)=="string") return o;
  var s='';
  for(var k in o)
   if(o.hasOwnProperty(k))
     s+=k+'='+o[k].toString()+'\0';                
   return s;
}

tozz_escape=function(o)
{
  if(typeof(o)=="string") o=argzz(o);
  var s='';
  for(var k in o)
   if(o.hasOwnProperty(k))
     s+=encodeURIComponent(k)+'='+encodeURIComponent(o[k].toString())+';';                
     return s;
}
function argzz(str,eq,zero)
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

function argzz_1(str,zero)
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



