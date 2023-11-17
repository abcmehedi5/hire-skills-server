const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const { getData } = require("../../util/dao");
const { TABLE } = require('../../util/constant');

const loginServices = async (req, payload) => {
    return await login(req, payload);
}

const login = async (req, payload)=>{
    const authentication = await isAuthenticated(req, payload);
    console.log(authentication)
    if(authentication){
        let userInfo = await getUserInfo(req, payload);
        const token = generateJwt(userInfo);
        userInfo = _.omit(userInfo, "UserId")
        return {
            token,
            userInfo
        }
    }
}

const isAuthenticated = async(req, payload)=>{
    const {email, password} = payload;
    const query = `SELECT Email , Password  from Users u where Email = ?`;
    const values = [email];
    const data = await getData(req.pool, query, values);
    if(data.length>0){
        const hashPassword = data[0].Password;
        return await bcrypt.compare(password, hashPassword);
    }
    return false;
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

module.exports = loginServices;