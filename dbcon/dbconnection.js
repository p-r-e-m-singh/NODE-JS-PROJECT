const {
    createConnection} = require('mysql')
    const db=createConnection({
    host:"localhost", user:"root", password:"", database:"nodetable",port:3308})
    db.connect((err)=>{
    if (err){
    console.log("Could not connect")
    }
    
    console.log("Connection Successful")
   
    
})
module.exports =db;