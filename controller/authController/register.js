const joi = require("joi");
const User = require("../../Model/User");
const Jwtservice = require("../../services/JwtServices");
const bcrypt = require("bcrypt");

let register = async (req, res) => {
    try {
        console.log(req.body,"body")
        const validateRegister = joi.object({

            referralId: joi.string().min(3).max(20),
            name: joi.string().min(3).max(20).required(),
            password: joi.string().required(),
            phone: joi.string().min(10).max(13).required(),

        });

        const { error } = validateRegister.validate(req.body);

        if (error) {
            return res.status(200).json({ status: false, message: error.message });
        }

        const exist = await User.exists({ phone: req.body.phone });

        if (exist) {
            return res.status(200).json({ status: false, message: "Phone already taken" });
        }

        const passwordHash = await bcrypt.hash(req.body.password, 10);

        const { referralId, name, phone } = req.body;

        const createuser = new User({ referralId, name, phone, password: passwordHash });

        const result = await createuser.save();

        const user = { id: result.id, name: result.name, role: result.role, phone: result.phone }

        const token = Jwtservice.sign(user);

        console.log(token,"token")
        return res.status(200).json({ status: true, message: "Register success", _id: result.id, name: result.name, role: result.role, phone: result.phone, token });

    } catch (error) {
        return res.status(200).json({ status: false, error: error.message });
    }
}

module.exports = register;