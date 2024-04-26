const connection = require("../../../config/connection");
const logger = require("../../../logger/logger");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const md5 = require("md5");
const { log } = require("console");






exports.getAdminLogin = async (req, res) => {

    res.render("pages/admin/adminlogin");

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
//used and tested
exports.manageUserActivation = async (req, res) => {

    try {

        let status = req.body.active; //get from the body
        if (status == 1) {
            status = 0;
        }
        else {
            status = 1
        }
        let userid = req.body.userId; // get from the body;
        console.log(req.body);

        let sql = `UPDATE users SET is_active ='${status}'  WHERE id = '${userid}'`
        let [result] = await connection.query(sql)
        console.log(result);
        res.json({ data: result })

    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }

};

exports.ristricTweet = async (req, res) => {

    try {
        console.log("object");
        let ristric = req.body.ristric; //get from the body
        if (ristric == 1) {
            ristric = 0;
        }
        else {
            ristric = 1
        }
        let tweet_id = req.body.tweetId; // get from the body;
        console.log(req.body);

        let sql = `UPDATE tweets SET  is_ristricted ='${ristric}'  WHERE id = '${tweet_id}'`
        let [result] = await connection.query(sql)
        console.log(result);
        res.json({ data: result })

    } catch (error) {
        console.log(error);
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
        let sql = `select users.id ,  users.name , users.username , users.profile_img_url ,
        verification_requests.request ,verification_requests.id as reqid from verification_requests 
         left join users on verification_requests.user_id = users.id where verification_requests.request =1 ;
        `
        let [result] = await connection.query(sql)
        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};

exports.updateverify = async (req, res) => {

    try {



        let request = req.body.request; //get from the body
        let userId = req.body.userId; // get from the body;
        let reqId = req.body.requestid;
        let req1

        if (request == 1) {
            req1 = 0;

        }

        let sql1 = `UPDATE  verification_requests SET  request ='${req1}'  WHERE id = '${reqId}'`
        let sql = `UPDATE users SET  is_varified ='${request}'  WHERE id = '${userId}'`
        let [result] = await connection.query(sql)
        let [result1] = await connection.query(sql1)
        console.log(result);
        res.json({ data: result })

    } catch (error) {
        console.log(error);
        res.json({ error: error })
    }

};

exports.getTweets = async (req, res) => {

    try {
        let sql = `
        select users.name , users.username , tweets.content , tweets.is_ristricted, tweets.id,medias.media_url  from tweets 
        left join users on tweets.user_id = users.id
        left join medias on tweets.id = medias.tweet_id where tweets.is_posted = 1 ; `
        let [result] = await connection.query(sql)



        res.json({ data: result })

    } catch (error) {
        res.json({ error: error })
    }

};



exports.getverifypage = async (req, res) => {

    res.render("pages/admin/verify");
};


exports.adminLoginHandler = async (req, res) => {
    let { email, password } = req.body;

    try {
        let [userExist] = await connection.query("select * from users where email = ? and role_id = 3", [email]);

        if (!userExist.length) {
            return res.status(401).json({
                success: false,
                message: "sorry, we couldn't find your account",
            });
        }

        if (!userExist[0].is_active) {
            await connection.query("insert into logs (user_id, is_successfull) values (?, ?)", [userExist[0].id, 0]);

        }

        if (userExist[0].password !== md5(password + userExist[0].salt)) {
            await connection.query("insert into logs (user_id, is_successfull) values (?, ?)", [userExist[0].id, 0]);

            return res.status(401).json({
                success: false,
                message: "please fill valid data",
            });
        }

        let payload = {
            id: userExist[0].id,
            email: userExist[0].email,
            userName: userExist[0].user_name,
            roleId: userExist[0].role_id,
        };

        const TOKEN = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        let options = {
            httpOnly: true,
        };

        await connection.query("insert into logs (user_id, is_successfull) values (?, ?)", [userExist[0].id, 1]);
        await connection.query(`INSERT INTO notifications (user_id, type, related_user_id) VALUES (?, 'Login', ?)`, [userExist[0].id, userExist[0].id]);

        return res.status(200).cookie("token", TOKEN, options).json({
            success: true,
            message: "everything is okay",
        });
    } catch (error) {
        logger.error(error);


        return res.status(500).json({
            success: false,
            message: "something went wrong",
        });
    }
};



exports.getAdminPannel = async (req, res) => {

    res.render("pages/admin/adminPannel");
};
