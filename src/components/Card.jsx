import PropTypes from "prop-types";
import { BaseStore } from "../store/store";
import {
    generateRatingIcon,
    generateGenre,
    generateHeartIcon,
} from './utils';

const cardClass = `
    flex flex-col md:flex-row
    rounded-lg
    shadow-sm hover:shadow-xl
    hover:scale-105
    bg-gray-100
    hover:bg-gray-200
    transition duration-300
    md:max-w-xl`;

const Card = ({ anime }) => {
    const url = "/anime/" + anime.mal_id;

    const favourited = BaseStore((state) => state.favourited);
    const setFavourited = BaseStore((state) => state.setFavourited);

    const isFavourited = favourited.has(anime.mal_id.toString());

    return (
        <div className={cardClass}>
            <img
                className="w-full h-96 rounded-t-lg object-cover md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                src={anime.images.jpg.image_url}
                alt={anime.title}
            />
            <div className="flex flex-col w-full items-center text-center justify-evenly p-4 leading-normal md:h-full">
                <div className="flex items-center gap-2 mb-2">
                    <p
                        className="text-xl font-bold tracking-tight text-gray-700 hover:text-gray-600 cursor-pointer"
                        onClick={() => window.location.href = url}
                    >
                        {anime.title}
                    </p>
                    {generateHeartIcon(isFavourited, setFavourited, anime)}
                </div>
                <hr className="w-full border-gray-500" />
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
                    <span>{anime.score}</span>
                    <div className="w-5 h-5">{generateRatingIcon(anime.score)}</div>
                </div>
                <p>{generateGenre(anime.genres)}</p>
            </div>
        </div>
    );
};

Card.propTypes = {
    anime: PropTypes.any.isRequired,
};

export default Card;
