const category=require('../models/category');

const getCategory=async(req,res)=>{

    res.json({message:'all category here...'})
}

const postCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        if (!categoryName) {
            return res.status(400).json({ message: 'Category name is required' });
        }

        const newCategory = new category({ categoryName });
        const savedCategory = await newCategory.save();

        return res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const editCategory=async(req,res)=>{

    try {
        const { categoryName } = req.body; 
        const { id } = req.params; 

        if ( !categoryName) {
            return res.status(400).json({ message: 'Category ID and name are required.' });
        }

        const updatedCategory = await category.findByIdAndUpdate(
            id, 
            { categoryName }, 
            { new: true } 
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found.' });
        }

        return res.status(200).json(updatedCategory);

    } catch (error) {
        console.error(error); 
        return res.status(500).json({ message: 'Server error.' });
    }

}

const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const deleteCategory=await category.findByIdAndDelete(id);
        if(!deleteCategory){
           return res.status(401).json({message:'category not found'})
        }
       return res.status(201).json({message:'category deleted',deleteCategory})     
    } catch (error) {
        res.status(500).json({message:'server error'})
    }
   
}

module.exports={getCategory,postCategory,editCategory,deleteCategory}