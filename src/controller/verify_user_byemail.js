const connection = require("../../config/connection")



exports.verify_user_byemail = async (req, res) => {

    if (!req.body.email) {
        return res.json({ isvalidate_user: false })
    }


    let input_email = req.body.email

    async function email_verify(input_email) {

        let sql = ` select count(*)  as count from users  WHERE email = '${input_email}'`

     
        let [result] = await connection.query(sql);
        // console.log(result);

        // console.log(result);
        // alert("hello1")
        return result;
    }

    let result = await email_verify(input_email)

    console.log(result[0].count);
    if (result[0].count == 0) {
        return res.json({ isvalidate_user: false })
    }

    return res.json({ isvalidate_user: true })

}