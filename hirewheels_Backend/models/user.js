const mongoose=require('mongoose');
const collections=require('../constants/collections')

const userSchema=new mongoose.Schema({
    _id:{type:mongoose.Schema.Types.ObjectId, auto:true, alias:'userId'},
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true, unique:true, lowercase:true},
    mobileNo:{type:Number, required:true, unique:true},
    roleName:{type:String, required:true , default:"USER"},
    walletMoney:{type:Number, default:100000},

    //Mandatory Columns
    createdDate:{type:Date, default:Date.now},//created date
    updatedDate:{type:Date, default:Date.now}, //Updated Date
    isActive:{type:Boolean, default:true}, //on/off flag
    deleted:{type:Boolean, default:false}, //soft delete flag
    comment:{type:String, default:null} // If any
})

const userModel=mongoose.model(collections.user,userSchema);

module.exports=userModel;