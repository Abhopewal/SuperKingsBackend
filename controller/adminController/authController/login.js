
const joi = require("joi");
const Admin = require("../../../Model/Admin")
const Jwtservice = require("../../../services/JwtServices")
const bcrypt = require("bcrypt");

let login = async (req, res) => {

    try {

        const validateLogin = joi.object({
            email: joi.string().email().required(),
            password: joi.string().required()
        });

        const { error } = validateLogin.validate(req.body);

        if (error) {
            return res.status(200).send({ status: false, message: error.message });
        }

        const userdata = await Admin.findOne({ email: req.body.email });

        if (!userdata) {
            return res.status(200).json({ status: false, message: "Invalid Email or password" });
        }

        const compare = await bcrypt.compare(req.body.password, userdata.password);

        if (!compare) {
            return res.status(200).json({ status: false, message: "Invalid email or password" });
        }
        const user = { id: userdata.id, role: userdata.role}

        const token = await Jwtservice.sign(user);

        return res.status(200).json({ status: true, message: "Login success", token });

    } catch (error) {
        res.status(500).json({status:false,error:"Opps something went wrong",message:error.message})
    }
}

module.exports = login;