
const User = require("../../../Model/User");
const escapeRegex = require("../../../utils/escapeRegex");

let getUsers = async (req, res) => {

    try {
        const resPerPage = 10;
        const page = req.query.page || 1;

        let searchVal = req.query.search
        let conditions = {}

        if (req.query.search) {
            conditions["name"] = new RegExp(escapeRegex(req.query.search), 'gi');
        }

        const numOfUsers = await User.count(conditions)

        let pages = Math.ceil(numOfUsers / resPerPage);

        const users = await User.find(conditions, { referralId: 1, name: 1, phone: 1, isLogin: 1, createdAt: 1, updatedAt: 1 }).skip((resPerPage * page) - resPerPage)
            .limit(resPerPage).sort({ createdAt: -1 })

        return res.status(200).json({ status: true, data: { users, pagination: { numOfUsers, currentPage: page, pages } } })

    } catch (error) {
        res.status(500).json({ status: false, error: "Opps something went wrong", message: error.message })
    }
}

module.exports = getUsers;