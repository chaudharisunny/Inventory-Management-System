const { createToken } = require('../middleware/createToken');
const User=require('../models/user');

const getUser=async(req,res)=>{

    res.json({message:'all user...'})
}

const postUser = async (req, res) => {
    try {
        const {Name,email,password } = req.body;

        if (!Name||!email||!password) {
            return res.status(400).json({ message: 'all field are required' });
        }

        const newUser = new User({ Name,email,password });
        const savedUser = await newUser.save();

        return res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const loginUser=async(req,res)=>{

    try {
        const { email, password } = req.body;
    
        // Check if both email and password are provided
        if (!email || !password) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        // Find the user by email
        const user = await User.findOne({ email: email });
        if (!user) {
          return res.status(404).json({ message: 'Email and password do not match.' });
        }
    
        // Verify the password
        const isPasswordValid = user.verifyPassword(password);
        if (!isPasswordValid) {
          return res.status(404).json({ message: 'Email and password do not match.' });
        }
        
        //create token
        const token=createToken(user)
        
        
        return res.cookie('token',token,{httpOnly:true}).status(200).json({message:'login successfully'})
        
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.' });
      }

}

const logout=async(req,res)=>{
    res.clearCookie('token');
    res.status(200).json({message:'logout successfully'})
   
}

module.exports={getUser,postUser,loginUser,logout}