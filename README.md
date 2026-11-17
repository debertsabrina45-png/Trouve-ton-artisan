
# Trouve ton artisan

## Présentation du projet

Trouve ton artisan est une application web permettant de rechercher des artisans selon leur catégorie, leur spécialité et leur localisation.

Le projet comprend :
- Une page d'accueil avec les artisans du mois.
- Une liste d'artisans.
- Une fiche détaillée pour chaque artisan.
- Un formulaire de contact.
- Une page d'erreur 404.
- Des pages d'informations légales.

## Technologies utilisées

### Frontend
- React
- Vite
- React Router
- Bootstrap
- Sass
- CSS

### Backend
- Node.js
- Express
- Sequelize
- MySQL

## Prérequis

Avant de commencer, installer :
- Node.js
- npm
- MySQL
- Un éditeur de code comme Visual Studio Code.

## Installation du projet

Récupérer le projet depuis GitHub, puis ouvrir le dossier dans Visual Studio Code.

### 1. Installation du backend

Ouvrir un terminal dans le dossier `backend` et exécuter :

```bash
npm install
```

### 2. Configuration de la base de données

Créer une base de données MySQL nommée :

`trouve_ton_artisan`

Créer un fichier `.env` dans le dossier `backend` avec les variables suivantes :

```env
DB_NAME=trouve_ton_artisan
DB_USER=votre_utilisateur
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=3306
PORT=3000
```

Remplacer les valeurs par ses propres identifiants MySQL.

Importer ensuite les scripts SQL de création et de remplissage de la base de données.

### 3. Démarrage du backend

Dans le dossier `backend`, exécuter :

```bash
npm run dev
```

Le serveur démarre sur :

`http://localhost:3000`

### 4. Installation du frontend

Ouvrir un deuxième terminal dans le dossier `frontend` et exécuter :

```bash
npm install
```

### 5. Démarrage du frontend

Dans le dossier `frontend`, exécuter :

```bash
npm run dev
```

Le site est accessible à l'adresse :

`http://localhost:5173`

## Vérification du code

Pour vérifier le code du frontend :

```bash
npm run lint
```

Pour créer la version de production :

```bash
npm run build
```

## Sécurité

Plusieurs mesures de sécurité sont mises en place :
- Helmet pour sécuriser les en-têtes HTTP.
- CORS pour contrôler les origines autorisées.
- Limitation du nombre de requêtes API.
- Limitation de la taille des données JSON reçues.
- Validation des données envoyées à l'API.
- Utilisation de variables d'environnement pour les identifiants de connexion à la base de données.

## Auteur

Projet réalisé dans le cadre d'un exercice de formation en développement web.

## Scripts de la base de données

Les scripts SQL permettant de recréer et de remplir la base de données se trouvent dans le dossier `database`.

Ordre d'exécution :

1. `00-creation-tables.sql` : création des tables.
2. `01-categories.sql` : insertion des catégories.
3. `02-specialites.sql` : insertion des spécialités.
4. `03-artisans.sql` : insertion des artisans.

Base de données utilisée : `trouve_ton_artisan`.
