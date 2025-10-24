const { globalError, ClientError } = require("shokhijakhon-error-handler");
const myReadFile = require("../utils/myReadFile");
const myWritefile = require("../utils/myWriteFile");

module.exports = {
    async REGISTER(req, res) {
        try {
            let newUser = req.body;

            const users = await myReadFile("users.json");

            const check = users.some(user => user.email == newUser.email);

            if (check) throw new ClientError('User already exists', 404);

            newUser = { id: users.length ? users.at(-1).id + 1 : 1, ...newUser };

            users.push(newUser);

            await myWritefile("users.json", users);

            return res.status(201).json({ message: 'User succesfully registered', status: 201 });

        } catch (err) {
            return globalError(err, res);
        }
    },
    async LOGIN(req, res) {
        try {
            const userData = req.body;

            const users = await myReadFile("users.json");

            const findUser = users.find(user => user.email == userData.email);

            if (!findUser) throw new ClientError('User not found', 404);

            if (findUser.password != userData.password) throw new ClientError('User not found', 404);

            return res.json({ message: 'User succesfully logined', status: 200 })
        } catch (err) {
            return globalError(err, res);
        }
    }
}