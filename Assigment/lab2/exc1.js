const dns=require("dns")
dns.resolve4('www.miu.edu',(err,ipAddress)=>{
    console.log(ipAddress)
})
  
