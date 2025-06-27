import PropTypes from "prop-types";
import GenericButton from "./GenericButton";

const NotFound = ({ text = null, show404 = true }) => {
    const displayText = text || "Page Not Found";
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            {show404 && <h1 className="text-6xl font-bold text-red-600">404</h1>}
            <p className="mt-4 text-xl text-gray-700">{displayText}</p>
            <p className="mt-4 text-s text-gray-300">As an alternative, go and (re)watch Eigthy Six.</p>
            <GenericButton
                text={"Go to Home"}
                onClick={() => window.location.href = "/"}
                extraClass="m-5"
            />
        </div>

    );
};

NotFound.propTypes = {
    show404: PropTypes.bool,
    text: PropTypes.string
};

export default NotFound;

