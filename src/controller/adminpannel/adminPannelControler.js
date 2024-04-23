const connection = require("../../../config/connection");


exports.getAdminLogin = async (req, res) => {

    res.render("pages/admin/adminPannel");


};

exports.getUsers = async (req, res) => {

    try {
        let sql = "select * from users"
        let [result] = await connection.query(sql)

        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.manageUserActivation = async (req, res) => {

    try {


        let status = 1; //get from the body
        let userid = 1; // get from the body;

        let sql = `UPDATE users SET is_active ='${status}'  WHERE id = '${userid}}'`
        let [result] = await connection.query(sql)
        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.getHastag = async (req, res) => {

    try {
        let sql = "select * from hastag_list"
        let [result] = await connection.query(sql)

        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.getVerifiedRequest = async (req, res) => {

    try {
        let sql = "select * from verify_requests where status=0"
        let [result] = await connection.query(sql)

        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.updateVerify = async (req, res) => {

    try {

        let status = 1//getb from the body
        let verifyid = 1 //get verify id 

        let sql = `UPDATE verify_requests SET status ='${status}'  WHERE id = '${verifyid}'`
        let [result] = await connection.query(sql)
        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.getTweets = async (req, res) => {

    try {
        let sql = "select * from tweets"
        let [result] = await connection.query(sql)

        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.getAdminPannel = async (req, res) => {

    res.render("pages/admin/adminPannel");
};

