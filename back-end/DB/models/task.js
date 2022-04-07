const db = require('../conection')

const tasks = db.sequelizedb.define('tasks', {
    nome: {
        type: db.Sequelize.STRING
    },
    state: {
        type: db.Sequelize.STRING
    }
})

//tasks.sync({force: true})

module.exports = tasks