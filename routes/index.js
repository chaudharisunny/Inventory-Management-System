const express=require('express');
const router=express.Router()
const productController=require('../controller/products')
const categoryController=require('../controller/category')
const supplierController=require('../controller/supplier')
const userController=require('../controller/user')

router.get('/index',async(req,res)=>{
    res.json({message:'inventory'})
})

router.get('/product',productController.getProducts)
router.post('/postProduct',productController.postProducts)
router.put('/editProduct/:id',productController.editProducts)
router.delete('/deleteProduct/:id',productController.deleteProducts)

router.get('/category',categoryController.getCategory)
router.post('/postCategory',categoryController.postCategory)
router.put('/editCategory/:id',categoryController.editCategory)
router.delete('/deleteCategory/:id',categoryController.deleteCategory)

router.get('/supplier',supplierController.getSupplier)
router.post('/postSupplier',supplierController.postSupplier)
router.put('/editSupplier/:id',supplierController.editSupplier)
router.delete('/deleteSupplier/:id',supplierController.deleteSupplier)

router.get('/user',userController.getUser)
router.post('/postUser',userController.postUser)
router.post('/login',userController.loginUser)
router.get('/logout',userController.logout)

module.exports=router