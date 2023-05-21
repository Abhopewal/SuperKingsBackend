
const Game = require("../../Model/Game")

let getGames = async (req, res) => {

    try {
 
        const games = await Game.find().sort({ createdAt: -1 })

        return res.status(200).json({ status: true, games})

    } catch (error) {
        res.status(500).json({ status: false, error: "Opps something went wrong", message: error.message });
    }
}

module.exports = getGames;