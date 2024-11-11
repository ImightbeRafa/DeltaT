import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Games() {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await axios.get('/api/games/');
                setGames(response.data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    return (
        <div>
            <Link to="/" className="home-link">
                    <span className="home-icon">🏠</span> Home
                </Link>
            <h1>Games</h1>
            <ul>
                {games.map(game => (
                    <li key={game.id}>
                        <Link to={game.url}>
                            {game.title}
                        </Link>
                        <p>{game.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Games;