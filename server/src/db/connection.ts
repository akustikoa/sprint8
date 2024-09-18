import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('almacen', 'root', 'peixito_Root4', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;