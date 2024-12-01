// Importation des modules nécessaires
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

// Initialisation de l'application Express
const app = express();
const PORT = 3000;

app.use(cors());

// Configure body-parser pour gérer les données du formulaire
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure la connexion à la base de données MySQL
const db = mysql.createConnection({
    host: 'localhost', // Adresse de ton serveur MySQL
    user: 'root',      // Nom d'utilisateur MySQL (par défaut : root)
    password: '',      // Mot de passe (on laisse vide si aucun mot de passe)
    database: 'mahiratra', // Nom de la base de données que j'ai créé
});

// Connecte à la base de données
db.connect((err) => {
    if (err) {
        console.error('Erreur de connexion à la base de données :', err);
        return;
    }
    console.log('Connecté à la base de données MySQL.');
});

// Route pour gérer l'envoi du formulaire
app.post('/contact', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Vérifie que tous les champs sont remplis
    if (!name || !email || !subject || !message) {
        return res.status(400).send('Tous les champs sont obligatoires.');
    }

    // Insére les données dans la base de données
    const query = 'INSERT INTO messages (name, email, subject, message) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, subject, message], (err, result) => {
        if (err) {
            console.error('Erreur lors de l\'insertion des données :', err);
            return res.status(500).send('Erreur du serveur.');
        }
        console.log('Message inséré avec succès :', result);
        res.status(200).send('Message envoyé avec succès !');
    });
});

// Lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
