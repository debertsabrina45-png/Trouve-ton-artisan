
const express = require('express');
const router = express.Router();

const { Specialite, Categorie, Artisan } = require('../models');

// GET : récupérer toutes les spécialités
router.get('/', async (req, res) => {
    try {
        const specialites = await Specialite.findAll({
            include: [Categorie, Artisan]
        });

        res.json(specialites);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET : récupérer une spécialité par son ID
router.get('/:id', async (req, res) => {
    try {
        const specialite = await Specialite.findByPk(req.params.id, {
            include: [Categorie, Artisan]
        });

        if (!specialite) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        res.json(specialite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST : ajouter une spécialité
router.post('/', async (req, res) => {
    try {
        const specialite = await Specialite.create(req.body);
        res.status(201).json(specialite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT : modifier une spécialité
router.put('/:id', async (req, res) => {
    try {
        const specialite = await Specialite.findByPk(req.params.id);

        if (!specialite) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        await specialite.update(req.body);
        res.json(specialite);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE : supprimer une spécialité
router.delete('/:id', async (req, res) => {
    try {
        const specialite = await Specialite.findByPk(req.params.id);

        if (!specialite) {
            return res.status(404).json({
                message: 'Spécialité introuvable'
            });
        }

        await specialite.destroy();

        res.json({ message: 'Spécialité supprimée avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
