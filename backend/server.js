
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');

dotenv.config();

const sequelize = require('./config/database');

const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));
const PORT = process.env.PORT || 3000;

// Protection des en-têtes HTTP
app.use(helmet());

// Limitation de la taille des données reçues
app.use(express.json({ limit: '10kb' }));

// Limitation du nombre de requêtes API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    message: {
        message: 'Trop de requêtes. Réessayez plus tard.'
    }
});

app.use('/api/', apiLimiter);

// Route d'accueil
app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l’API Trouve ton artisan !'
    });
});

// Routes API
const artisansRoutes = require('./routes/artisans');
const categoriesRoutes = require('./routes/categories');
const specialitesRoutes = require('./routes/specialites');

app.use('/api/artisans', artisansRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/specialites', specialitesRoutes);

// Démarrage du serveur
async function startServer() {
    try {
        await sequelize.authenticate();

        console.log('Connexion à MySQL réussie !');

        app.listen(PORT, () => {
            console.log(`Serveur démarré sur http://localhost:${PORT}`);
        });

    } catch (error) {
        console.error('Erreur de connexion à MySQL :', error.message);
    }
}

startServer();
