// server.js

// Required modules
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./lib/database');
const User = require('./models/user');
const authRoute = require("./routes/auth");
const cors = require('cors'); // Importing cors
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const coursesRoute = require('./routes/courses');
const app = express();

// Middleware to enable CORS
app.use(cors());  // Enable CORS for all origins

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDb();  // Connect to the database
app.use("/auth",authRoute);
app.use("/",coursesRoute);

app.use(express.json());

// Add admin user directly
const addAdminUser = async () => {
    try {
        // Check if admin user already exists
        const existingAdmin = await User.findOne({ username: 'admin' });

        if (!existingAdmin) {
            // Hash the password before saving it
            const hashedPassword = await bcrypt.hash('password123', 10);  // Replace 'adminpassword' with the desired password

            // Create a new admin user with the hashed password
            const adminUser = new User({
                username: 'admin',
                password: hashedPassword, // Save the hashed password
                role: 'admin' // Set the role to admin
            });

            await adminUser.save();  // Save the user to MongoDB
            console.log('Admin user created successfully.');
        } else {
            console.log('Admin user already exists.');
        }
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
};

// Call the function to add the admin user
addAdminUser();

// Controller for sign-in functionality
const controller = {};
controller.signIn = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé.');
        }

        // Compare the password using bcrypt
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(401).send('Mot de passe invalide.');
        }

        // Check if the user is an admin
        const isAdmin = user.role === 'admin';  // Assuming 'role' is a field in the User model

        // Generate JWT token
        const token = jwt.sign({ id: user._id, isAdmin: isAdmin }, 'your_secret_key', { expiresIn: '24h' });

        // Send the response based on the user role
        if (isAdmin) {
            // Response for admin
            res.status(200).json({ token, redirectTo: '/admin' });
        } else {
            // Response for regular user
            res.status(200).json({ token, redirectTo: '/dashboard' });
        }

    } catch (err) {
        return res.status(500).send('Erreur sur le serveur.');
    }
};

// Use the auth route
app.use("/auth", authRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
