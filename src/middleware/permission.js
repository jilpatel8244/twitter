const passport = require('passport');
const connection = require('../../config/connection');
const logger = require('../../logger/logger');
require('dotenv').config();

exports.permission = async (req, res, next) => {

    let url = req.baseUrl + req.path;

    let sql = `
    select count(permissions.permission_name) as valid from permissions left join role_permissions on role_permissions.permission_id = permissions.id where role_permissions.role_id = ? and permissions.permission_name = ?`
    let [result] = await connection.query(sql, [req.user[0][0]?.role_id, url])

    if (result[0]?.valid == 1) {
        next()
    }
    else {

        if (req.user[0][0]?.role_id == 1 && url == "/admin/verify") {
            return res.render("pages/verify")
        } else {
            res.redirect('/login')
        }

    }



};
