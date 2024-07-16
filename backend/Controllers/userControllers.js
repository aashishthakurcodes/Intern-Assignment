const UserModel = require("../Models/User");
//For Getting all users data
const getallUsers = async (req, res) => {
    try {
       
        const users = await UserModel.find({}, { password: 0 });;
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

module.exports = getallUsers;