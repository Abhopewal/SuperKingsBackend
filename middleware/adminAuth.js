const Jwtservice = require("../services/JwtServices")

const adminAuth = (req, res, next) => {

    const authHeader = req.headers.authorization;


    if (!authHeader || !authHeader.split(' ').includes('Bearer')) return res.status(401).send({ error: "Your token is invalid please authenticate using a valid token !" })

    const token = authHeader.split(' ')[1];

    if (!token) return res.status(401).send({ error: "Your token is invalid please authenticate using a valid token !!" })

    try {
        const { id, role } = Jwtservice.verify(token);

        const admin = {
            id,
            role
        }

        req.admin = admin;

        next();

    } catch (error) {
        res.status(401).send({message:error.message, error: "Your token is invalid please authenticate using a valid token !!!" })
    }
}
module.exports = adminAuth;