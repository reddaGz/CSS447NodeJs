Array.prototype.even=function(){
  for(let i=0;i<this.length;i++){
      if(this[i]%2!==0){
          this.splice(i,1);
          i--;
      }
  }  
}
Array.prototype.odd=function(){
    for(let i=0;i<this.length;i++){
        if(this[i]%2===0){
            this.splice(i,1);
            i--;
        }
    }  
  }
let arr=[1,2,67,22,44,13,15,12,24]
arr.even()
console.log(arr)