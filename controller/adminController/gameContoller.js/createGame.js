const Game = require("../../../Model/Game");
const joi = require("joi");


const createGame = async (req, res) => {
    try {
        const validateLogin = joi.object({
            gameName: joi.string().required(),
            startTime: joi.string().regex(/^([0-9]{2}):([0-9]{2})(:[0-9]{2})?$/),
            endTime: joi.string().regex(/^([0-9]{2}):([0-9]{2})(:[0-9]{2})?$/),
            timeZone: joi.string()
        });

        const { error } = validateLogin.validate(req.body);

        if (error) return res.status(200).send({ status: false, message: error.message });

        const checkExist = await Game.exists({ gameName: req.body.gameName });

        if (checkExist) return res.status(200).json({ status: false, message: "Game already taken" });

        const { gameName, startTime, endTime, timeZone } = req.body;

        const createNewGame = new Game({ gameName, startTime, endTime, timeZone });

        await createNewGame.save();

        return res.status(200).json({ status: true, message: "New Game created success" });

    } catch (error) {
        res.status(500).json({ status: false, error: "Opps something went wrong", message: error.message })
    }
}
module.exports = createGame;