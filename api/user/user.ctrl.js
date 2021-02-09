// api 로직
const models = require('../../model/models').User;


const getUsersInfo = function(req, res) {
    const limit = parseInt(req.query.limit, 10); // 정수가 아니면 NaN 으로 반환
    if(Number.isNaN(limit)) return res.status(400).json([]);

    models.findAll({
        limit: limit
        })
        .then(users=> {
            res.status(200).json(users);
        });
}

const getUserInfo = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();
    
    models.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if(!user) return res.status(404).end();
        res.json(user);
    });
}

const createUser = function(req, res) {
    const name = req.body.name;
    if(!name) return res.status(400).end();

    models.create({name})
        .then(user=> {
            res.status(201).json(user);
        })
        .catch(err => {
            if(err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            res.status(500).end();
        });
}

const updateUser = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name
    if(!name) return res.status(400).end();

    models.findOne({where:{id}})
        .then(user=> {
            if(!user) return res.status(404).end();

            user.name = name;
            user.save()
                .then(_=> {
                    res.json(user);
                })
                .catch(err => {
                    if(err.name === 'SequelizeUniqueConstraintError') {
                        return res.status(409).end();
                    }
                    res.status(500).end();
                });
        });
}

const deleteUser = function(req, res) {
    const id = parseInt(req.params.id, 10);

    if(Number.isNaN(id)) return res.status(400).end();

    models.destroy({
        where: {
            id: id
        }
    }).then(()=> {
        res.status(204).end();
    })
}

module.exports = {
    getUsersInfo,
    getUserInfo,
    createUser,
    updateUser,
    deleteUser
}