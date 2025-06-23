import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Card from './components/Card';

function App() {
    const [animeList, setAnimeList] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get(
                    `https://api.jikan.moe/v4/anime?limit=24&page=${page}`
                );
                setAnimeList((prev) => [...prev, ...response.data.data]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [page]);

    return (
        <>
            <div className="anime-list grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
                {animeList.map((anime) => (
                    <Card key={anime.mal_id} anime={anime} />
                ))}
            </div>
            {isLoading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="h-16 w-16 animate-spin rounded-full border-8 border-blue-500 border-t-transparent"></div>
                </div>
            )}

            <button
                type="button"
                className="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => setPage((prev) => prev + 1)}
            >
                Load More
            </button>
            <footer className="p-4 text-center text-sm text-gray-400">
                <p>Powered by Jikan API</p>
            </footer>
        </>
    );
}

export default App;
