import { DataTypes } from "sequelize";
import db from '../db/connection';

const Location = db.define('Location', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    latitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
    longitude: {
        type: DataTypes.DECIMAL(9, 6),
        allowNull: false,
    },
}, {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

export default Location;