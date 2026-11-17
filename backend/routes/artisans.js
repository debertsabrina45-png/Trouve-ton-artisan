
const express = require('express');
const router = express.Router();

const { Artisan, Categorie, Specialite } = require('../models');

// Champs autorisés pour un artisan
const champsAutorises = [
    'nom',
    'specialite',
    'note',
    'ville',
    'a_propos',
    'email',
    'site_web',
    'image_url',
    'top_artisan',
    'categorie_id',
    'specialite_id'
];

// Vérifier les données reçues
function verifierDonnees(donnees, creation = false) {
    if (!donnees || typeof donnees !== 'object' || Array.isArray(donnees)) {
        return 'Les données envoyées sont invalides.';
    }

    if (creation && (!donnees.nom || typeof donnees.nom !== 'string' || !donnees.nom.trim())) {
        return 'Le nom de l’artisan est obligatoire.';
    }

    if (donnees.nom !== undefined &&
        (typeof donnees.nom !== 'string' || !donnees.nom.trim())) {
        return 'Le nom doit être un texte non vide.';
    }

    if (donnees.email !== undefined &&
        donnees.email !== null &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email)) {
        return 'L’adresse email est invalide.';
    }

    if (donnees.note !== undefined &&
        (isNaN(Number(donnees.note)) || Number(donnees.note) < 0 || Number(donnees.note) > 5)) {
        return 'La note doit être comprise entre 0 et 5.';
    }

    for (const champ of ['categorie_id', 'specialite_id']) {
        if (donnees[champ] !== undefined &&
            (!Number.isInteger(Number(donnees[champ])) || Number(donnees[champ]) < 1)) {
            return `Le champ ${champ} doit être un identifiant valide.`;
        }
    }

    if (donnees.top_artisan !== undefined &&
        typeof donnees.top_artisan !== 'boolean') {
        return 'top_artisan doit être vrai ou faux.';
    }

    return null;
}

// Garder uniquement les champs autorisés
function filtrerDonnees(donnees) {
    return Object.fromEntries(
        Object.entries(donnees).filter(([champ]) =>
            champsAutorises.includes(champ)
        )
    );
}

// GET : récupérer tous les artisans
router.get('/', async (req, res) => {
    try {
        const artisans = await Artisan.findAll({
            include: [Categorie, Specialite]
        });

        res.json(artisans);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération des artisans.' });
    }
});

// GET : récupérer un artisan par son ID
router.get('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ message: 'Identifiant invalide.' });
        }

        const artisan = await Artisan.findByPk(id, {
            include: [Categorie, Specialite]
        });

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan introuvable.' });
        }

        res.json(artisan);
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la récupération de l’artisan.' });
    }
});

// POST : ajouter un artisan
router.post('/', async (req, res) => {
    try {
        const erreur = verifierDonnees(req.body, true);

        if (erreur) {
            return res.status(400).json({ message: erreur });
        }

        const donnees = filtrerDonnees(req.body);
        const artisan = await Artisan.create(donnees);

        res.status(201).json(artisan);
    } catch (error) {
        res.status(400).json({ message: 'Impossible de créer cet artisan. Vérifiez les données envoyées.' });
    }
});

// PUT : modifier un artisan
router.put('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ message: 'Identifiant invalide.' });
        }

        const erreur = verifierDonnees(req.body);

        if (erreur) {
            return res.status(400).json({ message: erreur });
        }

        const donnees = filtrerDonnees(req.body);

        if (Object.keys(donnees).length === 0) {
            return res.status(400).json({ message: 'Aucune donnée valide à modifier.' });
        }

        const artisan = await Artisan.findByPk(id);

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan introuvable.' });
        }

        await artisan.update(donnees);

        res.json(artisan);
    } catch (error) {
        res.status(400).json({ message: 'Impossible de modifier cet artisan. Vérifiez les données envoyées.' });
    }
});

// DELETE : supprimer un artisan
router.delete('/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return res.status(400).json({ message: 'Identifiant invalide.' });
        }

        const artisan = await Artisan.findByPk(id);

        if (!artisan) {
            return res.status(404).json({ message: 'Artisan introuvable.' });
        }

        await artisan.destroy();

        res.json({ message: 'Artisan supprimé avec succès.' });
    } catch (error) {
        res.status(500).json({ message: 'Impossible de supprimer cet artisan.' });
    }
});

module.exports = router;
