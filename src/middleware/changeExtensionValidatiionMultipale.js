const fs = require("fs")
const number = {
    jpg: Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]),
    png: Buffer.from([0x89, 0x50, 0x4E, 0x47]),
    gif: Buffer.from([0x47, 0x49, 0x46, 0x38]),
    webp: Buffer.from([0x52, 0x49, 0x46, 0x46])
}

exports.validateExtensionChangeMulti = async (req, res, next) => {

    let isvalid = true;

    req.files.forEach(element => {
        const validate = fs.readFileSync(element.path)


        if (!validate.slice(0, 4).equals(number[element.split(".").pop()])) {

            isvalid = false
        }

    });
    if (isvalid == false) {
        return res.json({ msg: "somthing wen worng" })
    }
    next();

};