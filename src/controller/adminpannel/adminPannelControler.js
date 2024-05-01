const connection = require("../../../config/connection");
const logger = require("../../../logger/logger");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const ShortUniqueId = require('short-unique-id');
const md5 = require("md5");
const { log } = require("console");

const csvtojson = require('csvtojson')
const fs = require("fs")

exports.adduserbyform = async (req, res) => {

    let email = req.body.email;
    let emailsql = `select count(*) as is_available from users where email = "${email}"`
    let [emailvalidate] = await connection.query(emailsql)
    if (emailvalidate[0].is_available == 0) {

        const saltuid = new ShortUniqueId({ length: 4 });
        let salt = saltuid.rnd();
        const activationcodeuid = new ShortUniqueId({ length: 12 });
        let activationcode = activationcodeuid.rnd();

        let password = md5(req.body.password + salt)
        let userdata =
        {
            "username": req.body.username,
            "email": req.body.email,
            "password": password,
            "name": req.body.name,
            "date_of_birth": req.body.date_of_birth,
            "activation_code": activationcode,
            "salt": salt,
            "is_active": 1,
            "role_id": 1
        }

        let sql = `insert into users set ?`
        let [result] = await connection.query(sql, userdata)
        //ahiya hato

    }
}

exports.getAdminLogin = async (req, res) => {

    res.render("pages/admin/adminlogin");

};

exports.getUsers = async (req, res) => {
    try {
        let search = req.body.search;
        let page = req.body.page;
        const resultpage = 2;
        if (typeof search == "object") {

            search = ""
        }
        let sql = `select count(*) as total from (select * from users where name LIKE '%${search}%') as h`
        let [result] = await connection.query(sql)
        const numOfResults = result[0].total;
        const numberOfPages = Math.ceil(numOfResults / resultpage);
        page = page ? Number(page) : 1;
        const startingLimit = (page - 1) * resultpage;
        let sql1 = `select * from users where name LIKE '%${search}%' limit ${startingLimit},${resultpage}`
        let [result1] = await connection.query(sql1)
        res.json({ data: result1, "curpage": page, "totalpage": numberOfPages })

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


        let sql = `UPDATE users SET is_active ='${status}'  WHERE id = '${userid}'`
        let [result] = await connection.query(sql)

        res.json({ data: result })

    } catch (error) {

        res.json({ error: error })
    }

};

exports.ristricTweet = async (req, res) => {

    try {

        let ristric = req.body.ristric; //get from the body
        if (ristric == 1) {
            ristric = 0;
        }
        else {
            ristric = 1
        }
        let tweet_id = req.body.tweetId; // get from the body;


        let sql = `UPDATE tweets SET  is_ristricted ='${ristric}'  WHERE id = '${tweet_id}'`
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
        let search = req.body.search;
        let page = req.body.page;
        const resultpage = 2;
        if (typeof search == "object") {

            search = ""
        }


        let sql = `select count(*) as total from (select users.id ,  users.name , users.username , users.profile_img_url ,
        verification_requests.request ,verification_requests.id as reqid from verification_requests 
         left join users on verification_requests.user_id = users.id where verification_requests.request =1   and users.name LIKE '%${search}%') as h;
        `

        let [result] = await connection.query(sql)
        const numOfResults = result[0].total;
        const numberOfPages = Math.ceil(numOfResults / resultpage);
        page = page ? Number(page) : 1;
        const startingLimit = (page - 1) * resultpage;



        let sql1 = `select users.id ,  users.name , users.username , users.profile_img_url ,
            verification_requests.request ,verification_requests.id as reqid from verification_requests 
             left join users on verification_requests.user_id = users.id where verification_requests.request =1   and users.name LIKE '%${search}%' limit ${startingLimit},${resultpage};`

        let [result1] = await connection.query(sql1)
        res.json({ data: result1, "curpage": page, "totalpage": numberOfPages })

    } catch (error) {
        console.log(error);
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

        res.json({ data: result })

    } catch (error) {

        res.json({ error: error })
    }

};

