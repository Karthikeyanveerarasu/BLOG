const express = require("express");
const Login = express.Router();

module.exports = function(con){
    Login.post("/",(req,res)=>{
        const { email , password} = req.body;
    con.query("SELECT id,name FROM login WHERE email = ? and password =?",[email,password],(err,result)=>{
        if(err){
            console.log(err);
            return
        }
        if(result && result.length >0){
            return res.send(result)
        }
        else{
            return res.send({loginfailed : "wrong credentials"})
        }
    })
    })
    return Login
}