const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://arnav:arnav@cluster0.rvpfie4.mongodb.net/fluttered-db?retryWrites=true&w=majority",{

}).then(()=>{
    console.log("connection is successful");
}).catch((error)=>{
    console.log(error);
});