exports.getTweets = async (req, res) => {

    try {
        let search = req.body.search;
        let page = req.body.page;
        const resultpage = 2;
        if (typeof search == "object") {

            search = ""
        }



        let sql = `
        select count(*) as total from (select users.name , users.username , tweets.content , tweets.is_ristricted, tweets.id,medias.media_url  from tweets 
        left join users on tweets.user_id = users.id
        left join medias on tweets.id = medias.tweet_id where tweets.is_posted = 1  and  users.name LIKE '%${search}%') as h ; `
        let [result] = await connection.query(sql)
        const numOfResults = result[0].total;
        const numberOfPages = Math.ceil(numOfResults / resultpage);
        page = page ? Number(page) : 1;
        const startingLimit = (page - 1) * resultpage;

        let sql1 = `
       select users.name , users.username , tweets.content , tweets.is_ristricted, tweets.id,medias.media_url  from tweets 
        left join users on tweets.user_id = users.id
        left join medias on tweets.id = medias.tweet_id where tweets.is_posted = 1  and  users.name LIKE '%${search}%'  limit ${startingLimit},${resultpage} ; `
        let [result1] = await connection.query(sql1)
        res.json({ data: result1, "curpage": page, "totalpage": numberOfPages })

    } catch (error) {

        res.json({ error: error })
    }

};

exports.getverifypage = async (req, res) => {

    res.render("pages/admin/verify", { user: req.user[0][0] });
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

exports.addUserCsv = async (req, res) => {

    csvtojson().fromFile("./public/csv/" + req.file.filename).then(
        async file => {
            for (let i = 0; i < file.length; i++) {

                let email = file[i].email;
                let emailsql = `select count(*) as is_available from users where email = "${email}"`
                let [emailvalidate] = await connection.query(emailsql)
                if (emailvalidate[0].is_available == 0) {

                    const saltuid = new ShortUniqueId({ length: 4 });
                    let salt = saltuid.rnd();
                    const activationcodeuid = new ShortUniqueId({ length: 12 });
                    let activationcode = activationcodeuid.rnd();

                    let password = md5(file[i].password + salt)
                    let userdata =
                    {
                        "username": file[i].username,
                        "email": file[i].email,
                        "password": password,
                        "name": file[i].name,
                        "date_of_birth": file[i].date_of_birth,
                        "activation_code": activationcode,
                        "salt": salt,
                        "is_active": file[i].is_active
                    }

                    let sql = `insert into users set ?`
                    let [result] = await connection.query(sql, userdata)

                }

            }
            fs.unlinkSync("./public/csv/" + req.file.filename)
        }
    )


    res.send("hello");


}


exports.supportForm = async (req, res) => {



    try {
        let user_id = req.user[0][0].id
        let filename = req.file.path
        filename = filename?.substring(6)

        content = req.body.content;

        const tickituid = new ShortUniqueId({ length: 10 });
        let tickitid = tickituid.rnd();



        let data = {
            "id": tickitid,
            "user_id": user_id,
            "content": content,
            "url": filename


        }
        let sql = "insert into  get_support SET ?"
        let [result] = await connection.query(sql, data)
        return res.json({ result: 1 })

    } catch (error) {


    }



}



exports.getsupport = async (req, res) => {

    try {
        let id = req.user[0][0].id
        let sql = "select *  from get_support where user_id = ?  order by created_at desc"
        let [result] = await connection.query(sql, [id]);

        return res.json({ data: result })

    } catch (error) {

    }
}


exports.admingetsupport = async (req, res) => {

    try {
        let id = req.user[0][0].id
        let sql = "select * from get_support   order by created_at desc"
        let [result] = await connection.query(sql, [id]);

        return res.json({ data: result })

    } catch (error) {

    }
}
exports.useridTickit = async (req, res) => {

    try {
        let id = req.user[0][0].id
        let tickitid = req.body.tickitid;
        // let tickitid = "m8PemZyRGW";
        let sql = `select get_support.user_id  as reciving_id from get_support where get_support.id = "${tickitid}"`
        let [result] = await connection.query(sql);

        return res.json({ sender_id: id, reciving_id: result[0].reciving_id })

    } catch (error) {

    }
}
exports.adminid = async (req, res) => {

    try {
        let id = req.user[0][0].id


        let sql = `select users.id  as reciving_id from users where users.email = "admin@gmail.com"`


        let [result] = await connection.query(sql);

        return res.json({ sender_id: id, reciving_id: result[0].reciving_id })

    } catch (error) {

    }
}

exports.oldchats = async (req, res) => {



    try {
        let tickitid = req.body.tickitid

        let sql = `
            select * from support_messages where tickit_id = "${tickitid}" ;`


        let [result] = await connection.query(sql);



        return res.json({ data: result })
    } catch (error) {

    }
}


exports.savechat = async (req, res) => {



    try {
        let data = req.body.data;


        let sql = `
        insert into support_messages set ?;`


        let [result] = await connection.query(sql, data);




        return res.json({ result: true })
    } catch (error) {

    }
}