const controller = {};
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

controller.signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Trouver l'utilisateur par nom d'utilisateur
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        // Comparer le mot de passe avec bcrypt
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).send('Mot de passe invalide.');
        }

        // Vérifier si l'utilisateur est un admin
        const isAdmin = user.role === 'admin';  // Supposons que 'role' soit un champ dans le modèle User

        // Générer le token JWT
        const token = jwt.sign({ id: user._id, isAdmin: isAdmin }, 'your_secret_key', { expiresIn: '24h' });

        // Renvoyer la réponse en fonction du rôle de l'utilisateur
        if (isAdmin) {
            // Réponse pour l'administrateur
            res.status(200).json({ token, redirectTo: '/admin' });
        } else {
            // Réponse pour l'utilisateur standard
            res.status(200).json({ token, redirectTo: '/dashboard' });
        }

    } catch (err) {
        return res.status(500).send('Erreur sur le serveur.');
    }
};

module.exports = controller;
