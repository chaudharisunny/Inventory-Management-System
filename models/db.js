const mongoose=require('mongoose');


const connectDB=async()=>{
    
    mongoose.connect('mongodb://localhost/inventory_management_system').then(()=>{
        console.log('database connect');
    }).catch((error)=>{
        console.log(error);
        
    })
}

module.exports=connectDB
