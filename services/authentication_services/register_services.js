const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const { executeQuery, getData } = require('../../util/dao');
const { TABLE } = require('../../util/constant');

const registerServices = async(req, payload)=>{
    return await registerUser(req, payload);
}

const registerUser = async(req, payload)=>{
    const register = await createUser(req, payload);
    if(register){
        let userInfo = await getUserInfo(req, payload);
        const token = generateJwt(userInfo);
        userInfo = _.omit(userInfo, "UserId");
        return {
            token,
            userInfo
        }
    }
    return false;
}

const createUser = async(req, payload) =>{
    const {username, password, first_name,  last_name, email, phone_no} = payload;
    const hasPassword = await encryptPassword(password);
    const query = `INSERT INTO Users (UserName, FirstName, LastName,Email, PhoneNumber, Password) VALUES(?, ?,?, ?, ?, ?)`;
    const values = [username, first_name, last_name, email, phone_no, hasPassword];
    const insert = await executeQuery(req.pool, query, values);
    if(insert){
        return true;
    }
    return false;
};

const encryptPassword = async(password)=>{
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}

const getUserInfo = async (req, payload)=>{
    const {email} = payload;
    const query = `SELECT UserId, UserName, FirstName, LastName , Email , PhoneNumber 
    FROM ${TABLE.USERS} where Email = ?`;
    const values = [email];
    const userInfo = await getData(req.pool, query, values);
    return userInfo[0];
}

const generateJwt = (userInfo)=>{
    return jwt.sign(userInfo, process.env.SECRET_KEY);
}

module.exports = registerServices;