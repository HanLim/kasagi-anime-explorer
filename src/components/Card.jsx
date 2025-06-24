import PropTypes from "prop-types";

const Card = ({ anime }) => {
    return (
        <a
            href="#"
            className="flex flex-col items-center rounded-lg border border-gray-200 bg-white shadow-sm hover:bg-gray-100 md:max-w-xl md:flex-row dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
            <img
                className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={anime.images.jpg.image_url}
                alt={anime.title}
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {anime.title}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {anime.status}
                </p>
            </div>
        </a>
    );
};

Card.propTypes = {
    anime: PropTypes.shape({
        images: PropTypes.shape({
            jpg: PropTypes.shape({
                image_url: PropTypes.string.isRequired,
            }).isRequired,
        }).isRequired,
        title: PropTypes.string.isRequired,
        status: PropTypes.string,
    }).isRequired,
};

export default Card;
