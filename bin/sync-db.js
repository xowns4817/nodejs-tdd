const models = require('../model/models');

module.exports = () => {
    return models.sequelize.sync({force: false});
}