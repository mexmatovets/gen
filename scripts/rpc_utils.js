//

(function(obj)
{
  var _=function(s){return s;}
    if(!self.LPC) $require(_('LPC.js'))
   $require(_('RPC.js'),_("Base64Bin.js"),_("jsonrpc.js"),_("fmo_marshal.js"));
   var fdom=LPC.isDOM();
   
   fdom&&$require('FileSaver.js');
   
obj._xdr_=$require.xdr_get;
obj.__json_rpc__=new JSON_RPC_marshaler( {fmo_array_factory:fmo_array_factory_html5 });
obj.json_rpc=__json_rpc__;
obj.tic=new LPC.Tic;
obj.json_load=function(url){
     var data=obj._xdr_(url);
	 return obj.__json_rpc__.decode(data);
}
obj.json_save=function(data,fn){
     var data=obj.__json_rpc__.encode(data);
	 fn||(fn='undefined.jsonzz')
	 var b=new Blob([data]);
	 if(fdom) window.saveAs(b,fn);
	 else LPC.main.lexec('window.saveAs($0,$1)',b,fn);
}


}
)(self)