
const Artisan = require('./Artisan');
const Categorie = require('./Categorie');
const Specialite = require('./Specialite');

// Une catégorie possède plusieurs spécialités
Categorie.hasMany(Specialite, {
    foreignKey: 'categorie_id'
});

Specialite.belongsTo(Categorie, {
    foreignKey: 'categorie_id'
});

// Une catégorie possède plusieurs artisans
Categorie.hasMany(Artisan, {
    foreignKey: 'categorie_id'
});

Artisan.belongsTo(Categorie, {
    foreignKey: 'categorie_id'
});

// Une spécialité possède plusieurs artisans
Specialite.hasMany(Artisan, {
    foreignKey: 'specialite_id'
});

Artisan.belongsTo(Specialite, {
    foreignKey: 'specialite_id'
});

module.exports = {
    Artisan,
    Categorie,
    Specialite
};
