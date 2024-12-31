const mongoose=require('mongoose')
const { Schema } = mongoose;

const productSchema=new mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    categoryId:{
        type: Schema.Types.ObjectId, ref: 'category',
        required:true
    },
    supplierId:{
        type: Schema.Types.ObjectId, ref: 'supplier',
        required:true
    },
    quantity:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    }
},{timestamps:true})

module.exports=mongoose.model('products',productSchema)