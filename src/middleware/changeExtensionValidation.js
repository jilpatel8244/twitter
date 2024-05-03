const fs = require("fs")
const number = {
    jpg: Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]),
    png: Buffer.from([0x89, 0x50, 0x4E, 0x47]),
    gif: Buffer.from([0x47, 0x49, 0x46, 0x38]),
    webp: Buffer.from([0x52, 0x49, 0x46, 0x46])
}

exports.validateExtensionChange = async (req, res, next) => {
    const validate = fs.readFileSync(req.file?.path)


    console.log("type filer is ", req.file);
    console.log("type is ", typeof req.file.path);
    if (!validate.slice(0, 4).equals(number[req.file.path.split(".").pop()])) {

        return res.json({ error: "somthing went wrong" })
    }

    next();


};