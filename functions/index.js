const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.sendEmailNotification = functions.https.onRequest(async (req, res) => {
    const allowedOrigins = "https://portfolio-antonin-guilbaud.web.app";
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.set('Access-Control-Allow-Origin', origin);
    }

    if (req.method === 'OPTIONS') {
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
        res.status(204).send('');
        return;
    }

    const { nom, mail, message } = req.body;

    if (!nom || !mail || !message) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }

    // Récupérer l'adresse IP
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        await admin.firestore().collection('mail').add({
            to: "guilbaud000@gmail.com",
            message: {
                subject: "Nouvelle soumission de formulaire de contact (Portfolio)",
                text: "Nom: " + nom + "\nEmail: " + mail + "\nMessage: " + message,
            }
        });

        await admin.firestore().collection('contactForm').add({
            nom,
            mail,
            message,
            ip,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement ou de l\'envoi de l\'email:', error);
        res.status(500).send('Erreur lors de l\'enregistrement ou de l\'envoi de l\'email');
    }
});
