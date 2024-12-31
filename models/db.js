const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/inventory_management_system').then(()=>{
    console.log('database connect');
}).catch((error)=>{
    console.log(error);
    
})