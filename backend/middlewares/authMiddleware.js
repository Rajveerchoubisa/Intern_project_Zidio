import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'

export const protect = async(req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if(!token) return res.status(401).json({msg: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        res.status(401).json({msg: "Invalid token"});
    }
};

export const admin = (req,res,next) => {
    if(req.user?.role !== 'admin'){
        return res.status(403).json({msg: "Admin Only"});
    }
    next();
}
