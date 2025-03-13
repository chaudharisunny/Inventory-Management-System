const Product=require('../models/products');

//all products
const getProducts=async(req,res)=>{
    try {
        const getAllProd=await Product.find()
        res.status(200).json({products:getAllProd})
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

//new product
const postProducts=async(req,res)=>{
   try {
          const { name,categoryId,supplierId,quantity,price } = req.body;
  
          if (!name||!categoryId||!supplierId||!quantity||!price) {
              return res.status(400).json({ message: 'all field are required' });
          }
  
          const newProduct = new Product({ name,categoryId,supplierId,quantity,price });
          const savedProduct = await newProduct.save();
  
          return res.status(201).json(savedProduct);
      } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Server error' });
      }
}

//update product
const editProducts=async(req,res)=>{
  try {
          const { name,categoryId,supplierId,quantity,price } = req.body; 
          const { id } = req.params; 
  
          if ( !name||!categoryId||!supplierId||!quantity||!price) {
              return res.status(400).json({ message: 'all field are required.' });
          }
  
          const updatedProduct = await Product.findByIdAndUpdate(
              id, 
              {name,categoryId,supplierId,quantity,price }, 
              { new: true } 
          );
  
          if (!updatedProduct) {
              return res.status(404).json({ message: 'product not found.' });
          }
  
          return res.status(200).json({message:'product update successfully',updatedProduct});
  
      } catch (error) {
          console.error(error); 
          return res.status(500).json({ message: 'Server error.' });
      }
}

//delete product
const deleteProducts=async(req,res)=>{
    try {
           const {id}=req.params;
           const deleteProduct=await Product.findByIdAndDelete(id);
           if(!deleteProduct){
              return res.status(401).json({message:'product not found'})
           }
          return res.status(201).json({message:'product deleted',deleteProduct})     
       } catch (error) {
           res.status(500).json({message:'server error'})
       }
      
}

module.exports={getProducts,postProducts,editProducts,deleteProducts}

