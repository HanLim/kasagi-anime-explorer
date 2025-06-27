import PropTypes from "prop-types";
import { GoodScoreIcon, BadScoreIcon, NormalScoreIcon } from "./Icon";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { BaseStore } from "../store/store";

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
    if (score >= 7) {
        return <GoodScoreIcon />;
    } else if (score >= 5) {
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
                className="bg-blue-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded m-1"
            >
                {item.name}
            </span>
        );
    });
};


const generateHeartIcon = (isFavourited, setFavourited, anime) => {
    const HeartIcon = isFavourited ? HeartSolid : HeartOutline;
    const color = isFavourited ? "text-red-500" : "text-gray-400";
    const classes = `cursor-pointer h-6 w-6 ${color}`;
    
    return <HeartIcon 
        className={classes} 
        onClick={() => setFavourited(anime)}
    />;
}


const Card = ({ anime }) => {
    const url = "/anime/" + anime.mal_id;

    const favourited = BaseStore((state) => state.favourited);
    const setFavourited = BaseStore((state) => state.setFavourited);

    const isFavourited = favourited.has(anime.mal_id.toString());
    console.log("Is Favourited:", isFavourited);

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
                    <div className="w-5 h-5">{generateIcon(anime.score)}</div>
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
