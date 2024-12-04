// Importation des modules nécessaires
import express from 'express';
import mysql from 'mysql';
import bodyParser from 'body-parser';
import cors from 'cors';
import nodemailer from 'nodemailer';
import cron from 'node-cron';


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

const transporter = nodemailer.createTransport({
    service: 'gmail', // Utilisez votre service email (Gmail, Outlook, etc.)
    auth: {
        user: 'judicaelroberto@gmail.com', // Remplacez par votre email
        pass: 'xogoqzctzpikyhbi' // Remplacez par votre mot de passe
    }
});

// app.post('/send-email', (req, res) => {
//     const { to, subject, text } = req.body;

//     const mailOptions = {
//         from: 'judicaelroberto@gmail.com', // Expéditeur
//         to: to, // Destinataire
//         subject: subject, // Sujet
//         text: text // Contenu du mail
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             console.error(error);
//             return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'email.' });
//         }
//         res.status(200).json({ message: 'Email envoyé avec succès !' });
//     });
// });

// Tâche planifiée pour envoyer des emails tous les jours à 8h du matin

// Planifiez la tâche

cron.schedule('* * * * *', () => {
    console.log('Test de l\'envoi automatique d\'emails...');

    // Requête pour récupérer les emails des abonnés
    db.query('SELECT email FROM subscribers', async (err, results) => {
        if (err) {
            console.error('Erreur lors de la récupération des emails :', err);
            return;
        }

        const emailPromises = results.map(row => {
            const mailOptions = {
                from: 'judicaelroberto@gmail.com',
                to: row.email,
                subject: '1ere Mise à jour de Mahiratra Groupe',
                text: 'Bonjour, voici les dernières actualités de Mahiratra Groupe !'
            };

            return transporter.sendMail(mailOptions);
        });

        try {
            await Promise.all(emailPromises); // Tous les envois en parallèle
            console.log('Tous les emails ont été envoyés avec succès !');
        } catch (err) {
            console.error('Erreur lors de l\'envoi des emails :', err);
        }
    });

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

// Route pour gérer les inscriptions
app.post('/subscribe', (req, res) => {
    const { email } = req.body;

    // Vérification si l'email est fourni
    if (!email) {
        return res.status(400).json({ message: "Veuillez entrer une adresse e-mail valide." });
    }

    // Insére l'email dans la base de données
    const query = 'INSERT INTO subscribers (email) VALUES (?)';
    db.query(query, [email], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: "Cet e-mail est déjà inscrit." });
            }
            return res.status(500).json({ message: "Une erreur s'est produite, veuillez réessayer plus tard." });
        }
        res.status(200).json({ message: "Inscription réussie !" });
    });
});


// Lance le serveur
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
