// api 로직

let users = [
    {id: 1, name: 'kimCoding'},
    {id: 2, name: 'tj'},
    {id: 3, name: 'taejoon'}
]; 

const getUsersInfo = function(req, res) {
    const limit = parseInt(req.query.limit, 10); // 정수가 아니면 NaN 으로 반환
    if(Number.isNaN(limit)) return res.status(400).json([]);
     res.status(200).json(users.slice(0, limit));
}

const getUserInfo = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const user = users.filter((user) => user.id === id)[0];
    if(!user) return res.status(404).end();

    res.json(user);
}

const createUser = function(req, res) {
    const name = req.body.name;

    if(!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if(isConflict) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
}

const updateUser = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name
    if(!name) return res.status(400).end();

    const isConflict = users.filter(user => user.name === name).length;
    if(isConflict) return res.status(409).end();
     
    const user = users.filter(user=> user.id === id)[0];
    if(!user) return res.status(404).end();

    user.name = name;
    res.json(user);
}

const deleteUser = function(req, res) {
    const id = parseInt(req.params.id, 10);

    if(Number.isNaN(id)) return res.status(400).end();

    users = users.filter(user=> user.id !== id);
    res.status(204).end();
}

module.exports = {
    getUsersInfo,
    getUserInfo,
    createUser,
    updateUser,
    deleteUser
}