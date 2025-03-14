const mongoose=require('mongoose');

const supplierSchema=new mongoose.Schema({
   
    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    supplyCategory:{
        type:String,
        required:true
    },  
},{timestamps:true})

module.exports=mongoose.model('supplier',supplierSchema)