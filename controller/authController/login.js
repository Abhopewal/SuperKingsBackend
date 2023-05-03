
const joi = require("joi");
const User = require("../../Model/User");
const Jwtservice = require("../../services/JwtServices");
const bcrypt = require("bcrypt");

let login = async (req, res) => {
    try {

        const validateLogin = joi.object({
            phone: joi.string().required(),
            password: joi.string().required()
        });

        const { error } = validateLogin.validate(req.body);

        if (error) {
            return res.status(200).send({ status: false, message: error.message });
        }

        const userdata = await User.findOne({ phone: req.body.phone });

        if (!userdata) {
            return res.status(200).json({ status: false, message: "Invalid phone or password" });
        }

        const compare = await bcrypt.compare(req.body.password, userdata.password);

        if (!compare) {
            return res.status(200).json({ status: false, message: "Invalid email or password" });
        }
        const user = { id: userdata.id, name: userdata.name, role: userdata.role, phone: userdata.phone }

        const token = await Jwtservice.sign(user);

        return res.status(200).json({ status: true, message: "Login success", id: userdata.id, name: userdata.name, role: userdata.role, phone: userdata.phone, token });

    } catch (error) {
        res.status(500).json({status:false,error:"Opps something went wrong",message:error.message})
    }
}

module.exports = login;