import PropTypes from 'prop-types';

const GenericButton = ({ onClick, text, extraClass=null }) => {
    const className = [`
        rounded-lg 
        bg-gray-700 
        px-5 
        py-2.5 
        text-sm 
        font-medium 
        text-white 
        hover:bg-gray-800 
        focus:outline-none 
        focus:ring-4
        focus:ring-gray-300`,
        extraClass
    ].join(' ');

    return (
        <button
            type="button"
            className={className}
            onClick={onClick}
        >
            { text }
        </button>
    );
};

GenericButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    text: PropTypes.string,
    extraClass: PropTypes.string,
};

export default GenericButton;