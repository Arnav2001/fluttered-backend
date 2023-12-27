const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3
    },
        email:{
            type:String,
            require:true,
            unique:[true, "Email id already present"],
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error("Invalid Email")
                }
            }
        },
        phone:{
            type:Number,
            min:10,
            required:true,
            unique:true
        },
        profession:{
            type:String,
            requrired: true
        },
        progress:{
            type:Number,
        }
    
})

const User = new mongoose.model('User', userSchema);

module.exports = User;