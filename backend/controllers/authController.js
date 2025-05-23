import User from "../models/userModels.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password,role } = req.body;

  try {
    const existing = await User.findOne({ email }); //finding user by email

    if (existing) return res.status(400).json({ msg: "User already exists" }); //checking if user exist or not 

    //now password hashing for new user
    const hashed = await bcrypt.hash(password,10);
    //new user creation with hashed password store
    const newUser = await User.create({name,email,password:hashed,role});

    res.status(201).json({msg:"User created Successfully",user:newUser});

  } catch (error) {
    res.status(500).json({msg:"Registration error",error:error.message});
  }
};

export const loginUser = async(req,res) =>{
    const{email,password} = req.body;

    try {
        //finding user
        const user = await User.findOne({email});
//exist or not
        if(!user) return res.status(404).json({msg:'User not found'});


        //password matching

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(401).json({msg: "Invalid Credentials"});

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'});

        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,    // 👈 VERY IMPORTANT
          },
          token,
        });
    } catch (error) {
        res.status(500).json({msg:'Login error',error:error.message});
    }
};
export const getAllUsers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" });
    res.json(customers);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch users", error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};


export const updateShippingAddress = async (req, res) => {

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // ✅ Update shippingAddress if provided
    if (req.body.shippingAddress) {
      user.shippingAddress = {
        ...user.shippingAddress,
        ...req.body.shippingAddress,
      };
    }

    const updatedUser = await user.save();

    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
};

