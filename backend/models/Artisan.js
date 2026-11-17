
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    specialite: {
        type: DataTypes.STRING
    },
    note: {
        type: DataTypes.DECIMAL(2, 1)
    },
    ville: {
        type: DataTypes.STRING
    },
    a_propos: {
        type: DataTypes.TEXT
    },
    email: {
        type: DataTypes.STRING
    },
    site_web: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    },
    top_artisan: {
        type: DataTypes.BOOLEAN
    },
    categorie_id: {
        type: DataTypes.INTEGER
    },
    specialite_id: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'artisans',
    timestamps: false
});

module.exports = Artisan;
