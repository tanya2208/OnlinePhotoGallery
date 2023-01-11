import mongoose from "mongoose"
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import {config} from '../config.js'
import 'express-async-errors';

const userSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        surname: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        nickname: {type: String, required: true},
        city: {type: String, default: ''},
        occupation: {type: String, default: ''}
    },
    {collection: 'user-data'}
)

userSchema.virtual('images', {
    ref: 'ImageData',
    localField: '_id',
    foreignField: 'user'
})

userSchema.methods.generateAuthToken = function(){
    const user = this
    const token = jwt.sign({ _id: user._id.toString()}, config.jwtSecret)
    return token
}

userSchema.statics.findByCredentials = async ({email, password}) => {
    const user = await User.findOne({email: email})
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        throw new Error('Unable to login')
    }
    return user
}

userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

export const User = mongoose.model('UserData', userSchema)