import GenericButton from "./GenericButton";

const NotFound = () => {
    return (
        <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-600">404</h1>
            <p className="mt-4 text-xl text-gray-700">Page Not Found</p>
            <p className="mt-4 text-s text-gray-300">Things you are looking for is non-existent, just go and watch Eigthy Six.</p>
            <GenericButton 
                text={"Go to Home"} 
                onClick={() => window.location.href = "/"}
                extraClass="m-5"
            />
        </div>

    );
};

export default NotFound;

