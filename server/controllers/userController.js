const User = require("../model/userModel")
const brcypt = require("bcrypt")

module.exports.register = async (req, res, next) => {
    try {
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck)
            return res.json({msg: "Tên tài khoản đã được sử dụng", status: false});
        const emailCheck = await User.findOne({email})
        if(emailCheck)
            return res.json({msg: "Email đã được sử dụng", status: false})
         const hashedPassword = await brcypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res,json({status:true, user});
    } catch (error) {
        next(error)
    }
}