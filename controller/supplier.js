const Supplier=require('../models/supplier');

const getSupplier=async(req,res)=>{

    const allSupplier=await Supplier.find()
    return res.status(200).json({supplier:allSupplier})
}

const postSupplier = async (req, res) => {
    try {
        const { name, contact, supplyCategory } = req.body;

        if (!name || !contact || !supplyCategory) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newSupplier = new Supplier({ name, contact, supplyCategory });

        const addedSupplier = await newSupplier.save();
        
        return res.status(201).json({ message: 'Supplier created successfully.', supplier: addedSupplier });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

const editSupplier=async(req,res)=>{
    try {
        const {name,contact,supplyCategory}=req.body;
        const{id}=req.params;

        if(!name||!contact||!supplyCategory){
           return res.status(401).json({message:'all field are require'})
        }

        const editSupplier=await Supplier.findByIdAndUpdate(id,{name,contact,supplyCategory},{new:true})

        if(!editSupplier){
           return res.status(404).json({message:'supplier id not found'})
        }

        return res.status(200).json({message:'supplier update successfully',edit:editSupplier})

    } catch (error) {
        res.status(500).json({message:'server error'})
    }
}

const deleteSupplier=async(req,res)=>{

    try {
        const {id}=req.params;

        if(!id){
           return res.status(401).json('supplier id not found')
        }
        
        const deleteSupplier=await Supplier.findByIdAndDelete(id)
        return res.status(200).json({message:'supplier delete successfully',supplyer:deleteSupplier})

    } catch (error) {
        res.status(500).json({message:'server error'})
    }
    
}

module.exports={getSupplier,postSupplier,editSupplier,deleteSupplier}