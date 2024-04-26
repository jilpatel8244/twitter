const passport = require('passport');
const connection = require('../../config/connection');
const logger = require('../../logger/logger');
require('dotenv').config();

exports.permission = async (req, res, next) => {

    let url = req.baseUrl + req.path;
    console.log(url);
    let sql = `
        select roles.id from roles left join role_permissions on roles.id =  role_permissions.role_id
        left join permissions on role_permissions.permission_id = permissions.id where role_permissions.id in(select permissions.id from permissions where permission_name = "${url}")`
    let [result] = await connection.query(sql)
    if (req.user[0][0].role_id == result[0]?.id) {
        next()
    }
    else {
        res.redirect("/admin/adminlogin")
    }


};
