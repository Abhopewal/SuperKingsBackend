
const Game = require("../../../Model/Game");
const escapeRegex = require("../../../utils/escapeRegex");

let getGame = async (req, res) => {

    try {
        const resPerPage = 10;
        const page = req.query.page || 1;

        let searchVal = req.query.search
        let conditions = {}

        if (req.query.search) {
            conditions["gameName"] = new RegExp(escapeRegex(req.query.search), 'gi');
        }

        const numOfGames = await Game.count(conditions)

        let pages = Math.ceil(numOfGames / resPerPage);

        const games = await Game.find(conditions).skip((resPerPage * page) - resPerPage)
            .limit(resPerPage).sort({ createdAt: -1 })

        return res.status(200).json({ status: true, data: { games, pagination: { numOfGames, currentPage: page, pages } } })

    } catch (error) {
        res.status(500).json({ status: false, error: "Opps something went wrong", message: error.message })
    }
}

module.exports = getGame;