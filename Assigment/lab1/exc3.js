function slow(callback){ 
  setTimeout(()=>{
    for(let i=0; i<= 5e8; i++){
    }
  })
  let random=Math.random();	
	if ( random> 0.5) { 	
		return callback("Error",null) 
	} 
  return callback(null, {id:12345}) 
} 

function exec(fn){ 
function callBack(err,data){
     if(!err)
        return  data;
    return err;
 }
let result=fn(callBack);
  return {
      done:function(cb){
          if(result==="Error")
              cb(result) 
        return this;
      },
      fail:function(cb){
          if(result!=="Error")
          cb(result)
          return this;
      }
  }  
}
exec(slow).done(function(data){ console.log(data); })
	.fail(function(err){ console.log("Error: " + err); }); 