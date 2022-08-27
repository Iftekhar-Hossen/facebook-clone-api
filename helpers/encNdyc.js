const bcrypt = require("bcrypt");
const saltRounds = 13;

exports.encrypt =  async (password) => {
    if (password.trim().length > 8) {
        let hash = await bcrypt.hash(password, saltRounds)
        return {
            message: "Password successfully encrypted",
            hash,
            status: true,
        }
    } else {
        return {
            message: "Password is smaller than minimum requirement",
            status: false,
        };
    }
};
