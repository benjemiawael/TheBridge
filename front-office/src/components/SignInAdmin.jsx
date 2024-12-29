import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SignInAdmin.css';
import Logo from '../assets/theBridge.png';

const SigninAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Utilisation de fetch pour envoyer une requête POST
            const response = await fetch('http://localhost:3000/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Indique que les données envoyées sont au format JSON
                },
                body: JSON.stringify({ username, password }), // Sérialisation des données du formulaire en JSON
            });

            if (!response.ok) {
                throw new Error('Invalid username or password.'); // Si la réponse n'est pas OK, on lance une erreur
            }

            const data = await response.json(); // Récupération des données de la réponse (qui devrait contenir un token)
            const token = data.token; // Assurez-vous que votre backend renvoie un token dans la réponse

            localStorage.setItem('authToken', token); // Enregistrement du token dans le localStorage

            toast.success('Login successful! Redirecting...', {
                position: "top-right",
                autoClose: 3000,
            });

            setTimeout(() => {
                navigate('/admin'); // Redirection vers la page d'administration après 3 secondes
            }, 2000);
        } catch (err) {
            // Gestion des erreurs avec Toastify
            console.error("Error:", err.message);
            toast.error(err.message || 'An error occurred. Please try again.', {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <ToastContainer />
            <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-6 col-lg-5 d-none d-md-block">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                                            alt="login form"
                                            className="img-fluid"
                                            style={{ borderRadius: "1rem 0 0 1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                        <div className="card-body p-4 p-lg-5 text-black">
                                            <form onSubmit={handleSubmit}>
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <i
                                                        className="fas fa-cubes fa-2x me-3"
                                                        style={{ color: "#ff6219" }}
                                                    ></i>
                                                        <img src={Logo} alt="The Bridge Logo" className="logo" /> 
                                                </div>

                                                <h5
                                                    className="fw-normal mb-3 pb-3"
                                                    style={{ letterSpacing: "1px" }}
                                                >
                                                    Sign into your account
                                                </h5>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="text"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        placeholder="Username"
                                                        required
                                                    />
                                                </div>

                                                <div className="form-outline mb-4">
                                                    <input
                                                        type="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        placeholder="Password"
                                                        required
                                                    />
                                                </div>

                                                <div className="pt-1 mb-4">
                                                    <button className="btn btn-dark btn-lg btn-block" type="submit">
                                                        Login
                                                    </button>
                                                </div>

                                                <a href="#!" className="small text-muted">
                                                    Terms of use.
                                                </a>
                                                <a href="#!" className="small text-muted">
                                                    Privacy policy
                                                </a>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default SigninAdmin;