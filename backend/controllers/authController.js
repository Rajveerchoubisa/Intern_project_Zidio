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

        res.json({token , user});
    } catch (error) {
        res.status(500).json({msg:'Login error',error:error.message});
    }
};

export const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
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
