import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        axios
            .get('https://api.jikan.moe/v4/anime?limit=10&page=1')
            .then((response) => {
                setAnimeList(response.data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <div className="anime-list">
                {animeList.map((anime) => (
                    <div key={anime.mal_id} className="anime-card">
                        <img
                            src={anime.images.jpg.image_url}
                            alt={anime.title}
                        />
                        <h3>{anime.title}</h3>
                        <p>{anime.synopsis}</p>
                        <p>Score: {anime.score}</p>
                        <p>Episodes: {anime.episodes}</p>
                        <p>Status: {anime.status}</p>
                    </div>
                ))}
            </div>
            <footer>
                <p>Powered by Jikan API</p>
            </footer>
        </>
    );
}

export default App;
