import jwt from 'jsonwebtoken';
import { User } from "../models/user.model.js";
import {config} from '../config.js'

const AuthHandler = async (req, res, next) => {
    try{
        const token = req.header('Authorization').replace('Bearer', '')
        const decoded = jwt.verify(token, config.jwtSecret)
        const user = await User.findOne({_id : decoded._id, 'tokens.token' : token})
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    } catch(e) {
        res.sendStatus(401).send({error: 'Please authenticate'})
    }
}

export default AuthHandler