const Sequelize = require('sequelize')

//conection with db
    const sequelizedb = new Sequelize('todolist', 'root', 'Ytwx7ghZZ', {
        host: 'localhost',
        dialect: 'mysql'
    })

module.exports = {
    Sequelize: Sequelize,
    sequelizedb: sequelizedb
}