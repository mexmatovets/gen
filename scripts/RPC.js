
(
function()
{
   var for_each=LPC.for_each;
   self.gfra=0;
   
   function optdef(opt,key,value,nkey)
   {
     if(typeof(opt)=='object')
	 {
     if(typeof(nkey)=='undefined')
	 for_each(opt,function(k,v){
		  	  if(k==key){
			    value=v;
				return true;
               }
		})
	 else {
               	 nkey=(nkey<0)?key.length:nkey;
		for_each(opt,function(k,v){
		  
		  if(k.substr(0,nkey)==key)
		       {
			    value=v;
				return true;
               }			 
		
		});
		}
	 }	
		return value;
	 
   }
   
   this.SynchroRPC=function SynchroRPC(opts)
   {
    
   
   
   }
   
   
  this.RPC=function RPC(opts)
  {
    
     var _this=this
	 ,FF=new LPC.FF
	 ,sock
	 ,marshaler
	 ,finit_reply,
	 queue_data=[]
	 ,loop_id
	 ,connection_attr
	 ,fclosed,initial_script,log_buf='';
	 
	 var xdr_commander,xdr= new XMLHttpRequest(),xdr_url;
	 
  function ConnectionError(){
	    this.message='Disconnected';
		this.socket=sock;
	  };

	function safe_access (o)
	{
	   	  
	  for(var k=1;k<arguments.length;k++) {
	      if(typeof(o)!='object') return ;
	      o=o[arguments[k]] 
		  };
		  return o;
	}
	 
	 function socket_setup(so)
   {
   
   
   var hp,params={},ns_path;
   
     if(so instanceof WebSocket) 
	     return _this.socket=so;
           if(typeof(so)=='object')
	  {
	     _this.ref=so;
		 var hp=(so.url)?so.url:location.host;
		 params=optdef(so,'params');
		 if(!params)
         	 params=optdef(so,'arg',{},-1);
		 
		 finit_reply=params&&params.__on_open__;
         var sparams=(for_each(params,function(){return true}))?'?'+tozz_escape(params):'';
		var ns_path=(so.ns)?'/'+so.ns:'';
		 url=hp+ns_path+sparams;
		 
	   }
	   else url=so;
	   
	   _this.params=params;
       return _this.socket=new WebSocket('ws://'+url);
	    
	  
	}
   
       var opener=FF.create()
	   ,initer=FF.create()
	   ,closer=FF.create()
	   ,logport=(opts)?opts.logport:false;
	   
	   _this.$opener=opener;
	   _this.$initer=initer;
	   _this.$closer=closer;
	   _this.$events={opener:opener,initer:initer,closer:closer}
	   marshaler=(opts.marshaler)?opts.marshaler:self.__json_rpc__;
	   
	   
	   
	   var log=function(){};
	   
	   if(typeof(logport)=='object')
	   {
	      if(logport.postMessage)
	        log=function (o){ o&& logport.postMessage(o)}
			else if(logport.send)
			  log=function (o){ o&& logport.send(o);}
	   }
	   
	   //_this.log=log;
	   
	  if(opts.ws) 
	  {
       //sock= socket_setup(optdef(opts,'ws'));
	   	  sock= socket_setup(opts.ws);
	  sock.onopen=function(e)
	  {
	    loop_id=setInterval(loop,5);
	    opener.$resolve("connected");
		log("connected: "+sock.URL)
	  }
	  
	  sock.onclose=function(e)
	  {
	    fclosed=1;
	    clearInterval(loop_id); 
		log("disconnected")
	    closer.$resolve("disconnected");		
		FF.reject_all(new ConnectionError());
		
		
	  }
	  
	  
	    
	    
		function default_worker(worker_opts)
		{
		 xdr_commander=new LPC({worker:{name:"xdr_commander"}});
		 xdr_commander.$imports_to(worker_opts.imports);
		
		}
	  
	    function hook_message(rpc)
		{
		  return (_this.onmessage)&& (_this.onmessage(rpc));
		}
       function sock_onmessage(e)
	   {
	          var rpc=marshaler.decode(e.data);
			  hook_message(rpc);
		               FF.execute(rpc.id,rpc);
	   }
	   sock.onmessage=function(e)
	   {
	      sock.onmessage=sock_onmessage
		  		  
		  if(finit_reply)
		  {
		     connection_attr=argzz(e.data);
			 var x;
			 if(connection_attr&&(x=connection_attr.xdr_channel_url))
			 {			 
			        x=eval('['+x+'][0]');      
			 	    xdr_url='http://'+x.url[0]+'/'+x.url[1];
		     }
			 log("init: ["+sock.URL+"] xdr_url: "+xdr_url)
			 
			 //(opts.worker)&&( default_worker(opts.worker));
			 
			 
			 
		      initer.$resolve(connection_attr);
		  }
		   else    sock_onmessage(e)   
		   		  
	   }
	  
	  function loop()
	  {
	    if(queue_data.length)
		{
		  var f;
		       if(sock.bufferedAmount==0)
			   {
                   f= sock.send(queue_data.shift());				 
			  }
			  
			  if(sock.OPEN!=sock.readyState)
			  {
			     FF.reject_all(new ConnectionError());
			  }
			   
        }
	    
	  }
	  function send_data(data)
	  {
	    queue_data.push(data);
	  }
	  
	  
      _this.call=function()
     {
      var args = Array.apply(null, arguments); 
      var m=args.shift();	 
	  var f=FF.create();
	  if(fclosed) f.$reject(new ConnectionError())
	  var o={method:m,params:args,id:f.id()} ;
	     var data=marshaler.encode(o);
		 send_data(data);
        return f;	  
    }	  
	_this.close=function(){ sock.close();}
	
	
	
	
   }
   else 
   {
       var x;
     if(x=opts.xdr_url)
	 {
	   if(typeof(x)=='string') xdr_url=x
	   else     xdr_url='http://'+x.url[0]+'/'+x.url[1];
     }
	 initial_script=opts.init;
   }
    
	_this.xurl=function(){return xdr_url}
	function xdr_get(url)
	{
	    url||(url=xdr_url) 
	    xdr.open('GET',url,false);
		xdr.responseType='text';
		xdr.setRequestHeader('Accept','*/*');
		xdr.setRequestHeader('Content-Type',"text/plain");
		xdr.send('');
	    return xdr.response;
	}
	function send_recv_synchro(args,method_signature)
	{
	    if(!xdr_url) throw new RPC_Error('Synchro Channel not found');
		
        var m=args.shift();	 
		
	    xdr.open('POST',xdr_url,false);
		xdr.responseType='text';
		xdr.setRequestHeader('Accept','*/*');
		//xdr.setRequestHeader('Content-Type',"application/x-www-form-urlencoded")
		xdr.setRequestHeader('Content-Type',"text/plain");
		
		var id='^'+FF.iid();
		var o=(method_signature)?{method_id:m,params:args,id:id}:{method:m,params:args,id:id};
		var data=marshaler.encode(o);
		
		  
		  xdr.send(data);
		if( xdr.status == 200) 
		  return marshaler.decode(xdr.response);		
		  else throw RPC_Error({message:xdr.statusText,status:xdr.status});
	}
	
  function RPC_Error(err)
  {
     this.message=err.message;
	 this.stack=err.stack;
	 this.type=err.type;
	 this.status=err.status;
  }
	_this.xsr=_this.synchro_send_recv=function SynchroSendRecv(){ return send_recv_synchro(Array.apply(null, arguments) ) }              
	
	function SynchroCall(args,method_signature){	              
	
	            var r=send_recv_synchro(args,method_signature);
				if('log' in r)
				{ 
				  log(r.log);
				  _this.logmsg=r.log;
  			    }
				else _this.logmsg='';
				if(r.error) throw new RPC_Error(r.error);
				return r.result;
	  }
	  
	  _this.xcall=_this.synchro_call=function(){ return SynchroCall(Array.apply(null, arguments));};
	  
	  function unshift(n,a)
	  {
	        var args=LPC.to_array(a);
			args.unshift(n);
			return args;
	  }
	  
	  function rpc_register(_name,initscript)
	  {
	        var submethodlist=[];
	       var args=LPC.to_array(arguments);
		   args.shift();
	       var name=_name,
		       rpc_proc=function(){ return SynchroCall(unshift(name,arguments));}
			   
		   if(initscript)
		   {
		     SynchroCall(unshift('js',args));
			 rpc_proc.clear=function clear(){ SynchroCall(['js',name+'=undefined']);}
			 var s='var m='+name+',l=[]; for(var k in m){  if(m.hasOwnProperty(k) && typeof(m[k])=="function") l.push(k)}; l '
			 submethodlist=SynchroCall(['js',s])
		   }
		   		   
		   for(var k=0;k<submethodlist.length;k++)
		   {
		        var m=submethodlist[k];
		          rpc_proc[m]=rpc_register(name+'.'+m);
		  }
		   return rpc_proc;
	  
	  }
	  
  	  function rpc_register_ex()
	  {
	      var submethodlist=[],idm;
          var res=SynchroCall(unshift('__register_method_ex', arguments));
          idm=res.idm; 		  
	   	   var rpc_proc=(function(i){ var idm=i;return function(){ return SynchroCall(unshift(idm,arguments),1);}})(idm);		   
		   for(var k=0;k<res.mlist.length;k++)
		   {
		         var m=res.mlist[k];
		       rpc_proc[m]=(function(i){ var idm=i;return function(){ return SynchroCall(unshift(idm,arguments),1);}})([idm,m]);    
           }
		   return rpc_proc;
		  
	  
	  }
	  
	  _this.register=rpc_register;
	  _this.register_ex=rpc_register_ex;
	  
	  if(initial_script)
	  {
	    var a=LPC.line_array(initial_script);
		var cmd=a.shift();
	    var oc=new LPC.ObjectContext(a);
		oc.$t=oc.rpc=_this;
		oc.execOnce(cmd);
	  }
   
  }

self.openRPC=function openRPC(opts,worker_url)
{
  worker_url||(worker_url="../scripts/RPC_synchro_worker.js")
  var  lpc_controller=new LPC({worker:{url:worker_url}});  
  if(!opts) return lpc_controller;
   var r= lpc_controller.exec('initRPC($0,$pipe)',opts)
    r({fail:function(){ lpc_controller.terminate(); }
	   ,done: function(rd){ 
	     rd.lpc.closer(function() { 
	     lpc_controller.exec('initRPC.kill()');
   	   })
	     rd.rpc=lpc_controller;		 
	   }
	});
	
    return r;
  
}
  
}
)()