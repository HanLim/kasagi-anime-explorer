import PropTypes from "prop-types";

const cardClass = `
    flex flex-col md:flex-row
    rounded-lg
    bg-gray-600
    shadow-sm hover:shadow-xl
    hover:scale-105
    hover:bg-gray-500
    transition duration-300
    md:max-w-xl`;

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
                <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {anime.title}
                </p>
                <hr className="w-full" />
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {anime.score}
                </p>
            </div>
        </a>
    );
};

Card.propTypes = {
    anime: PropTypes.any.isRequired,
};

export default Card;
