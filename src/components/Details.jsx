import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import jikanClient from '../api/jikanApi';
import Loading from './Loading';
import Toast from './Toast';


const DetailsBody = (anime) => {
    return (
        <div className="text-justify flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-50 p-6">
            <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="w-64 h-96 object-cover rounded-lg shadow-lg mb-6 md:mb-0 md:mr-10 border"
            />
            <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-2 text-gray-700">{anime.title_english || anime.title}</h1>
                <p className="text-gray-500 mb-2 italic">{anime.title_japanese}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {anime.genres?.map((g) => (
                        <span key={g.mal_id} className="bg-blue-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                            {g.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-700">
                    <span><b>Type:</b> {anime.type}</span>
                    <span><b>Status:</b> {anime.status}</span>
                    <span><b>Episodes:</b> {anime.episodes}</span>
                    <span><b>Score:</b> {anime.score ?? 'N/A'}</span>
                    <span><b>Studio:</b> {anime.studios?.[0]?.name ?? 'N/A'}</span>
                </div>
                <p className="mb-4 text-gray-800 whitespace-pre-line">{anime.synopsis}</p>
                <div className="flex flex-col gap-2">
                    <span className="text-xs text-gray-400">Aired: {anime.aired?.from?.slice(0, 10)}
                        {anime.aired?.to ? ` to ${anime.aired.to.slice(0, 10)}` : ''}
                    </span>
                    {anime.trailer?.url && (
                        <a
                            href={anime.trailer.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline text-sm"
                        >
                            Watch Trailer
                        </a>
                    )}
                    <a
                        href={anime.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline text-xs mt-2"
                    >
                        View on MyAnimeList
                    </a>
                </div>
            </div>
        </div>
    );
}

const Details = () => {
    const { id } = useParams();
    
    const [anime, setAnime] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const toastRef = useRef();

    useEffect(() => {
        setIsLoading(true);
        jikanClient.getAnimeDetails({ id })
            .then((res) => {
                setAnime(res.data);
            })
            .catch((error) => {
                toastRef.current.show("Error loading anime list! " + error.message);
            })
            .finally(() => setIsLoading(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading && <Loading />}
            {!isLoading && anime && <DetailsBody {...anime} />}
            <Toast ref={toastRef} />
        </>
    )
}

export default Details;