
const express = require('express');
const router = express.Router();

const { Categorie, Specialite } = require('../models');

// GET : récupérer toutes les catégories
router.get('/', async (req, res) => {
    try {
        const categories = await Categorie.findAll({
            include: [Specialite]
        });

        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET : récupérer une catégorie par son ID
router.get('/:id', async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id, {
            include: [Specialite]
        });

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        res.json(categorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST : ajouter une catégorie
router.post('/', async (req, res) => {
    try {
        const categorie = await Categorie.create(req.body);
        res.status(201).json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT : modifier une catégorie
router.put('/:id', async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        await categorie.update(req.body);
        res.json(categorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE : supprimer une catégorie
router.delete('/:id', async (req, res) => {
    try {
        const categorie = await Categorie.findByPk(req.params.id);

        if (!categorie) {
            return res.status(404).json({
                message: 'Catégorie introuvable'
            });
        }

        await categorie.destroy();

        res.json({ message: 'Catégorie supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
