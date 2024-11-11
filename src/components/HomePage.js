import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import logo from './images/LOGO.png';

function HomePage() {
    useEffect(() => {
        const createBinaryRain = () => {
            const rain = document.createElement('div');
            rain.className = 'binary-rain';
            for (let i = 0; i < 50; i++) {
                const drop = document.createElement('div');
                drop.className = 'binary-drop';
                drop.style.left = `${Math.random() * 100}%`;
                drop.style.animationDuration = `${5 + Math.random() * 5}s`;
                drop.style.animationDelay = `${Math.random() * 5}s`;
                drop.textContent = Math.random() > 0.5 ? '0' : '1';
                rain.appendChild(drop);
            }
            document.body.appendChild(rain);
        };

        createBinaryRain();

        return () => {
            const rain = document.querySelector('.binary-rain');
            if (rain) {
                rain.remove();
            }
        };
    }, []);

    return (
        <div className="homepage">
            <header>
                <div className="logo-container">
                    <img src={logo} alt="LAPLACELAB Logo" className="logo" />
                </div>
                <nav>
                    <ul className="menu">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/blog">Blog</Link></li>
                        <li><Link to="/portfolio">Portfolio</Link></li>
                        <li><Link to="/games">Games</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Welcome to LAPLACELAB</h1>
                <p>Platform created by Rafael Garcia for sharing knowledge and projects, focused on AI.</p>
                
                <section className="mission-section">
                    <h2>Mission</h2>
                    <p>My mission is to promote in a positive manner the use of AI for the benefit of humanity.</p>
                </section>
                
                <section>
                    {/* You can add more content here */}
                </section>
            </main>
            <footer>
                <p>© 2023 LAPLACELAB. All rights reserved to Rafa.</p>
            </footer>
        </div>
    );
}

export default HomePage;
