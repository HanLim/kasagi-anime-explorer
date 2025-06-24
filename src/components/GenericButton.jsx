import PropTypes from 'prop-types';

const GenericButton = ({ onClick }) => {
    return (
        <button
            type="button"
            className="mb-2 me-2 rounded-lg bg-gray-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-gray-300"
            onClick={onClick}
        >
            Load More
        </button>
    );
};

GenericButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default GenericButton;