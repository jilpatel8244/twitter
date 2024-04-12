


exports.getExplorePage = async (req, res) => {
    res.render("pages/explore")

}






const ShortUniqueId = require('short-unique-id');
const connection = require("../../../config/connection")


exports.getActivecode = async (req, res) => {


    const uid = new ShortUniqueId({ length: 12 });
    console.log("hello");
    let Activationcode = uid.rnd();
    let email = req.body.email;
    try {
        let sql = `UPDATE users SET activation_code ='${Activationcode}'  WHERE email = '${email}'`
        let [result] = await connection.query(sql)

    } catch (error) {
        console.log(error);

    }

    res.json({ code: Activationcode })

}