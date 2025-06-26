import PropTypes from "prop-types";
import { GoodScoreIcon, BadScoreIcon, NormalScoreIcon } from "./Icon";

const cardClass = `
    flex flex-col md:flex-row
    rounded-lg
    shadow-sm hover:shadow-xl
    hover:scale-105
    bg-gray-100
    hover:bg-gray-200
    transition duration-300
    md:max-w-xl`;


const generateIcon = (score) => {
    if (score >= 8) {
        return <GoodScoreIcon />;
    } else if (score >= 60) {
        return <NormalScoreIcon />;
    } else {
        return <BadScoreIcon />;
    }
};

const generateGenre = (genres) => {
    return genres.slice(0, 3).map((item) => {
        return (
            <span
                key={item.mal_id}
                className="m-1 inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-gray-300 text-gray-500"
            >
                {item.name}
            </span>
        );
    });
};

const Card = ({ anime }) => {
    const url = "/anime/" + anime.mal_id;

    return (
        <a href={url} className={cardClass}>
            <img
                className="w-full h-96 rounded-t-lg object-cover md:h-full md:w-48 md:rounded-none md:rounded-s-lg"
                src={anime.images.jpg.image_url}
                alt={anime.title}
            />
            <div className="flex flex-col w-full items-center text-center justify-evenly p-4 leading-normal md:h-full">
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-500">
                    {anime.title}
                </p>
                <hr className="w-full border-gray-500" />
                <div className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex items-center gap-2">
                    <span>{anime.score}</span>
                    <div className="w-5 h-5">{generateIcon(anime.score)}</div>
                </div>
                <p>{generateGenre(anime.genres)}</p>
            </div>
        </a>
    );
};

Card.propTypes = {
    anime: PropTypes.any.isRequired,
};

export default Card;
