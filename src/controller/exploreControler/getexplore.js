const connection = require("../../../config/connection");
const ShortUniqueId = require("short-unique-id");

exports.getExplorePage = async (req, res) => {
    res.render("pages/explore");
};


// api for the get all usename and hatag based in search box on change event 
exports.getUsernameOrHastagOnchage = async (req, res) => {

    let searchbox = "mihir"
    if (!searchbox) {
        return res.json({ msg: "not found" })
    }
    if (searchbox.charAt(0) == "#") {
        try {
            let sql = `SELECT DISTINCT hashtag_name FROM hashtag_lists WHERE hashtag_name LIKE '${searchbox.substring(1)}%'`

            let [result] = connection.query(sql);
            console.log(result);

        } catch (error) {
            return res.json({ error: error })
        }
    }
    else {
        try {
            let sql = `SELECT * FROM users WHERE username LIKE '${searchbox}%'`
            let [result] = connection.query(sql);
            console.log(result);
        } catch (error) {
            return res.json({ error: error })
        }
    }
};