const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    

})

UserSchema.statics.register = async function(username,email,password) {
    let userExists = await this.findOne({email});
    if(userExists) {
        throw new Error('user already exists');
    }
    
    let salt = await bcrypt.genSalt();
    let hashValue = await bcrypt.hash(password,salt);

    let user = await this.create({
        username,
        email,
        password : hashValue
    });
    return user;
}

UserSchema.statics.login = async function(email,password){
    let user = await this.findOne({email})
    if(!user){
        throw new Error('User is not exist')
    }
    
    let isCorrect = await bcrypt.compare(password,user.password)
    if(!isCorrect){
        throw new Error('Password wrong')       
    }else{
        return user
    }
}

module.exports = mongoose.model('User',UserSchema)