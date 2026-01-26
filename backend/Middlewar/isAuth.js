import jwt from 'jsonwebtoken';
import { User } from '../Model/UserModel.js';
import { statusCode } from './statusCode.js';

// user loggin check
export const isAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;
        //const token = req.headers.token;
        if (!token) {
            return res.status(statusCode.unAuthorized).json({
                message: 'Please Login Correctly'
            })
        }

        //Decode JWT signed token
        const decodeData = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decodeData._id)
        next();
    } catch (err) {
        return res.status(statusCode.bad_Request).json({
            message: 'Please login correctly'
        })
    }
}

//user role check
export const rolecheck = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(`Role ${req.user.role} is not Allowed`,401);
        }
        next();
    }

}

export const logoutUser = async (req,res,next) => {
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly: true
    })
    .status(statusCode.ok).json({
        message:'Logged Out'
    })
}


