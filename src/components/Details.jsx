import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams();
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Anime Details</h1>
            <p className="text-lg">{id}</p>
        </div>
    );
}

export default Details;