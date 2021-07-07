const users=[]
 class User{
    constructor(userName,password,role){
        this.userName=userName;
        this.password=password;
        this.role=role;
    }
login(){
    return users.find(u=>u.userName===this.userName && u.password===this.password)
}
}
users.push(new User("redda","1234","admin"),new User("ezra","1235","member"))
module.exports=User;