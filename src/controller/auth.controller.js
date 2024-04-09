const logger = require("../../logger/logger");
const connection = require("../../config/connection");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const md5 = require("md5");

exports.loginHandler = async (req, res) => {

    let {email, password} = req.body;
    // console.log(md5(password));

    try {
        let [userExist] = await connection.query("select * from users where email = ?", [email]);

        if (!userExist.length) {
            return res.status(401).json({
                success: false,
                message: "user not exists"
            });
        }

        if (!userExist[0].is_active) {
            return res.status(401).json({
                success: false,
                message: "user not activated"
            });
        }

        if (userExist[0].password !== md5(password)) {
            return res.status(401).json({
                success: false,
                message: "password not match"
            });
        }

        let payload = {
            id: userExist[0].id,
            email: userExist[0].email,
            userName: userExist[0].user_name,
            roleId: userExist[0].role_id
        }

        const TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '1d'});

        let options = {
            httpOnly: true,
        }

        return res.status(200).cookie("token", TOKEN, options).json({
            success: true,
            message: "everything is okay"
        });

    } catch (error) {
        logger.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}